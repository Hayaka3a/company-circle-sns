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

// eventフォルダ
import EventDetail from "./event/[id]";
import EventCreate from "./event/create";
import EventEdit from "./event/edit";
import EventThread from "./event/thread";
import EventPost from "./event/post";
import EventMembers from "./event/members";

// islandフォルダ
import IslandDetail from "./island/[id]";
import IslandEdit from "./island/edit";
import EventAll from "./island/eventAll";
import IslandThread from "./island/thread";
import IslandCreate from "./island/create";
import IslandMembers from "./island/members";
import IslandPost from "./island/post";
import UserMessage from "./island/message/user_message";

// searchフォルダ
import Search from "./search";

// chat
import Chat from "./components/Chat";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
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
          {/* searchフォルダ */}
          <Route path="/search" element={<Search />} />
          {/* islandフォルダ */}
          <Route path="/island/:id" element={<IslandDetail />} />
          <Route path="/island/create" element={<IslandCreate />} />
          <Route path="/island/edit" element={<IslandEdit />} />
          <Route path="/island/eventAll" element={<EventAll />} />
          <Route path="/island/thread" element={<IslandThread />} />
          <Route path="/island/members/:id" element={<IslandMembers />} />
          <Route path="/island/post" element={<IslandPost />} />
          <Route
            path="/island/message/user_message"
            element={<UserMessage />}
          />
          {/* eventフォルダ */}
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/event/create" element={<EventCreate />} />
          <Route path="/event/edit" element={<EventEdit />} />
          <Route path="/event/thread" element={<EventThread />} />
          <Route path="/event/post" element={<EventPost />} />
          <Route path="/event/members/:id" element={<EventMembers />} />
          {/* chat */}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
