import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// ヘッダー
import Header from "./components/Header";

// userフォルダ
import UserDetail from "./user";
import UserPost from "./user/post";
import Login from "./user/login";
import IslandMessage from "./user/message/island_message";
import ScoutMessage from "./user/message/scout_message";
import OperationMessage from "./user/message/operation_message";
import NewUser from "./user/newUser";

// eventフォルダ
import EventDetail from "./event/[id]";
import EventCreate from "./event/create";
import EventEdit from "./event/edit";
import EventThread from "./event/thread";
import EventPost from "./event/post";
import EventMembers from "./event/members";
import EventEntryPermitPage from "./event/post/entryPermitPage";

// islandフォルダ
import IslandDetail from "./island/[id]";
import IslandEdit from "./island/edit";
import EventAll from "./island/eventAll";
import IslandThread from "./island/thread";
import IslandCreate from "./island/create";
import IslandMembers from "./island/members";
import IslandPost from "./island/post";
import UserMessage from "./island/message/user_message";
import IslandEntryPermitPage from "./island/post/entryPermitPage";

// searchフォルダ
import Search from "./search";

// chat
import Chat from "./components/Chat";

function App() {
  // ログインページのみヘッダーを非表示
  const showHeader = window.location.pathname !== "/user/login";

  return (
    <div>
      <BrowserRouter>
        {showHeader && <Header />}
        <Routes>
          {/* userフォルダ */}
          <Route path="/user" element={<UserDetail />} />
          <Route path="/user/post" element={<UserPost />} />
          <Route path="/user/login" element={<Login />} />
          <Route
            path="/user/message/island_message"
            element={<IslandMessage />}
          />
          <Route
            path="/user/message/scout_message"
            element={<ScoutMessage />}
          />
          <Route
            path="/user/message/operation_message"
            element={<OperationMessage />}
          />
          <Route path="/user/newUser" element={<NewUser />} />

          {/* searchフォルダ */}
          <Route path="/search" element={<Search />} />
          {/* islandフォルダ */}
          <Route path="/island/:id" element={<IslandDetail />} />
<<<<<<< HEAD
          <Route path="/island/create:id" element={<IslandCreate />} />
          <Route path="/island/edit:id" element={<IslandEdit />} />
=======
          <Route path="/island/create" element={<IslandCreate />} />
>>>>>>> main
          <Route path="/island/eventAll:id" element={<EventAll />} />
          <Route path="/island/thread:id" element={<IslandThread />} />
          <Route path="/island/edit" element={<IslandEdit />} />
          <Route path="/island/members/:id" element={<IslandMembers />} />
          <Route path="/island/post/:id" element={<IslandPost />} />
          <Route
            path="/island/post/entryPermit/:id"
            element={<IslandEntryPermitPage />}
          />
          <Route
            path="/island/message/user_message"
            element={<UserMessage />}
          />
          {/* eventフォルダ */}
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/event/create/:id" element={<EventCreate />} />
          <Route path="/event/edit/:id" element={<EventEdit />} />
          <Route path="/event/thread/:id" element={<EventThread />} />
          <Route path="/event/post/:id" element={<EventPost />} />
          <Route path="/event/members/:id" element={<EventMembers />} />
          <Route
            path="/event/post/entryPermit/:id"
            element={<EventEntryPermitPage />}
          />
          {/* chat */}
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
