import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "geolocation-icon",
  webDir: "www",
  server: {
    url: "https://geolocation-nur.netlify.app",
  },
  plugins: {
    BackgroundRunner: {
      label: "com.example.background.task",
      src: "runners/background.js",
      event: "myCustomEvent",
      repeat: true,
      interval: 60, // Минимум 60 секунд для Android
      autoStart: true,
    },
    Geolocation: {
      backgroundMessage: "Отслеживание местоположения в фоне",
      backgroundTitle: "Геолокация активна",
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
    },
  },
};

export default config;
