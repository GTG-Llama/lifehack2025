export async function sendMsgToOpenAI(masterPrompt, messages) {
  // Generate the conversation from the last 20 messages
  const lastTwentyMessages = messages.slice(-40);
  const conversation = lastTwentyMessages.map(msg => 
    msg.isBot ? `Assistant: ${msg.text}` : `User: ${msg.text}`
  ).join('\n');

  // For last 20 messages using chat completion
  const fullPrompt = `${masterPrompt}\n\n${conversation}`;
  
  // just the last user message using assistant api
  // const fullPrompt = messages.slice(-1);

  try {
    const HEROKU_WEBSITE = window.location.origin;
    // Send request to your server's OpenAI endpoint
    const response = await fetch(HEROKU_WEBSITE + '/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: fullPrompt }),
    });
    const result = await response.json();
    return result.response;
  } catch (error) {
    console.error(error);
    throw new Error('Error communicating with the server');
  }
}


// OLD CODE BEFORE HARRY UPDATED IT

// export async function sendMsgToOpenAI(message) {
//     try {
//       const HEROKU_WEBSITE = window.location.origin;
//       // Send request to your server's OpenAI endpoint
//       const response = await fetch(HEROKU_WEBSITE + '/openai', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message }),
//       });
//       console.log('response server call: ', response);
//       const result = await response.json();
//       return result.response;
//       // return { text: result.response, isBot: true };
//     } catch (error) {
//       console.error(error);
//       throw new Error('Error communicating with the server');
//     }
//   };