import { Configuration, OpenAIApi } from 'openai';

async function translate(url: string): Promise<Record<string, string>> {
    const apiKey = process.env.OPENAI_API_KEY;
    try {
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY env required');
      }
      const configuration = new Configuration({ apiKey });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'user',
            content: `Write the following for the page ${url}, formatting and returning the data as valid JSON:

1. The key 'title' containing a new page title under 60 characters
2. The key 'description' containing a meta description under 155 characters
3. The key 'seoCopy' containing an SEO copy block no more than 75 words`,
        }],
      });
      const json = response.data.choices[0]?.message?.content ?
        JSON.parse(response.data.choices[0]?.message?.content) : {};
      return json;
    } catch {
      return {};
    }
}


export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const url: string = query.url as string;
    if (!url) {
      throw new Error('URL required');
    }
    const translation = await translate(url);
    return translation;
});
