import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// ヘッダー
import Header from "./components/Header";

// userフォルダ
import UserPost from "./user/post";
import Login from "./user/login";
import IslandMessage from "./user/message/island_message";
import ScoutMessage from "./user/message/scout_message";
import OperationMessage from "./user/message/operation_message";
import NewUser from "./user/newUser";
import UserEdit from "./user";

// eventフォルダ
import EventDetail from "./event/[id]";
import EventCreate from "./event/create";
import EventEdit from "./event/edit";
import EventThread from "./event/thread";
import EventPost from "./event/post";
import EventMembers from "./event/members";
import EventEntryPermitPage from "./event/post/entryPermitPage";
import EventEverything from "./event/eventAll";

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
import IslandAll from "./island/islandAll";

// searchフォルダ
import Search from "./search";

// chat
import Chat from "./components/Chat";
import LogSt from "./components/cookie/logSt";
import Index from ".";

function App() {
  // ログインページのみヘッダーを非表示
  const showHeader = window.location.pathname !== "/user/login";
  const showNewUser = window.location.pathname !== "/user/newUser";

  return (
    <div className="App">
      <BrowserRouter>
        {showHeader && showNewUser && <Header />}
        <Routes>
          <Route path="/" element={<Index />} />
          {/* userフォルダ */}
          <Route path="/user" element={<UserEdit />} />
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
          <Route path="/user/edit" element={<UserEdit />} />

          {/* searchフォルダ */}
          <Route path="/search" element={<Search />} />
          {/* islandフォルダ */}
          <Route path="/island/:id" element={<IslandDetail />} />
          <Route path="/island/edit/:id" element={<IslandEdit />} />
          <Route path="/island/create" element={<IslandCreate />} />
          <Route path="/island/eventAll/:id" element={<EventAll />} />
          <Route path="/island/thread/:id" element={<IslandThread />} />
          <Route path="/island/members/:id" element={<IslandMembers />} />
          <Route path="/island/post/:id" element={<IslandPost />} />
          <Route
            path="/island/post/entryPermit/:id"
            element={<IslandEntryPermitPage />}
          />
          <Route
            path="/island/message/user_message/:id"
            element={<UserMessage />}
          />
          <Route path="/island/islandAll" element={<IslandAll />} />
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
          <Route path="/event/eventAll" element={<EventEverything />} />
          {/* chat */}
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
