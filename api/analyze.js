export default async function handler(request, response) {
  // This function runs on a secure server, not in the browser.

  // Get the URL the user entered on the webpage
  const { slideUrl } = request.body;

  // Your original prompt
  const prompt = `Analyze the following Curipod slide content and provide a summary of the slide, identify the main pedagogical goal of the slide, and suggest 2-3 improvements to the slide to improve the pedagogical value. URL: ${slideUrl}`;

  try {
    const openAiResponse = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Your secret key is safe here on the server
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 250,
        temperature: 0.7,
      }),
    });

    const data = await openAiResponse.json();
    // Send the clean result back to the browser
    response.status(200).json(data);

  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch analysis' });
  }
}