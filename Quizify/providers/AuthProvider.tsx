import { supabase } from "@/lib/supabase";
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