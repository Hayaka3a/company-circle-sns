import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { supabase } from './createClient';
import { format } from 'date-fns';
import { useCookies } from 'react-cookie';
import LogSt from './components/cookie/logSt';
import styles from '../src/styles/message.module.css';
import ScoutPostEvent from './components/scoutPostEvent';
import ScoutPostIsland from './components/scoutPostIsland';

export default function Message() {
  LogSt();

  const { id } = useParams();

  const cookies = useCookies(["id"]);
  const userCookie = cookies[0].id;

  const [userMessages, setUserMessages] = useState([]);
  const [sender, setSender] = useState([]);
  const [posts, setPosts] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [showTextArea, setShowTextArea] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [scoutEvent, setScoutEvent] = useState([]);
  const [scoutIsland, setScoutIsland] = useState([]);

  const navi = useNavigate();

  //ひとつ前のページに戻る
  const pageBack = () => {
    navi(-1);
  };

  
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

      const messagesPosteBy = messages.map((message) => message.postedBy);
      fetchPosts(messagesPosteBy);
    }
  };

  const fetchPosts = async (messagesPosteBy) => {
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('id, userID, islandID, eventID')
      .in('id', messagesPosteBy);

    if (postsError) {
      console.log('postsの取得エラー', postsError);
      return;
    }

    if (posts) {
      setPosts(posts);

      const userIds = [];
      const eventIds = [];
      const islandIds = [];

      // ユーザーID、イベントID、アイランドIDに基づいて送信者を分類
      posts.forEach((post) => {
        if (post.userID) {
          userIds.push(post.userID);
        }
        if (post.eventID) {
          eventIds.push(post.eventID);
        }
        if (post.islandID) {
          islandIds.push(post.islandID);
        }
      });

      fetchUsers(userIds);
      fetchEvents(eventIds);
      fetchIslands(islandIds);
    }
  };

  const fetchUsers = async (userIds) => {
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .in('id', userIds);

    if (usersError) {
      console.log('usersの取得エラー', usersError);
      return;
    }

    if (users) {
      setSender((prevSender) => [...prevSender, ...users]);
    }
  };

  const fetchEvents = async (eventIds) => {
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .in('id', eventIds);

    if (eventsError) {
      console.log('eventsの取得エラー', eventsError);
      return;
    }

    if (events && events.length > 0) {
      setSender((prevSender) => [...prevSender, ...events]);
      const scoutValues = events.map((event) => event.scout);
      setScoutEvent(scoutValues.includes(true) ? [true] : []);
    }
  };

  const fetchIslands = async (islandIds) => {
    const { data: islands, error: islandsError } = await supabase
      .from('islands')
      .select('*')
      .in('id', islandIds);
  
    if (islandsError) {
      console.log('islandsの取得エラー', islandsError);
      return;
    }
  
    if (islands && islands.length > 0) {
      setSender((prevSender) => [...prevSender, ...islands]);
      const scoutValues = islands.map((island) => island.scout);
      setScoutIsland(scoutValues.includes(true) ? [true] : []);
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

    const { data, error } = await supabase
      .from('posts')
      .select('id')
      .eq('userID', userCookie)
      .single();

    if (error) {
      console.error('エラー:', error);
      return;
    }

    const userId = data?.id;

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

  useEffect(() => {
    const markMessageAsRead = async () => {
      const { error } = await supabase
        .from('messages')
        .update({ isRead: true })
        .eq('id', parseInt(id));

      if (error) {
        console.log('メッセージを既読にする際のエラー', error);
      }
    };

    markMessageAsRead();
  }, [id]);

  return (
    <div className={styles.back}>
       <button onClick={pageBack}>
        <img src="/island/close_btn.png" alt="閉じるボタン" className={styles.close_btn} />
       </button>
      <div className={styles.receive}>
        {userMessages.map((message) => {
          const post = posts.find((post) => post.id === message.postedBy);
          const user = sender.find((user) => user.id === post?.userID);
          const event = sender.find((event) => event.id === post?.eventID);
          const island = sender.find((island) => island.id === post?.islandID);
          return (
            <div key={message.id}>
              {user && (
                <div className={styles.flex}>
                  <p className={styles.from}>from:</p>
                  <img
                    id="img"
                    src={user.thumbnail || 'https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351'}
                    alt="user Thumbnail"
                  />
                  <h3 className={styles.userName}>{user.familyName}{user.firstName}</h3>
                </div>
              )}
              {event && (
                <>
                <div className={styles.flex}>
                  <p className={styles.from}>from:</p>
                  <img
                    id="img"
                    src={event.thumbnail || 'https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351'}
                    alt="event Thumbnail"
                  />
                  <h3 className={styles.userName}>{event.eventName}</h3>
                  </div>
                </>
              )}
              {island && (
                <>
                <div className={styles.flex}>
                  <p className={styles.from}>from:</p>
                  <img
                    id="img"
                    src={island.thumbnail || 'https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351'}
                    alt="island Thumbnail"
                  />
                  <h3 className={styles.userName}>{island.islandName}</h3>
                </div>
                </>
              )}
              <p className={styles.receiving_time}>
                受信日時: {format(new Date(message.sendingDate), 'yyyy年MM月dd日 HH:mm')}
              </p>
              {message.scout && post?.eventID ? (
                <ScoutPostEvent table={"event"} />
              ) : message.scout && post?.islandID ? (
                <ScoutPostIsland table={"island"} />
              ) : (
                <p className={styles.text_body}>{message.message}</p>
              )}
            </div>
          );
        })}
      </div>
      {!showTextArea && !userMessages.some((message) => message.scout) && (
      <button onClick={openTextArea}>返信する</button>
      )}      
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
