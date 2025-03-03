import 'server-only';
import { fetchAccessToken } from "@humeai/voice";

export const getHumeAccessToken = async () => {
    const accessToken = await fetchAccessToken({
    apiKey: "pp46MOlpc3qGEB5gxuYLigo4A1N8GPOFAPLxwXqSkyBtskeZ",
    secretKey:"nDBWUrmSgfEhXPYVlM802XvlPhvYguyA7i0zUGT1QVaIOQJqwhUZs3m7FwAx6J4L",
  });
console.log(accessToken)
  if (accessToken === 'undefined') {
    return null;
  }

  return accessToken ?? null;
}