export default async function handler(request, response) {
  // 1. Get the 'slideUrl' that the frontend sent over
  const { slideUrl } = request.body;

  // 2. This is the prompt you were using before
  const prompt = `Analyze the following Curipod slide content...`; // Truncated for brevity

  // 3. This is the secure call to OpenAI from the backend
  try {
    const openAiResponse = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // The API key is now a secure environment variable on the server
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `${prompt} URL: ${slideUrl}`,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    const data = await openAiResponse.json();
    // 4. Send the result from OpenAI back to the frontend
    response.status(200).json(data);

  } catch (error) {
    // 5. Handle any errors
    response.status(500).json({ error: 'Failed to fetch analysis' });
  }
}