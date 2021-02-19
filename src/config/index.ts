import { firebaseConfig as devConfig } from "./config.dev";
import { firebaseConfig as prodConfig } from "./config";

export const getConfig = () =>
  process.env.NODE_ENV === "development" ? devConfig : prodConfig;
