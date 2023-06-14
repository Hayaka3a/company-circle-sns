import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from './createClient';
import { format } from 'date-fns';
import GetCookieID from './components/cookie/getCookieId';
import { useCookies } from 'react-cookie';
import LogSt from './components/cookie/logSt';
import styles from '../src/styles/message.module.css'

export default function Message() {
  LogSt();

  const { id } = useParams();

  const cookies = useCookies(["id"]);
  const postedBy = cookies[0].id;

  // console.log("Cookieから取得", postedBy);



  const [userMessages, setUserMessages] = useState([]);
  const [islands, setIslands] = useState([]);
  const [posts, setPosts] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUserMessages();
  }, []);

  useEffect(() => {
    let circleElement = document.getElementById('img');
    if (circleElement) {
      circleElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  }, [imageUrl]);

  const fetchUserMessages = async () => {
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .eq('id', parseInt(id))
      .eq('status', false);

    if (messagesError) {
      console.log('messagesの取得エラー', messagesError);
      return;
    }

    if (messages) {
      setUserMessages(messages);

      const islandIDs = messages.map((message) => message.postedBy);
      fetchPosts(islandIDs);
    }
  };

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

      const uniqueIslandIDs = Array.from(new Set(posts.map((post) => post.islandID)));
      fetchIslands(uniqueIslandIDs);
    }
  };

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

  const openTextArea = () => {
    setShowTextArea(true);
  };

  const handleSendMessage = async () => {
    const messageInput = document.getElementById('message-text') as HTMLInputElement;
    const messageText = messageInput.value.trim();
    if (messageText === '') {
      setErrorMessage('メッセージを入力してください。');
      return;
    }

    // データベースクエリを実行して、postedByの値に基づいてuserIDを取得
    const { data, error } = await supabase
      .from('posts')
      .select('id')
      .eq('userID', postedBy)
      .single();

    if (error) {
      console.error('エラー:', error);
      // エラーハンドリングを行う
      return;
    }

    // 結果からidを取得
    const userId = data?.id;

    // console.log("送信する側", userId)



    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const { data: messageData, error: messageError } = await supabase.from('messages').insert([
      {
        postID: posts[0].id,
        message: messageText,
        scout: false,
        isRead: false,
        isAnswered: false,
        postedBy: userId,
        status: false,
        sendingDate: formattedDate,
      },
    ]);

    if (messageError) {
      console.error('メッセージの送信中にエラーが発生しました:', error);
      return;
    }

    console.log('データが正常に送信されました');

    messageInput.value = '';
    setShowTextArea(false);
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

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
                    id="img"
                    src={island.thumbnail || 'island/island_icon.png'}
                    alt="island Thumbnail"
                  />
                  <h3 className={styles.userName}>{island.islandName}</h3>
                </div>
              )}
              <p className={styles.receiving_time}>
                受信日時: {format(new Date(message.sendingDate), 'yyyy年MM月dd日 HH:mm')}
              </p>
              <p className={styles.text_body}>{message.message}</p>
            </div>
          );
        })}
      </div>
      <button onClick={openTextArea}>返信する</button>
      {showTextArea && (
        <div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <textarea id="message-text" placeholder="返信メッセージを入力してください" />
          <button onClick={handleSendMessage}>送信</button>
        </div>
      )}
    </div>
  );
}
