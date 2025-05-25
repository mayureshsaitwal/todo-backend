import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function sendToSlack(summaryText) {
  try {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    const response = await axios.post(webhookUrl, {
      username: "Todo Bot",
      text: summaryText,
      icon_emoji: "ghost"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Sent to Slack successfully:', response.status);
  } catch (error) {
    console.error('Slack Error:', error.response?.data || error.message);
    throw error;
  }
}

export async function summarizeAndSend(req, res) {
  try {
    const todos = req.body.todos;
    console.log(todos);
    const textBlock = todos.join('\n');
    console.log(textBlock);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(`Summarize the following to-do items and don't use any markup language format and try to print in bullet points and number them:\n${textBlock}`);
    // console.log(result.response.text);
    // const response = result.response;
    const summary = await result.response.text();
    console.log(summary);

    await sendToSlack(summary);

    res.json({ success: true, summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
