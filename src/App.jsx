import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AllFood from "./Pages/AllFood";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Restaurant Management Website</h1>,
  },
  {
    path: "/allFood",
    element: <AllFood />,
    loader: () => fetch("https://abrars-dine-server.onrender.com/allfood"),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
