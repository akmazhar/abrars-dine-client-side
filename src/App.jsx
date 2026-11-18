import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AllFood from "./Pages/AllFood";
import UpdateFood from "./Pages/UpdateFood/UpdateFood";
import Home from "./Pages/Home/Home";

const API_URL = "https://abrars-dine-server.onrender.com";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/allFood",
    element: <AllFood />,
    loader: async () => {
      const response = await fetch(`${API_URL}/allfood`);

      if (!response.ok) {
        throw new Error("Unable to load food collection.");
      }

      return response.json();
    },
  },

  {
    path: "/UpdateFood",
    element: <UpdateFood />,
    loader: async ({ request }) => {
      const url = new URL(request.url);
      const id = url.searchParams.get("id");

      if (!id) {
        throw new Error("Food ID is missing.");
      }

      const response = await fetch(`${API_URL}/myAddedFood/${id}`);

      if (!response.ok) {
        throw new Error("Food not found.");
      }

      return response.json();
    },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
