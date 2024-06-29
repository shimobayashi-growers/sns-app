import { useState, useContext, useEffect } from 'react';
import { SessionContext } from "../SessionProvider";
import { Navigate } from 'react-router-dom';
import { SideMenu } from '../components/SideMenu';
import { postRepository } from '../repositories/post';
import { Post } from '../components/Post';
import { Pagination } from '../components/Pagination';
import { authRepository } from '../repositories/auth';

const limit = 3;

function Home() {

    // コンテンツの投稿
    const [content, setContent] = useState('');

    // 投稿内容の表示
    const [posts, setPosts] = useState([]);

    // 現在のページ数
    const [page, setPage] = useState(1);

    // currentUserにログイン情報を受け渡す
    const { currentUser, setCurrentUser } = useContext(SessionContext);

    // 投稿内容を表示する
    useEffect(() => {
        fetchPosts();
    }, []);

    // 作成ボタンを押したときの処理
    const createPost = async () => {
        const post = await postRepository.create(content, currentUser.id);
        
        // リアルタイムで投稿内容が表示されるような処理
        setPosts([
            // 直近の投稿
            {
                ...post
                ,userId: currentUser.id
                ,userName: currentUser.userName
            // ここに過去の投稿をくっつける処理
            },...posts,
        ]);

        setContent('');
    }

    // postsの表示
    const fetchPosts = async (page) => {
        const posts = await postRepository.find(page, limit);
        setPosts(posts);
    };

    // 次のページ移動
    const moveToNext = async () => {
        const nextPage = page + 1;
        await fetchPosts(nextPage);
        setPage(nextPage);
    };

    // 前のページ移動
    const moveToPrev = async () => {
        const prevPage = page - 1;
        await fetchPosts(prevPage);
        setPage(prevPage);
    };

    // postの削除
    const deletePost = async (postId) => {
        await postRepository.delete(postId);
        // filter関数で一致するものだけひっぱりstateをきれいにする
        setPosts(posts.filter((post) => post.id !== postId));
    };

    // ログイン処理
    const signout = async () => {
        await authRepository.signout();
        setCurrentUser(null);
    } 

    // currentUserがnullなら（＝未ログイン）なら/signinに遷移させる
    if(currentUser == null) return <Navigate replace to="/signin" />;

    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-[#34D399] p-4">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">SNS APP</h1>
            <button className="text-white hover:text-red-600" onClick={signout}>ログアウト</button>
          </div>
        </header>
        <div className="container mx-auto mt-6 p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <textarea
                  className="w-full p-2 mb-4 border-2 border-gray-200 rounded-md"
                  placeholder="What's on your mind?"
                //   投稿内容をsetContentに渡す
                onChange={(e) => setContent(e.target.value)}
                // contentを表示して、見た目を何もない状態にする
                value={content}
                />
                <button 
                    className="bg-[#34D399] text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={createPost}
                    disabled={content === ''}
                >
                  Post
                </button>
              </div>
              <div className="mt-4">
                {posts.map((post)=>(
                    <Post key={post.id} post={post} onDelete={deletePost} />
                ))}
              </div>
              <Pagination
                onPrev={page > 1 ? moveToPrev : null}
                onNext={posts.length >= limit ? moveToNext : null}
                />
            </div>
            <SideMenu />
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;