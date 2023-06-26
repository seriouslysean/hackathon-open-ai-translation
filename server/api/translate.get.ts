import { Configuration, OpenAIApi } from 'openai';

async function translate() {
    const apiKey = process.env.OPENAI_API_KEY;
    try {
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY env required');
      }
      const configuration = new Configuration({ apiKey });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: 'Translate this from English in to French "Fly free with products that are light on you, and light on your wallet"',
          temperature: 0.3,
          max_tokens: 100,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
      });
      return {
        text: response.data?.choices?.[0]?.text || 'unknown',
      };
    } catch {
      return {
        text: 'unknown',
      };
    }
}


export default defineEventHandler(async (event) => {
    console.log('New request: ' + getRequestURL(event))
    const translation = await translate();
    console.log('!!! translation', translation);
    return translation;
});
