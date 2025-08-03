
export default async function handler(req, res) {
  const url = "https://script.google.com/macros/s/1vQ2CozRviGNxMFzNruih0kP7VNFXNKT2diUecs4060TEsK2yYntg4cAi/exec";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при отправке данных в Apps Script" });
  }
}
