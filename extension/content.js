const TOKEN_KEY = "authToken";
const API_BASE_URL = "http://localhost:5000/api/generate";

window.addEventListener("message", function (event) {
  if (event.source != window) return;

  if (event.data.type && event.data.type == "FROM_PAGE") {
    console.log("Content script received message: " + event.data.token);
    if (!event.data.token) chrome.storage.local.remove(TOKEN_KEY);
    else chrome.storage.local.set({ [TOKEN_KEY]: event.data.token });
  }
});

const getAuthToken = async () => {
  const result = await chrome.storage.local.get([TOKEN_KEY]);
  return result[TOKEN_KEY];
};

// Function to insert the generate message button
function insertButton(textbox) {
  let button = document.createElement("button");
  button.className = "generateMessageBtn";
  button.type = "button"; // Explicitly set button type to "button"
  button.style.cssText = `
    border-radius: 30px;
    padding: 5px;
    height: 35px;
    min-width: 35px;
    position: absolute;
    background: #fff;
    box-shadow: inset 0 0 0 1px #cdd1dc;
    right: 4px;
    top: 4px;
    z-index: 1000;
  `;

  let img = document.createElement("img");
  img.src = chrome.runtime.getURL("assets/logo.png");
  img.alt = "Generate Message";
  img.width = 25;
  img.height = 25;
  button.appendChild(img);

  textbox.parentNode.appendChild(button);
  return button;
}

// Function to simulate typing
async function simulateTyping(text, messageBox) {
  if (!text) return;
  messageBox.innerHTML = "";
  let currentParagraph = document.createElement("p");
  messageBox.appendChild(currentParagraph);

  for (let char of text) {
    if (char === "\n") {
      currentParagraph = document.createElement("p");
      messageBox.appendChild(currentParagraph);
    } else {
      currentParagraph.innerHTML += char;
      await new Promise((resolve) => setTimeout(resolve, 5));

      const inputEvent = new Event("input", {
        bubbles: true,
        cancelable: true,
      });
      messageBox.dispatchEvent(inputEvent);
    }
  }
}

// Function to observe textboxes and add buttons
function observeTextboxes(callback) {
  function processTextbox(textbox) {
    if (!textbox.dataset.processed) {
      callback(textbox);
      textbox.dataset.processed = "true";
    }
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.getAttribute("role") === "textbox") {
              processTextbox(node);
            } else {
              node.querySelectorAll('[role="textbox"]').forEach(processTextbox);
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Process existing textboxes immediately
  document.querySelectorAll('[role="textbox"]').forEach(processTextbox);

  return observer;
}

// Main function to set up the message generator
async function setupMessageGenerator(textbox) {
  const button = insertButton(textbox);
  const loadingImg = document.createElement("img");
  loadingImg.src = chrome.runtime.getURL("assets/loading.svg");
  loadingImg.alt = "Loading";
  loadingImg.width = 25;
  loadingImg.height = 25;
  loadingImg.style.display = "none"; // Hide the loading image initially

  button.appendChild(loadingImg);

  button.onclick = async function (event) {
    const token = await getAuthToken();
    if (!token) {
      alert("Please login to MessageMate to continue.");
      return console.error("No auth token found. Please log in to continue.");
    }
    // Prevent default action and stop event propagation
    event.preventDefault();
    event.stopPropagation();

    const normalImg = button.querySelector('img[alt="Generate Message"]');
    normalImg.style.display = "none";
    loadingImg.style.display = "inline"; // Show the loading image
    button.disabled = true;

    try {
      const userNameElement = document.querySelector(
        ".msg-entity-lockup__entity-title"
      );
      const userName = userNameElement?.textContent?.trim().toLowerCase() || "";
      const form = textbox.closest("form");
      const parent = form.parentElement;
      const allMessagesContainer = parent.querySelectorAll(
        '[class*="msg-s-event-listitem--other"]'
      );

      const allMyMessagesContainer = parent.querySelectorAll(
        '[class~="msg-s-event-listitem"]:not([class*="msg-s-event-listitem--other"])'
      );
      console.log(allMyMessagesContainer)
      const allMessages = [];
      const allMyMessages = []
      // Iterate over each parent element
      allMessagesContainer.forEach((parent) => {
        // Find the child element with the class 'msg-s-event__content'
        const child = parent.querySelector(".msg-s-event__content");
        if (child) {
          allMessages.push(child.innerText);
        }
      });

      allMyMessagesContainer.forEach((parent) => {
        // Find the child element with the class 'msg-s-event__content'
        const child = parent.querySelector(".msg-s-event__content");
        if (child) {
          allMyMessages.push(child.innerText);
        }
      });

      const lastReceivedMessage = allMessages[allMessages?.length - 1];
      const myCurrentMessage = textbox?.innerText;

      // send to service worker
      const res = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
          {
            action: "getUserInfo",
            payload: {
              lastReceivedMessage,
              myCurrentMessage,
              allMessages,
              allMyMessages,
              userName,
            },
          },
          (response) => {
            if (chrome.runtime.lastError) {
              return reject(chrome.runtime.lastError);
            }
            resolve(response);
          }
        );
      });
      const {message} = res.data
      await simulateTyping(message, textbox);
    } catch (error) {
      console.error("Error generating message:", error);
    } finally {
      loadingImg.style.display = "none"; // Hide the loading image
      normalImg.style.display = "inline"; // Show the normal image
      button.disabled = false;
    }
  };
}

// Initialize the observer
observeTextboxes(setupMessageGenerator);
