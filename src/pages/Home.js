import { useContext } from 'react';
import { SessionContext } from "../SessionProvider";
import { Navigate } from 'react-router-dom';

function Home() {
    // currentUserにログイン情報を受け渡す
    const { currentUser } = useContext(SessionContext);

    // currentUserがnullなら（＝未ログイン）なら/signinに遷移させる
    if(currentUser == null) return <Navigate replace to="/signin" />;

    return <div> this is Home</div>
}
export default Home;