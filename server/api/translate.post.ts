import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';

async function getTranslation(client: AxiosInstance, workflowId: string, runId: string): Promise<string> {
  const maxCount = 10;
  return new Promise((resolve, reject) => {
    let count = 0;
    const intervalId = setInterval(async () => {
      // Stop if we hit the limit
      if (count >= maxCount) {
        return reject('unknown');
      }
      const response = await client.request({
        method: 'GET',
        url: `workflow/${workflowId}/run/${runId}`,
      });
      console.log('!!! response', response.data);
      const isComplete = response?.data?.data?.status === 'COMPLETE';
      if (!isComplete) {
        count += 1;
        return;
      }
      clearInterval(intervalId);
      return resolve(response?.data?.data?.output?.text || 'unknown');
    }, 1000);
  });
}

async function translateViaCopyAI(text: string, locale: string): Promise<String> {
  const apiKey = process.env.COPYAI_API_KEY;
  const workflowId = process.env.COPYAI_TRANSLATE_WORKFLOW_ID;
  try {
    if (!apiKey || !workflowId) {
      throw new Error('COPYAI_API_KEY and COPYAI_TRANSLATE_WORKFLOW_ID env required');
    }
    const client = axios.create({
      baseURL: 'https://api.copy.ai/api/',
      headers: {
        'Content-Type': 'application/json',
        'x-copy-ai-api-key': apiKey,
      },
    });
    // TODO move logic of this to be better integrated with useFetch, using axios now
    // to continue using this file as the decision point
    const response = await client.request({
      method: 'POST',
      url: `workflow/${workflowId}/run`,
      data: {
        startVariables: {
          'original-text': text,
          'target-language': locale,
        },
        metadata: {
          api: true,
        },
      },
    });
    const runId = response?.data?.data?.id;
    if (!runId) {
      throw new Error('Workflow run failed!');
    }
    const translation = await getTranslation(client, workflowId, runId);
    // Once we have a workflow, we need to poll for the response to make sure it's valid
    return translation;
  } catch {
    return 'unknown';
  }
}

async function translateViaOpenAI(text: string, locale: string): Promise<String> {
  const apiKey = process.env.OPENAI_API_KEY;
  try {
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY env required');
    }
    const configuration = new Configuration({ apiKey });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Translate the text delimited by triple pipes from en-US to ${locale}.

|||${text}|||`,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    // console.log('Open AI response', JSON.stringify(response.data, null, 2));
    return response.data?.choices?.[0]?.text?.trim() || 'unknown';
  } catch {
    return 'unknown';
  }
}

async function translate(text: string, locale: string): Promise<String> {
    const map: Record<string, Function> = {
      openai: translateViaOpenAI,
      copyai: translateViaCopyAI,
    };
    const aiMethod = process.env.AI_METHOD || 'unknown';
    return map[aiMethod]?.(text, locale) || new Promise((resolve, reject) => reject);
}


export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const text: string = query.text as string;
    const locale: string = query.locale as string;
    if (!text || !locale) {
      throw new Error('Text and locale required');
    }
    const translation = await translate(text, locale);
    return translation;
});
