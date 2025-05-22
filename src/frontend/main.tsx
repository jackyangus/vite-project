import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import HomeApp from "./index";
import UiComponentsPage from "./pages/UiComponentsPage";

const rootEle = document.getElementById("root");
if (rootEle) {
  ReactDOM.createRoot(rootEle).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeApp />} />
            <Route path="/ui" element={<UiComponentsPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  );
}
