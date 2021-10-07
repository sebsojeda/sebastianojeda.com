import { css } from "@emotion/react";
import Button from "./button";
import { useMusicKit } from "./music-provider";

const Styles = {
  card: css`
    background-color: var(--color-accent-1);
    border: 1px solid var(--color-accent-2);
    padding: 1rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      margin: auto;
    }
  `,
};

export default function MusicConnection() {
  const { authorize, unauthorize, isAuthorized, loading } = useMusicKit();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div css={Styles.card}>
      <div>
        <h3>Apple Music</h3>
        {isAuthorized ? (
          <Button onClick={unauthorize}>Disconnect</Button>
        ) : (
          <Button onClick={authorize}>Connect</Button>
        )}
      </div>
    </div>
  );
}
