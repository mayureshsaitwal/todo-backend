# TODO BACKEND - SETUP INSTRUCTIONS

This is the backend for the Todo Summary Assistant application.  
It provides APIs for managing todo items, summarizing them using an LLM (Gemini),  
and sending the summary to a Slack channel via webhook.

---

## REQUIREMENTS

- Node.js (v16 or above recommended)  
- npm  
- Google API key for Gemini LLM  
- Slack webhook URL  

---

## FOLDER STRUCTURE (example)

```
todo-backend/
├── controllers/
│   ├── summarizeController.js
│   └── todosController.js
├── routes/
│   ├── summarizeRoutes.js
│   ├── slackWebhook.js
│   └── todos.js
├── .env
├── index.js (or server.js)
├── package.json
```

---

## ENVIRONMENT VARIABLES (.env)

Create a `.env` file in the root of your backend folder with the following:

```
PORT=5000
GOOGLE_API_KEY=your_google_api_key_here
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
```

---

## INSTALL DEPENDENCIES

Navigate into the backend folder and run:

```
npm install
```

**Dependencies used:**
- express  
- cors  
- dotenv  
- axios  
- @google/generative-ai  
- node-cron  

---

## RUNNING THE SERVER

To start the backend:

```
node index.js
```

The backend server will be available at:  
[http://localhost:5000](http://localhost:5000)

---

## API ENDPOINTS

### Todos:
- `GET    /api/todos`           → Fetch all todos  
- `POST   /api/todos`           → Add a new todo  
- `DELETE /api/todos/:id`       → Delete a todo  

### Summarization:
- `POST   /api/summarize`       → Summarize todos using LLM and send to Slack  

### Slack Webhook:
- `POST   /api/slack-webhook`   → Save a valid Slack webhook to the `.env` file  

---

## OPTIONAL: CRON JOB FOR AUTO SUMMARY

You can use the `node-cron` package to schedule automatic summaries.

**Example:**
```js
import cron from 'node-cron';
import { summarizeAndSend } from './controllers/summarizeController.js';

cron.schedule('0 9 * * *', async () => {
  await summarizeAndSend(); // Runs every day at 9 AM
});
```

---

## SECURITY NOTES

- Do not commit your `.env` file to version control.  
- Keep API keys and webhook URLs secure.  
- In production, use a secure vault or secret manager instead of writing to `.env`.  

---

## LICENSE

This backend is provided under the **MIT License**.
