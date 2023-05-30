import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LogSt from "./components/cookie/logSt";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
reportWebVitals();

export default function Index() {
  LogSt();
  return (
    <>
      <p>hoge</p>
    </>
  );
}
