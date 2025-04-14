document.addEventListener("DOMContentLoaded", async () => {
  initializeTelegramUI();
  initializeTonConnectUI();
});

function initializeTelegramUI() {
  const webApp = window.Telegram.WebApp;

  document.documentElement.style.setProperty(
    "--tg-viewport-stable-height",
    `${webApp.viewportStableHeight}px`
  );

  webApp.onEvent("viewportChanged", (event) => {
    if (event.isStateStable) {
      document.documentElement.style.setProperty(
        "--tg-viewport-stable-height",
        `${webApp.viewportStableHeight}px`
      );
    }
  });

  webApp.expand();
  webApp.lockOrientation();
  webApp.disableVerticalSwipes();
  webApp.setHeaderColor("#000000");
  webApp.setBackgroundColor("#000000");
  webApp.ready();
}

function initializeTonConnectUI() {
  const tonConnect = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: "https://kardashevsky.github.io/ton-connect-js-sdk/tonconnect-manifest.json",
    walletsList: ['telegram']
  });

  const connectButton = document.getElementById("connectWallet");

  document.fonts.ready.then(() => {
    connectButton.style.visibility = "visible";
    connectButton.style.opacity = "1";
  });

  connectButton.addEventListener("click", async () => {
    try {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");

      await tonConnect.connectWallet('telegram');
    } catch (error) {
      console.error("Ошибка при подключении к Telegram Wallet:", error);
    }
  });

  tonConnect.onStatusChange((wallet) => {
    if (wallet) {
      console.log("Кошелек подключен:", wallet);
      localStorage.setItem("ton_wallet", wallet.account.address);
    }
  });
}
