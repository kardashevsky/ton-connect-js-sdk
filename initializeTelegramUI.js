export default function initializeTelegramUI() {
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
