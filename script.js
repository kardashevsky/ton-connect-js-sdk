document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM полностью загружен");

    const tonConnect = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: "./tonconnect-manifest.json",
        buttonRootId: "connectWallet" 
    });

    const walletAddressEl = document.getElementById("walletAddress");
    const openModalButton = document.getElementById("openModal");

    console.log("TonConnectUI инициализирован");

    const savedWallet = localStorage.getItem("ton_wallet");
    if (savedWallet) {
        console.log("Найден сохраненный кошелек: ", savedWallet);
        walletAddressEl.textContent = "Подключенный кошелек: " + savedWallet;
    }

    tonConnect.onStatusChange((wallet) => {
        if (wallet) {
            console.log("Подключенный кошелек:", wallet);
            localStorage.setItem("ton_wallet", wallet.account.address);
            walletAddressEl.textContent = "Подключенный кошелек: " + wallet.account.address;
        }
    });

    openModalButton.addEventListener("click", async () => {
        try {
            console.log("Открытие модального окна TonConnect");
            await tonConnect.openModal();
        } catch (error) {
            console.error("Ошибка при открытии модального окна:", error);
        }
    });
});
