import { openai } from './openai.js';

export const INITIAL_SESSION = {
  messages: [],
};
export async function initCommand(ctx) {
  ctx.session = INITIAL_SESSION;
  await ctx.reply('Жду вашего голосового или текстового сообщения');
}
export async function processTextToChat(ctx, content) {
  try {
    // пушим сообщения пользователя в сессию (в контекст)
    ctx.session.messages.push({ role: openai.roles.USER, content });
    // пушим сообщения бота в сессию (в контекст)
    const response = await openai.chat(ctx.session.messages);
    ctx.session.messages.push({
      role: openai.roles.ASSISTANT,
      content: response.content,
    });
    await ctx.reply(response.content);
  } catch (e) {
    console.log('Error while proccesing text to gpt', e.message);
  }
}
