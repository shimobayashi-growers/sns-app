import { createContext, useState, useEffect } from 'react';
import { authRepository } from './repositories/auth';

// セッションにidとパスワードを保存してログインをしつづけるための関数
const SessionContext = createContext();
const SessionProvider = (props) => {
    
    // currentUserを定義して、空にする
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setSession();
    }, []);
    
    // setSessionにsupabaseのログイン情報を見に行く
    const setSession = async () => {
        const currentUser = await authRepository.getCurrentUser();
        setCurrentUser(currentUser);
        setIsLoading(false);
    };
    
    // ローディングしていたら空の情報を渡す
    if(isLoading) return <div />;

    return (
        // props.childrenと書くことでapp.jsの子で使えるようになる（＝すべてのページで活用できる）
        <SessionContext.Provider value ={{ currentUser, setCurrentUser}}>
          {props.children}
        </SessionContext.Provider>
    );
};

export { SessionContext, SessionProvider };