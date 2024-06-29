import { useContext } from "react";
import { SessionContext } from "../SessionProvider";

export function Post(props) {

    // 削除ボタンをログイン時にだけ表示させたいため、ログイン情報を取得
    const { currentUser } = useContext(SessionContext);

    return (
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        {/* props.postでpostのデータを引っ張って表示する */}
        <h3 className="text-lg font-semibold">by {props.post.userName}</h3>
        <p className="text-gray-700">{props.post.content}</p>
        {currentUser.id === props.post.userId && (
        <button 
            onClick={()=>props.onDelete(props.post.id)}
            className="text-blue-500 hover:underline cursor-pointer focus:outline-none">
          削除
        </button>
        )}
      </div>
    );
  }