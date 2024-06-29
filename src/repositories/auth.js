import { supabase } from "../lib/supabase"

export const authRepository = {
    async signup(name, email, password) {
        const {data,error} = await supabase.auth.signUp({
            email,
            password,
            options: {data: {name} },
        });
        // supabaseはerrorにエラーが返ってくる
        if (error != null) throw new Error(error.message);
        return { 
            ...data.user, 
            userName: data.user.user_metadata.name 
        };
    },

    async signin(email, password) {
        const {data,error} = await supabase.auth.signInWithPassword({
            email, 
            password
        });
        if (error) throw Error(error.message);
        return {
            ...data.user, 
            userName: data.user.user_metadata.name,
        };
    },

    async getCurrentUser() {
        // getSessionでログイン情報を取得
        // jwtが1時間まではsessionに保存してくれる
        const {data, error } = await supabase.auth.getSession();
        if(error != null) throw new Error(error.message);
        if(data.session == null) return;

        return {
            ...data.session.user,
            userName: data.session.user.user_metadata.name,
        };
    },

    // ログアウトの処理
    async signout() {
        const {error} = await supabase.auth.signOut();
        if(error != null) throw new Error(error.message);
        return true;
    },
};