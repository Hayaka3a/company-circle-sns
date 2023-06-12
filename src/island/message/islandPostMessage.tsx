import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../../styles/island/user_message_post.module.css';
import LogSt from '../../components/cookie/logSt';
import { supabase } from '../../createClient';
import { format } from 'date-fns';
import SendToIsland from '../../components/modalWindows/sendToIsland';

export default function IslandPostMessage() {
  LogSt();

  const { id } = useParams();

  const [userMessages, setUserMessages] = useState([]);
  const [islands, setIslands] = useState([]);
  const [posts, setPosts] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isOpen, setIsOpen] =useState(false);


  // 返信ボタンを押した際の小窓画面（モーダルウィンドウ）の開閉
  // isOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };



  useEffect(() => {
    fetchUserMessages();
  }, []);

  // CSS部分で画像URLを変更（imgタグ以外で挿入すれば、円形にしても画像が収縮表示されない）
  useEffect(() => {
    let circleElement = document.getElementById("img");
    if (circleElement) {
      circleElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  }, [imageUrl]);

  // messages情報取得
  const fetchUserMessages = async () => {
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .eq('postID', parseInt(id))
      .eq('status', false);

    if (messagesError) {
      console.log('messagesの取得エラー', messagesError);
      return;
    }

    if (messages) {
      setUserMessages(messages);

      const islandIDs = messages.map(message => message.postedBy);
      fetchPosts(islandIDs);
    }
  };

  // posts情報取得
  const fetchPosts = async (islandIDs) => {
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('id, islandID')
      .in('id', islandIDs);


    if (postsError) {
      console.log('postsの取得エラー', postsError);
      return;
    }

    if (posts) {
      setPosts(posts);
      const uniqueIslandIDs = Array.from(new Set(posts.map(post => post.islandID)));
      fetchIslands(uniqueIslandIDs);
    }
  };

  // islands情報取得
  const fetchIslands = async (islandIDs) => {
    const { data: islands, error: islandsError } = await supabase
      .from('islands')
      .select('*')
      .in('id', islandIDs);


    if (islandsError) {
      console.log('islandsの取得エラー', islandsError);
      return;
    }

    if (islands) {
      setIslands(islands);
    }
  };


  return (
    <div className={styles.back}>
      <Link to={`/island/post`}>
        <img src="/island/close_btn.png" alt="閉じるボタン" className={styles.close_btn} />
      </Link>
      <div className={styles.receive}>
        {userMessages.map((message) => {
          const post = posts.find((post) => post.id === message.postedBy);
          const island = islands.find((island) => island.id === post?.islandID);
          return (
            <div key={message.id}>
              {island && (
                <div className={styles.flex}>
                  <p className={styles.from}>from:</p>
                  <img
                    id='img'
                    src={island.thumbnail || "island/island_icon.png"}
                    alt='island Thumbnail'
                  >
                  </img>
                  <h3 className={styles.userName}>{island.islandName}</h3>
                </div>
              )}
              <p className={styles.receiving_time}>受信日時: {format(new Date(message.sendingDate), 'yyyy年MM月dd日 HH:mm')}</p>
              <p className={styles.text_body}>{message.message}</p>
            </div>
          );
        })}
      </div>
      <button onClick={openModal}>
        返信する
      </button>
      {isOpen && (
        <SendToIsland closeModal={closeModal} table='island'/>
      )}
    </div>
  );
}

