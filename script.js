const API_URL = "https://script.google.com/macros/s/AKfycbw_Y2A4JPXvi6IlRqXp81wyMCVVxpKwYUhSwydifs5drV50gis0EpU0K2HkjaVH0T0kjA/exec";

async function uploadPhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(",")[1];
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          base64,
          fileName: file.name
        })
      });
      const result = await response.json();
      resolve(result.url);
    };
    reader.onerror = () => reject("Ошибка чтения файла");
    reader.readAsDataURL(file);
  });
}

async function submitOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const messenger = document.getElementById("messenger").value;
  const address = document.getElementById("address").value;
  const channel = document.getElementById("channel").value;
  const logistics = document.getElementById("logistics").value;
  const status = "Новый";

  const productContainers = document.querySelectorAll(".product-block");
  const products = [];

  for (let block of productContainers) {
    const article = block.querySelector(".article").value;
    const supplier = block.querySelector(".supplier").value;
    const count = parseInt(block.querySelector(".count").value);
    const orderSum = parseFloat(block.querySelector(".order-sum").value);
    const purchaseSum = parseFloat(block.querySelector(".purchase-sum").value);
    const comment = block.querySelector(".comment").value;
    const photoInput = block.querySelector(".photo");

    let photoUrl = "";
    if (photoInput && photoInput.files[0]) {
      photoUrl = await uploadPhoto(photoInput.files[0]);
    }

    products.push({ article, supplier, count, orderSum, purchaseSum, photoUrl, comment });
  }

  const payload = {
    name,
    phone,
    messenger,
    address,
    channel,
    logistics,
    status,
    products
  };

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  const result = await response.json();
  if (result.result === "ok") {
    alert("Заказ сохранён. ID: " + result.id);
    window.location.href = "index.html";
  } else {
    alert("Ошибка при сохранении заказа");
  }
}
