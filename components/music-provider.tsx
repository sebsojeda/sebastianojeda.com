import { createContext, ReactNode, useContext, useState } from "react";
import Script from "next/script";
import useSWR from "swr";
import { useAuth } from "./auth-provider";

type MusicProviderProps = {
  children: ReactNode;
};

type MusicProviderContext = {
  authorize: any;
  unauthorize: any;
  isAuthorized: boolean;
  loading: boolean;
};

type MusicProviderState = {
  musicKit: any | null;
  loading: boolean;
};

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
  const { data, error } = useSWR("/api/music", (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: session?.access_token ?? "",
      },
      credentials: "same-origin",
    }).then((res) => res.json())
  );

  const [state, setState] = useState({ authorized: false, loading: true });

  const handleAuthorize = async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    await window.MusicKit.getInstance().authorize();
    await fetch("/api/music", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: session?.access_token ?? "",
      },
      body: JSON.stringify({
        token: window.MusicKit.getInstance().musicUserToken,
      }),
      credentials: "same-origin",
    });
    setState({ authorized: true, loading: false });
  };

  const handleUnauthorize = async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    await window.MusicKit.getInstance().unauthorize();
    await fetch("/api/music", {
      method: "DELETE",
      headers: {
        token: session?.access_token ?? "",
      },
      credentials: "same-origin",
    });
    setState({ authorized: false, loading: false });
  };

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
          window.MusicKit.configure({
            developerToken: data.data[0].value,
            app: {
              name: "sebastianojeda.com",
              builid: "0.0.1",
            },
          });
          console.log(window.MusicKit.getInstance());
          setState({
            authorized: window.MusicKit.getInstance().isAuthorized,
            loading: false,
          });
        }}
      />
      <MusicContext.Provider
        value={{
          authorize: handleAuthorize,
          unauthorize: handleUnauthorize,
          isAuthorized: state.authorized,
          loading: state.loading,
        }}
      >
        {props.children}
      </MusicContext.Provider>
    </>
  );
}
