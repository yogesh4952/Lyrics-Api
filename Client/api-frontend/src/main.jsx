import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Post from "./Components/Outlets/Post.jsx";
import Delete from "./Components/Outlets/Delete.jsx";
import Home from "./Components/Navbar/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/post",
        element: <Post />,
      },

      {
        path: "/delete",
        element: <Delete />,
      },
    ],
  },
]);
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={route}>
      <App />
    </RouterProvider>
  </StrictMode>
);
