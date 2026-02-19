/* ================= PAGE INIT ================= */

document.addEventListener("DOMContentLoaded", function () {

  const token = localStorage.getItem("access");

  if (!token) {
    window.location.href = "login.html";
    return;
  }
  loadUserProfile();
  loadAvailableItems();
  loadActiveRentals();
});


/* ================= LOAD AVAILABLE ITEMS ================= */

async function loadAvailableItems(category = "") {

  const token = localStorage.getItem("access");

  let url = "http://127.0.0.1:8000/api/items/?is_available=true";

  if (category) {
    url += `&category=${category}`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }

    const data = await response.json();

    const container = document.getElementById("availableItemsContainer");

    if (!container) return;

    container.innerHTML = "";

    if (!data.length) {
      container.innerHTML = "<h3>No items available right now</h3>";
      return;
    }

    data.forEach(item => {

      container.innerHTML += `
        <div class="item-card">
          <div class="item-image">
            ${item.image 
              ? `<img src="${item.image}" style="width:100%;height:100%;object-fit:cover;">`
              : "📦"}
          </div>
          <div class="item-details">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="item-price">₹${item.price}/mo</div>
            <button onclick="rentItem(${item.id})">
              Rent Now
            </button>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading items:", error);
  }
}


/* ================= RENT ITEM ================= */

async function rentItem(itemId) {

  const token = localStorage.getItem("access");

  const response = await fetch(
    `http://127.0.0.1:8000/api/rentals/request/${itemId}/`,
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token
      }
    }
  );

  const data = await response.json();

  if (response.ok) {
    alert("Rental request sent to owner!");
    loadActiveRentals();
  } else {
    alert(data.error || "Failed to send request");
  }
}

async function loadUserProfile() {
  const token = localStorage.getItem("access");

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/accounts/profile/",
      {
        headers: {
          "Authorization": "Bearer " + token
        }
      }
    );

    const data = await response.json();

    // Navbar name
    const nameElement = document.getElementById("navbarUserName");
    if (nameElement) {
      nameElement.textContent = data.full_name && data.full_name.trim() !== ""
        ? data.full_name
        : data.email;
    }

    // Sidebar name
    const sidebarName = document.getElementById("sidebarUserName");
    if (sidebarName) {
      sidebarName.textContent = data.full_name && data.full_name.trim() !== ""
        ? data.full_name
        : data.email;
    }

    // Sidebar email
    const emailElement = document.getElementById("sidebarUserEmail");
    if (emailElement) {
      emailElement.textContent = data.email;
    }

  } catch (error) {
    console.error("Profile load error:", error);
  }
}




async function loadActiveRentals() {
  const token = localStorage.getItem("access");

  const response = await fetch(
    "http://127.0.0.1:8000/api/rentals/renter/active/",
    {
      headers: {
        "Authorization": "Bearer " + token
      }
    }
  );

  const data = await response.json();

  const container = document.getElementById("activeRentalsContainer");
  if (!container) return;
  container.innerHTML = "";

  if (!data.length) {
    container.innerHTML = "<p>No active rentals</p>";
    return;
  }

 data.forEach(rental => {
  container.innerHTML += `
    <div class="item-card">
      <div class="item-image">
        ${rental.image 
          ? `<img src="http://127.0.0.1:8000${rental.image}" style="width:100%;height:100%;object-fit:cover;">`
          : "📦"}
      </div>
      <div class="item-details">
        <h3>${rental.item}</h3>
        <div class="item-price">₹${rental.price}/mo</div>
      </div>
    </div>
  `;
});

}
function switchToOwnerDashboard() {
  window.location.href = "dashboard.owner.html";
}

function logoutUser() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

 

  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {

  const botIcon = document.getElementById("botIcon");
  const chatbot = document.getElementById("chatbot");
  const closeBtn = document.getElementById("closeBtn");

  if (botIcon) {
    botIcon.addEventListener("click", function () {
      chatbot.style.display = "block";
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      chatbot.style.display = "none";
    });
  }

});

function goToCategories() {

  const location = document.getElementById("locationSelect")?.value || "";
  const category = document.getElementById("categorySelect")?.value || "";
  const keyword = document.getElementById("searchInput")?.value || "";


  let url = "categories1.html?";

  if (location) url += `location=${encodeURIComponent(location)}&`;
  if (category) url += `category=${encodeURIComponent(category)}&`;
  if (keyword) url += `search=${encodeURIComponent(keyword)}&`;

  window.location.href = url;
}
document.addEventListener("DOMContentLoaded", function () {

  const params = new URLSearchParams(window.location.search);

  const location = params.get("location");
  const category = params.get("category");
  const search = params.get("search");

  loadCategoryItems(location, category, search);
});

async function loadCategoryItems(location, category, search) {

  let url = "http://127.0.0.1:8000/api/items/?is_available=true";

  if (category) {
    url += `&category=${category}`;
  }

  if (search) {
    url += `&search=${search}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  const container = document.getElementById("itemsContainer");
  if (!container) return;
  container.innerHTML = "";

  if (!data.length) {
    container.innerHTML = "<h3>No items found</h3>";
    return;
  }

  data.forEach(item => {
    container.innerHTML += `
      <div class="item-card">
        <img src="http://127.0.0.1:8000${item.image}">
        <h3>${item.title}</h3>
        <p>₹${item.price}/mo</p>
      </div>
    `;
  });
}
function handleBecomeLender() {
  const token = localStorage.getItem("access");

  if (!token) {
   
    window.location.href = "login.html";
  } else {
    
    window.location.href = "dashboard.owner.html";
  }
}

function applyCategoryFilter() {

  const selectedCategory = document.getElementById("categoryFilter").value;
  const sections = document.querySelectorAll(".items-section");

  sections.forEach(section => {

    const sectionCategory = section.getAttribute("data-category");

    if (
      selectedCategory === "All Categories" ||
      sectionCategory === selectedCategory
    ) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }

  });
}


const chatBody = document.getElementById("chatBody");

function addMessage(message, sender = "bot") {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "bot" ? "bot-msg" : "user-msg";
  msgDiv.innerText = message;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const userText = input.value.trim();

  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  setTimeout(() => {
    botReply(userText.toLowerCase());
  }, 500);
}

function botReply(text) {

  if (text.includes("rent")) {
    addMessage("To rent an item:\n1️⃣ Browse items\n2️⃣ Click Rent\n3️⃣ Wait for owner approval\n4️⃣ Wallet amount will deduct automatically after approval 💰");
  }

  else if (text.includes("wallet")) {
    addMessage("Wallet system:\n💰 Add balance\n💸 Rent approval ke baad amount deduct hoga\n👤 Owner ko 90% milega\n🏢 10% platform commission");
  }

  else if (text.includes("owner")) {
    addMessage("Owner Dashboard:\n📦 Add new item\n📥 Approve/Reject requests\n📊 Track earnings");
  }

  else if (text.includes("signup")) {
    addMessage("Signup using your college email.\nOnly verified college students allowed 🎓");
  }

  else if (text.includes("buy")) {
    addMessage("Buy option limited items ke liye hai:\n📚 Notes\n🖩 Calculators\n🔌 Small electronics\nHigh-risk items allowed nahi hain.");
  }

  else {
    addMessage("Hi 👋 I am CampusRent Assistant.\nYou can ask about:\n• Rent process\n• Wallet\n• Owner dashboard\n• Buy option\n• Signup");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  addMessage("Hello 👋 Welcome to CampusRent!\nHow can I help you today?");
});
