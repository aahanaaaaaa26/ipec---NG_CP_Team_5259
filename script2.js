/* ================= PROTECTED PAGES ================= */

const protectedPages = [
    "dashboard.user.html",
    "dashboard.owner.html"
];

const currentPage = window.location.pathname.split("/").pop();
const accessToken = localStorage.getItem("access");

if (protectedPages.includes(currentPage) && !accessToken) {
    alert("Please login first!");
    window.location.href = "login.html";
}


/* ================= LOGIN ================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Invalid credentials ❌");
                return;
            }

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            alert("Login successful ✅");

            setTimeout(() => {
                window.location.href = "dashboard.owner.html";

            }, 800);

        } catch (error) {
            console.log("Login error:", error);
            alert("Server error ❌");
        }
    });
}


/* ================= SIGNUP ================= */
/* ================= SIGNUP ================= */


const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const college = document.getElementById("college").value;
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!email.endsWith("@ipec.org.in")) {
            alert("Invalid college email ❌");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match ❌");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/accounts/signup/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    full_name: fullName,
                    college_name: college
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || JSON.stringify(data));
                return;
            }

            alert("Signup successful ✅");

            setTimeout(() => {
                window.location.href = "login.html";
            }, 800);

        } catch (error) {
            console.error("Signup error:", error);
            alert("Server error ❌");
        }
    });
}