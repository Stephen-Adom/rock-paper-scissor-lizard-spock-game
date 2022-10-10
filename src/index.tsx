import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Play } from "./pages/Play";
import { store } from "./hooks/store";
import { Provider } from "react-redux";
import "./utils/firebase.config";
import { Welcome } from "./pages/Welcome";
import { ProtectedRoute } from "./components/ProtectedRoute";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/home",
    element: <App />,
    children: [
      {
        index: true,
        element: <ProtectedRoute component={<Home />} />,
      },

      {
        path: "play",
        element: <ProtectedRoute component={<Play />} />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
