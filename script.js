document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM полностью загружен");

    const tonConnect = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: "./tonconnect-manifest.json",
    });

    const connectButton = document.getElementById("connectWallet");

    connectButton.addEventListener("click", async () => {
        try {
            if (window.Telegram && Telegram.WebApp) {
                Telegram.WebApp.HapticFeedback.impactOccurred("light");
            }
            console.log("Открытие модального окна TonConnect");
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
