import { useMusicKit } from "./music-provider";

export default function MusicConnection() {
  const { authorize, unauthorize, isAuthorized, loading } = useMusicKit();
  if (loading) {
    return <div>Loading music kit...</div>;
  }

  return (
    <div className="bg-accent-1 border border-accent-2 p-4 rounded-lg flex items-center justify-center">
      <div>
        <h3>Apple Music</h3>
        {isAuthorized ? (
          <button onClick={unauthorize}>Disconnect</button>
        ) : (
          <button onClick={authorize}>Connect</button>
        )}
      </div>
    </div>
  );
}
