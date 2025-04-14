let tonConnectInstance = null;

export async function connectTelegramWallet() {
  if (!tonConnectInstance) {
    tonConnectInstance = new TON_CONNECT_UI.TonConnectUI({
      manifestUrl: 'https://kardashevsky.github.io/ton-connect-js-sdk/tonconnect-manifest.json',
    });
  }

  if (tonConnectInstance.wallet) {
    return tonConnectInstance.wallet;
  }

  try {
    const wallet = await tonConnectInstance.connectWallet('telegram');
    return wallet;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error?.message || "Unknown error",
    };
  }
}

export function disconnectTelegramWallet() {
  if (tonConnectInstance) {
    tonConnectInstance.disconnect();
    console.log("🔌 Кошелёк отключён");
  }
}
