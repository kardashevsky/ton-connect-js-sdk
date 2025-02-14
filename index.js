document.addEventListener("DOMContentLoaded", async () => {
    const webApp = window.Telegram.WebApp;
    webApp.expand();
    webApp.lockOrientation();
    webApp.disableVerticalSwipes();
    webApp.ready();

    const tonConnect = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: "./tonconnect-manifest.json",
    });

    const connectButton = document.getElementById("connectWallet");

    connectButton.addEventListener("click", async () => {
        try {
            webApp.HapticFeedback.impactOccurred("light");
            await tonConnect.openModal();
        } catch (error) {
            console.error("Ошибка при открытии модального окна:", error);
        }
    });

    tonConnect.onStatusChange((wallet) => {
        if (wallet) {
            console.log("Подключенный кошелек:", wallet);
            localStorage.setItem("ton_wallet", wallet.account.address);
            walletAddressEl.textContent = "Подключенный кошелек: " + wallet.account.address;
        }
    });
});
