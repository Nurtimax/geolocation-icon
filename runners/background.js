// runners/background.js
import { Geolocation } from "@capacitor/geolocation";

export async function setupGeofencing() {
  try {
    // Запрашиваем разрешение на геолокацию
    const status = await Geolocation.requestPermissions();

    if (status.location !== "granted") {
      console.log("Разрешение на геолокацию не предоставлено");
      return;
    }

    // Начинаем отслеживание положения
    watchPosition();
  } catch (error) {
    console.error("Ошибка настройки гео-ограждения:", error);
  }
}

function watchPosition() {
  Geolocation.watchPosition({ enableHighAccuracy: true }, async (position) => {
    console.log(position, "pos");

    const info = await Device.getInfo();

    if (position) {
      const updates = {
        ...position.coords,
        ...info,
      };
      updateUserProfile(updates, String(positionId));
    }
  });
}

addEventListener("myCustomEvent", async (resolve, reject, args) => {
  try {
    await setupGeofencing();
    resolve();
  } catch (error) {
    console.error("Ошибка в фоновом задании:", error);
    reject(error);
  }
});
