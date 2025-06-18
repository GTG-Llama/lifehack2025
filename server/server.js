require('dotenv').config();
const cors = require('cors');
const express = require('express');
// const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path'); 
console.log('Server starting...');

// Configure OpenAI API key for chat completions (this is used for the old frontend design, working)
const openaiApiKey = process.env.OPENAI_API_KEY;
const OpenAI = require('openai');
const openai = new OpenAI({apiKey: openaiApiKey, dangerouslyAllowBrowser: true});

// Configure OpenAI for assistant API (this is new for assistant API)
// const openaiApiKey = process.env.OPENAI_API_KEY;
// import OpenAI from "openai";
// // const openai = new OpenAI();
// const openai = new OpenAI({apiKey: openaiApiKey, dangerouslyAllowBrowser: true});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(path.resolve(__dirname, '..'), 'build'))); // Assuming your build folder contains your CSS and assets

// Define an endpoint that uses the OpenAI function
app.post('/openai', async (req, res) => {
    try {
        const message = req.body.message;
        console.log('Received message:', message);
        const response = await getAIResponse(message);
        console.log('The Response:', response);
        res.json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}); 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

async function getAIResponse(message) {
    try {
        // // Step 2: Create a Thread for the conversation
        // const thread = await openai.beta.threads.create();
        // const threadId = thread.id;

        // // Step 3: Add a Message to the Thread
        // const user_message_object = await openai.beta.threads.messages.create(
        //     threadId,
        //     {
        //       role: "user",
        //       content: message
        //     }
        // );

        // // Step 3.5: Get the Thread Messages List
        // const threadMessages = await openai.beta.threads.messages.list(
        //     threadId
        // );

        // // Step 4: Run the Assistant on the Thread
        // // Assuming you have an assistant ID, replace 'your_assistant_id' with the actual ID
        // const run = await openai.beta.threads.runs.create(
        //     threadId,
        //     { 
        //       assistant_id: "asst_G8ZxT0ZTOfuIlj2LbYKwgsRd",
        //     }
        // );

        // // Wait for the Run to complete and retrieve the final messages
        // // Wait for the Run to complete
        // while (true) {
        //     let checkResponse = await openai.beta.threads.runs.retrieve(
        //         threadId, 
        //         run.id
        //     );
        //     if (checkResponse.status === 'completed') {
        //         console.log("\n\n\n\n Status: completed \n\n\n\n\n");
        //         break;
        //     }
        //     await new Promise(resolve => setTimeout(resolve, 1000)); // Sleep to avoid hitting rate limits
        // }
        // const new_thread_messages = await openai.beta.threads.messages.list(
        //     threadId
        // );

        // // Once the status is complete, get the AI response (returns message object)
        // const bot_message_object = await openai.beta.threads.messages.retrieve(
        //     threadId,
        //     new_thread_messages.data[0].id
        // );

        // // extract bot message from the message object
        // function extractTextValueFromMessage(message) {
        //     if (message.content && Array.isArray(message.content)) {
        //         for (const item of message.content) {
        //             if (item.type === 'text' && item.text && typeof item.text === 'object' && 'value' in item.text) {
        //                 return item.text.value;
        //             }
        //         }
        //     }
        //     return null; // Return null if the value isn't found
        // }
        
        // ////////////// For debugging
        // console.log("Thread");
        // console.log(thread, "\n");
        // console.log("Message");
        // console.log(user_message_object, "\n");
        // // console.log("Message List");
        // // console.log(threadMessages.data, "\n");
        // // console.log("User Message");
        // function extractTextValueFromMessage(message) {
        //     if (message.content && Array.isArray(message.content)) {
        //         for (const item of message.content) {
        //             if (item.type === 'text' && item.text && typeof item.text === 'object' && 'value' in item.text) {
        //                 return item.text.value;
        //             }
        //         }
        //     }
        //     return null; // Return null if the value isn't found
        // }
        // // console.log(extractTextValueFromMessage(user_message), "\n");
        // console.log("Run");
        // console.log(run, "\n");
        // console.log("New Message List");
        // console.log(new_thread_messages.data, "\n");
        // console.log("AI Response");
        // console.log(extractTextValueFromMessage(bot_message_object), "\n");
        // //////////////
        
        
        // console.log('Bot message object:', extractTextValueFromMessage(bot_message_object));

        // return extractTextValueFromMessage(bot_message_object);


        // // Old method of using openai completion model
        
        // const res = await openai.completions.create({
        //     model: "gpt-3.5-turbo-instruct",
        //     prompt: message,
        //     temperature: 0.2,
        //     max_tokens: 4000,
        //     top_p: 1,
        //     frequency_penalty: 0
        // });
        // return res.choices[0].text;
        const res = await openai.chat.completions.create({
            messages: [{ role: "system", content: message }],
            model: "gpt-3.5-turbo-0125",
          });
        return res.choices[0].message.content;
    } catch(error) {
        console.error('Error in getAIResponse:', error);
        throw error;
    }
}