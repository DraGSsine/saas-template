// Constants
const TOKEN_KEY = "authToken";

const checkLoginStatus = async () => {
  try {
    const result = await chrome.storage.local.get([TOKEN_KEY]);
    const token = result[TOKEN_KEY];
    document.cookie = `authToken=${token}; path=/; max-age=86400; secure`;
    const userInfo = await fetch("http://localhost:5000/users/info", {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());

    updateUserInterface(userInfo);

    showPage(!!token);
  } catch (error) {
    console.error("Error checking login status:", error);
    showPage(false);
  }
};

// Function to show/hide pages based on auth status
const showPage = (isLoggedIn) => {
  const loginPage = document.getElementById("loginPage");
  const dashboardPage = document.getElementById("dashboardPage");
  if (isLoggedIn) {
    loginPage.classList.remove("active");
    dashboardPage.classList.add("active");
  } else {
    loginPage.classList.add("active");
    dashboardPage.classList.remove("active");
  }
};

// Function to update the UI with user data
const updateUserInterface = (userData) => {
  // Update user info
  document.querySelector(".user-name").textContent = userData.displayName;
  document.querySelector(".user-email").textContent = userData.email;
  if (userData.avatar) {
    document.querySelector(".avatar").src = userData.avatar;
  }
  if (userData.plan) {
    document.querySelector(".plan-badge").textContent = userData.plan;
  }

  if (userData) {
    if (userData.creditsUsed !== undefined) {
      document.querySelector(".stat-value").textContent = userData.creditsUsed;
    }
    if (userData.monthlyCredits) {
      document.querySelectorAll(".stat-value")[1].textContent =
        userData.monthlyCredits - userData.creditsUsed;
    }
  }
};

document
  .getElementsByClassName("auth-buttons")[0]
  .children[0].addEventListener("click", async (e) => {
    chrome.tabs.create({
      url: "http://localhost:3000/auth/signup",
    });
  });
document
  .getElementsByClassName("auth-buttons")[0]
  .children[1].addEventListener("click", async (e) => {
    chrome.tabs.create({
      url: "http://localhost:3000/auth/signup",
    });
  });

document
  .getElementsByClassName("terms")[0]
  .children[0].addEventListener("click", async (e) => {
    chrome.tabs.create({
      url: "http://localhost:3000/terms",
    });
  });

document
  .getElementsByClassName("terms")[0]
  .children[1].addEventListener("click", async (e) => {
    chrome.tabs.create({
      url: "http://localhost:3000/privacy",
    });
  });

window.addEventListener("load", checkLoginStatus);
