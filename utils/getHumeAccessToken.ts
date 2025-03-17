import "server-only";
import { fetchAccessToken } from "@humeai/voice";

export const getHumeAccessToken = async () => {
  const accessToken = await fetchAccessToken({
    apiKey: "7rb0aJbHG077zxV8V0RnmYoB6XeZ1OhcSYHzQCAFwFDpI73H",
    secretKey: "IWyGBA4AwXkBGGksYugxSklYE0sG7Kc8njKgPsKCYBlBFk2hFMTmqMSEUMr1hQRz",
  });
  console.log(accessToken);
  if (accessToken === "undefined") {
    return null;
  }

  return accessToken ?? null;
};
