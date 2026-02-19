const botIcon = document.getElementById("botIcon");
const chatbot = document.getElementById("chatbot");
const chatBody = document.getElementById("chatBody");
const closeBtn = document.getElementById("closeBtn");

/* Open chatbot */
botIcon.onclick = () => {
    chatbot.style.display = "flex";
    start();
};

/* Close chatbot manually */
closeBtn.onclick = () => {
    chatbot.style.display = "none";
};

/* Render helper */
function render(content) {
    chatBody.innerHTML = content;
}

/* ================= START PAGE ================= */
function start() {
    render(`
        <p><b>How may I help you?</b></p>

        <button class="option" onclick="rentQ1()">1. Rent Service</button>
        <button class="option" onclick="buyQ1()">2. Buy Service</button>
        <button class="option" onclick="sellQ1()">3. Sell Service</button>
        <button class="option" onclick="exitPage()">Exit</button>
    `);
}

/* ================= RENT FLOW ================= */
function rentQ1() {
    render(`
        <p><b>How long do you want to rent the item?</b></p>
        <button class="option" onclick="rentQ2()">Short term</button>
        <button class="option" onclick="rentQ2()">Long term</button>
    `);
}

function rentQ2() {
    render(`
        <p><b>Is the item required urgently?</b></p>
        <button class="option" onclick="endMessage()">Yes</button>
        <button class="option" onclick="endMessage()">No</button>
    `);
}

/* ================= BUY FLOW ================= */
function buyQ1() {
    render(`
        <p><b>Are you looking for a new or used item?</b></p>
        <button class="option" onclick="buyQ2()">New</button>
        <button class="option" onclick="buyQ2()">Used</button>
    `);
}

function buyQ2() {
    render(`
        <p><b>Do you want home delivery?</b></p>
        <button class="option" onclick="endMessage()">Yes</button>
        <button class="option" onclick="endMessage()">No</button>
    `);
}

/* ================= SELL FLOW ================= */
function sellQ1() {
    render(`
        <p><b>Is your item in working condition?</b></p>
        <button class="option" onclick="sellQ2()">Yes</button>
        <button class="option" onclick="sellQ2()">No</button>
    `);
}

function sellQ2() {
    render(`
        <p><b>Do you want to sell it immediately?</b></p>
        <button class="option" onclick="endMessage()">Yes</button>
        <button class="option" onclick="endMessage()">No</button>
    `);
}

/* ================= END MESSAGE ================= */
function endMessage() {
    render(`
        <p><b>Please go to home page then click on category and then select item</b></p>
        <br>
        <button class="option" onclick="exitPage()">Exit</button>
    `);
}

/* ================= EXIT PAGE ================= */
function exitPage() {
    render(`
        <p><b>If your issue is not resolved,please contact us at:</b><br>1234@gmail.com</p>

        <p><b>Give your feedback</b></p>

        <div id="stars">
            <span class="star" onclick="rate(1)">★</span>
            <span class="star" onclick="rate(2)">★</span>
            <span class="star" onclick="rate(3)">★</span>
            <span class="star" onclick="rate(4)">★</span>
            <span class="star" onclick="rate(5)">★</span>
        </div>

        <button class="submit-btn" onclick="submitFeedback()">Submit</button>
    `);
}

/* ================= STAR RATING ================= */
function rate(n) {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
        star.classList.toggle("active", index < n);
    });
}

/* ================= SUBMIT FEEDBACK ================= */
function submitFeedback() {
    render(`<p><b>Thank you for reaching us ☺️</b></p>`);

    // Auto close chatbot after 2 seconds
    setTimeout(() => {
        chatbot.style.display = "none";
    }, 2000);
}
