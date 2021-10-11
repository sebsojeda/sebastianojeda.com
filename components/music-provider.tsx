import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Script from "next/script";
import useSWR from "swr";
import { useAuth } from "./auth-provider";
import { TEAM_ID } from "../lib/apple-music";

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
  const { session } = useAuth();
  const [state, setState] = useState<{
    loading: boolean;
    musicKit: any;
    authorized: boolean;
  }>({
    loading: true,
    musicKit: null,
    authorized: false,
  });

  const { data, error } = useSWR("/api/music", (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        token: session?.access_token ?? "",
      },
      credentials: "same-origin",
    }).then((res) => res.json())
  );

  const handleAuthorize = async () => {
    setState({ ...state, loading: true });
    await state.musicKit.authorize();
    await fetch("/api/music", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: session?.access_token ?? "",
      },
      body: JSON.stringify({
        token: state.musicKit.musicUserToken,
      }),
      credentials: "same-origin",
    });
    setState({ ...state, loading: false, authorized: true });
  };

  const handleUnauthorize = async () => {
    setState({ ...state, loading: true });
    await state.musicKit.unauthorize();
    await fetch("/api/music", {
      method: "DELETE",
      headers: {
        token: session?.access_token ?? "",
      },
      credentials: "same-origin",
    });
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

  if (error) {
    return <div>Failed to load apple music connection</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Script
        src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"
        onLoad={() => {
          window.localStorage.setItem(
            `music.${TEAM_ID}.u`,
            data.data[1].attributes.musicUserToken
          );
          window.MusicKit.configure({
            developerToken: data.data[0].attributes.developerToken,
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