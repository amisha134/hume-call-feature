import Chat from "@/components/Chat";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";

export default async function CallPage() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error("Failed to fetch access token");
  }

  return (
    <div className="h-[calc(100vh-theme(spacing.14))]">
      <Chat accessToken={accessToken} />
    </div>
  );
}
