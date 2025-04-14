import initializeTelegramUI from './initializeTelegramUI.js';
import { connectTelegramWallet } from './ton-connect.js';

document.addEventListener("DOMContentLoaded", () => {
  initializeTelegramUI();

  const connectButton = document.getElementById("connectWallet");

  document.fonts.ready.then(() => {
    connectButton.style.visibility = "visible";
    connectButton.style.opacity = "1";
  });

  connectButton.addEventListener("click", async () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");

    const result = await connectTelegramWallet();
    console.log(result);
  });
});
