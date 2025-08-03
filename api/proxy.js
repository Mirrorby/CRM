
export default async function handler(req, res) {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbw_Y2A4JPXvi6IlRqXp81wyMCVVxpKwYUhSwydifs5drV50gis0EpU0K2HkjaVH0T0kjA/exec';

  const options = {
    method: req.method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  };

  try {
    const response = await fetch(scriptUrl, options);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при проксировании запроса', details: error.toString() });
  }
}
