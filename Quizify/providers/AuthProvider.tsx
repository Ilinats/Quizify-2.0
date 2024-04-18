/*import { supabase } from "@/lib/supabase";
import { PropsWithChildren, createContext, useState, useEffect, useContext} from "react";

type AuthData = {
    session: Session | null;
    loading: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
});

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        const fetchSession = async () => {
            const {data, error} = await supabase.auth.getSession();
            console.log(data.session);
            setSession(data.session);
            setLoading(false);
        };

        fetchSession();
        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            //setLoading(false);
        });

    }, []);

    return (
        <AuthContext.Provider value={{session, loading}}>
            {children}
        </AuthContext.Provider>
    );
}   

export const useAuth = () => {
    return useContext(AuthContext);
}
*/
import React, { useState, useEffect, createContext, PropsWithChildren } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export type AuthProps = {
  user: User | null
  session: Session | null
  initialized?: boolean
  signOut?: () => void
}

export const AuthContext = createContext<Partial<AuthProps>>({

});


export function useAuth() {
  return React.useContext(AuthContext)
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session ? session.user : null)
      setInitialized(true)
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    initialized,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
