// Initialize TonConnect
const tonConnect = new TonConnect.TonConnect();

// Function to connect wallet
async function connectWallet() {
  try {
    const wallet = await tonConnect.connect(); // Correct method name if 'connectWallet' is incorrect
    console.log('Wallet connected:', wallet);
    // Передача данных в Unity
    if (typeof unityInstance !== 'undefined') {
      unityInstance.SendMessage('GameObjectName', 'OnWalletConnected', JSON.stringify(wallet));
    }
  } catch (error) {
    console.error('Error connecting wallet:', error);
    if (typeof unityInstance !== 'undefined') {
      unityInstance.SendMessage('GameObjectName', 'OnWalletConnectionError', error.message);
    }
  }
}

// Function to disconnect wallet
function disconnectWallet() {
  tonConnect.disconnect();
  console.log('Wallet disconnected');
  if (typeof unityInstance !== 'undefined') {
    unityInstance.SendMessage('GameObjectName', 'OnWalletDisconnected');
  }
}

// Example usage
// connectWallet(); // Вызывать из Unity при необходимости
