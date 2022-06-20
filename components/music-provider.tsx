import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Script from "next/script";
import useSWR from "swr";

const TEAM_ID = "ns4695lqpz";

type MusicProviderProps = {
  children: ReactNode;
};

type MusicProviderContext = {
  authorize: any;
  unauthorize: any;
  isAuthorized: boolean;
  loading: boolean;
};

declare global {
  interface Window {
    MusicKit: any;
  }
}

const defaultContext: MusicProviderContext = {
  authorize: null,
  unauthorize: null,
  isAuthorized: false,
  loading: true,
};

const MusicContext = createContext(defaultContext);

export const useMusicKit = () => useContext(MusicContext);

export default function MusicProvider(props: MusicProviderProps) {
  const [state, setState] = useState<{
    loading: boolean;
    musicKit: any;
    authorized: boolean;
  }>({
    loading: true,
    musicKit: null,
    authorized: false,
  });

  const { data: developerToken, error: developerTokenError } = useSWR(
    "/api/developer-token",
    (url) =>
      fetch(url, {
        method: "GET",
        credentials: "same-origin",
      }).then((res) => res.json())
  );
  const { data: musicUserToken, error: musicUserTokenError } = useSWR(
    "/api/music-user-token",
    (url) =>
      fetch(url, {
        method: "GET",
        credentials: "same-origin",
      }).then((res) => res.json())
  );

  const handleAuthorize = async () => {
    setState({ ...state, loading: true });
    await state.musicKit.authorize();
    fetch("/api/music-user-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: state.musicKit.musicUserToken,
      }),
      credentials: "same-origin",
    });
    setState({ ...state, loading: false, authorized: true });
  };

  const handleUnauthorize = () => {
    setState({ ...state, loading: true });
    state.musicKit.unauthorize();
    setState({ ...state, loading: false, authorized: false });
  };

  useEffect(() => {
    if (window.MusicKit?.getInstance()) {
      setState({
        authorized: window.MusicKit.getInstance().isAuthorized,
        musicKit: window.MusicKit.getInstance(),
        loading: false,
      });
    }
  }, []);

  if (musicUserTokenError || developerTokenError) {
    return <div>Failed to load apple music connection</div>;
  }

  if (!developerToken || !musicUserToken) {
    return <div>Loading music connections...</div>;
  }

  return (
    <>
      <Script
        src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"
        onLoad={() => {
          musicUserToken.data &&
            window.localStorage.setItem(
              `music.${TEAM_ID}.u`,
              musicUserToken.data.value
            );
          window.MusicKit.configure({
            developerToken: developerToken.data?.value,
            app: {
              name: "sebastianojeda.com",
              builid: "0.0.1",
            },
          });
          setState({
            authorized: window.MusicKit.getInstance().isAuthorized,
            musicKit: window.MusicKit.getInstance(),
            loading: false,
          });
        }}
      />
      <MusicContext.Provider
        value={{
          authorize: handleAuthorize,
          unauthorize: handleUnauthorize,
          isAuthorized: state.musicKit?.isAuthorized ?? false,
          loading: state.loading,
        }}
      >
        {props.children}
      </MusicContext.Provider>
    </>
  );
}
