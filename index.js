import initializeTelegramUI from './initializeTelegramUI.js';
import { connectTelegramWallet, disconnectTelegramWallet } from './ton-connect.js';

document.addEventListener("DOMContentLoaded", () => {
  initializeTelegramUI();

  const connectButton = document.getElementById("connectWallet");
  const disconnectButton = document.getElementById("disconnectWallet");

  document.fonts.ready.then(() => {
    connectButton.style.visibility = "visible";
    connectButton.style.opacity = "1";
    disconnectButton.style.visibility = "visible";
    disconnectButton.style.opacity = "1";
  });

  connectButton.addEventListener("click", async () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");

    const wallet = await connectTelegramWallet();
    if (wallet?.success === false) {
      console.error("Ошибка:", wallet.error);
    } else {
      console.log("✅ Кошелёк:", wallet.account.address);
    }
  });

  disconnectButton.addEventListener("click", () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");

    disconnectTelegramWallet();
  });
});
