if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js");
      console.log("Service Worker registered successfully");

      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        console.log("Notification permission:", permission);
      }
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  });
}
