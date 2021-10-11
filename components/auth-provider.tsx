import { Session, User } from "@supabase/gotrue-js";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthProviderProps = {
  client: SupabaseClient;
  children: ReactNode;
};

type AuthProviderState = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};

type AuthContextState = {
  user: User | null;
  session: Session | null;
  logout: () => any;
};

const defaultContext: AuthContextState = {
  user: null,
  session: null,
  logout: () => {},
};

export const AuthContext = createContext(defaultContext);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  client: supabase,
  ...props
}: AuthProviderProps) {
  const [state, setState] = useState<AuthProviderState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    setState({
      user: supabase.auth.session()?.user ?? null,
      session: supabase.auth.session(),
      loading: false,
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setState({ user: session?.user ?? null, session, loading: false });
    });

    return () => listener?.unsubscribe();
  }, [supabase]);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        session: state.session,
        logout: () => supabase.auth.signOut(),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
