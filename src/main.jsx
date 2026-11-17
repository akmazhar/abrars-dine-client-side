import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthProvider from "./AuthProvider/AuthProvider";

import MainLayout from "./MainLayout/MainLayout";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Blog from "./Pages/Blog/Blog";
import AllFood from "./Pages/AllFood/AllFood";
import MyOrder from "./Pages/MyOrder/MyOrder";
import UpdateFood from "./Pages/UpdateFood/UpdateFood";
import MyAddedFood from "./Pages/MyAddedFood/MyAddedFood";
import Details from "./Pages/AllFood/Details";
import PrivetRoute from "./Router/PrivetRoute";
import FoodPurchase from "./Pages/FoodPurchase/FoodPurchase";
import AddFood from "./Pages/AddFood/AddFood";
import UserProfile from "./Pages/UserProfile/UserProfile";

// Backend API
const API_URL = "https://abrars-dine-server.onrender.com";

// Create Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,

    children: [
      // Home
      {
        index: true,
        element: <Home />,
      },

      // Authentication
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },

      // All Food
      {
        path: "allFood",
        element: <AllFood />,
        loader: async () => {
          const response = await fetch(`${API_URL}/allfood`);

          if (!response.ok) {
            throw new Response("Failed to load food data", {
              status: response.status,
              statusText: response.statusText,
            });
          }

          return response.json();
        },
      },

      // Blog
      {
        path: "blog",
        element: <Blog />,
      },

      // My Orders
      {
        path: "myOrder",
        element: (
          <PrivetRoute>
            <MyOrder />
          </PrivetRoute>
        ),
      },

      // User Profile
      {
        path: "userProfile",
        element: (
          <PrivetRoute>
            <UserProfile />
          </PrivetRoute>
        ),
      },

      // Update Food
      {
        path: "updateFood/:id",
        element: (
          <PrivetRoute>
            <UpdateFood />
          </PrivetRoute>
        ),
        loader: async ({ params }) => {
          const response = await fetch(`${API_URL}/updateFood/${params.id}`);

          if (!response.ok) {
            throw new Response("Failed to load food details", {
              status: response.status,
              statusText: response.statusText,
            });
          }

          return response.json();
        },
      },

      // My Added Food
      {
        path: "myAddedFood",
        element: (
          <PrivetRoute>
            <MyAddedFood />
          </PrivetRoute>
        ),
      },

      // Food Details
      {
        path: "details/:id",
        element: <Details />,
      },

      // Food Purchase
      {
        path: "foodPurchase/:id",
        element: (
          <PrivetRoute>
            <FoodPurchase />
          </PrivetRoute>
        ),
        loader: async ({ params }) => {
          const response = await fetch(`${API_URL}/foodPurchase/${params.id}`);

          if (!response.ok) {
            throw new Response("Failed to load purchase details", {
              status: response.status,
              statusText: response.statusText,
            });
          }

          return response.json();
        },
      },

      // Add Food
      {
        path: "addFood",
        element: (
          <PrivetRoute>
            <AddFood />
          </PrivetRoute>
        ),
      },
    ],
  },
]);

// Render Application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
