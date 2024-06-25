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
        return { ...data.user, userName: data.user.user_metadata.name };
    },
};