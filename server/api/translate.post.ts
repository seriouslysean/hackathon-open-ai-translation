import { Configuration, OpenAIApi } from 'openai';

async function translate(text: string, locale: string): Promise<String> {
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
