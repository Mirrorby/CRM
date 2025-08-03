
const API_URL = "https://script.google.com/macros/library/d/1vQ2CozRviGNxMFzNruih0kP7VNFXNKT2diUecs4060TEsK2yYntg4cAi/2";

// Пример: получить роль пользователя
function getUserRole(userId) {
  return fetch(`${API_URL}?userId=${userId}`)
    .then(res => res.json());
}

// Пример: отправка нового заказа
function submitOrderData(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function goHome() {
  window.location.href = "index.html";
}
