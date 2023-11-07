import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import AuthProvider from './AuthProvider/AuthProvider';
import UserProfile from './Pages/UserProfile/UserProfile';
import MainLayout from './MainLayout/MainLayout';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Blog from './Pages/Blog/Blog';
import AllFood from './Pages/AllFood/AllFood';
import EachCard from './Pages/EachCard/EachCard';
import FoodCards from './Pages/FoodCards/FoodCards';
import FoodPurchase from './Pages/FoodPurchase/FoodPurchase';
import MyOrder from './Pages/MyOrder/MyOrder';
import Pagination from './Pages/Pagination/Pagination';
import SearchFunctionality from './Pages/SearchFunctionality/SearchFunctionality';
import SingleFood from './Pages/SingleFood/SingleFood';
// import Banner from './Pages/Shared/Banner/Banner';
// import Navbar from './Pages/Shared/Header/Navbar/Navbar';
// import Footer from './Pages/Shared/Footer/Footer';
// import Logo from './Pages/Shared/Header/Logo/Logo';






const router = createBrowserRouter([
  {
    path: "/",
    element : <MainLayout></MainLayout>,
    errorElement : <ErrorPage></ErrorPage>,
    children : [
  {
      path : "/",
      element : <Home></Home>
  },
  {
    path: "/register",
    element: <Register></Register>
  },
  
  {
    path: "/login",
    element: <Login></Login>
  },
  // {
  //   path: "/addFood",
  //   element: <AddFood>,</AddFood>
  // },
  {
    path: "/allFood",
    element: <AllFood></AllFood>
  },
  {
    path: "/blog",
    element: <Blog></Blog>
  },
  {
    path: "/eachCard",
    element: <EachCard></EachCard>
  },
  {
    path: "/foodCards",
    element: <FoodCards></FoodCards>
  },
  {
    path: "/foodPurchase",
    element: <FoodPurchase></FoodPurchase>
  },
  {
    path: "/myOrder",
    element: <MyOrder></MyOrder>
  },
  {
    path: "/userProfile",
    element: <UserProfile></UserProfile>
  },
  {
    path: "/pagination",
    element: <Pagination></Pagination>
  },
  {
    path: "/searchFunctionality",
    element: <SearchFunctionality></SearchFunctionality>
  },
  {
    path: "/singleFood",
    element: <SingleFood></SingleFood>
  },
  // {
  //   path: "/updateFood",
  //   element: <UpdateFood></UpdateFood>
  // },

  //  {
  //   path: "/navbar",
  //   element: <Navbar></Navbar>
  // },
  // {
  //   path: "/footer",
  //   element: <Footer></Footer>
  // },
  // {
  //   path: "/banner",
  //   element: <Banner></Banner>
  // },
  // {
  //   path: "/logo",
  //   element: <Logo></Logo>
  // },

  ]
  },
]);

export default router;

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='max-w-7xl mx-auto'>
  <React.StrictMode>
    <AuthProvider>
 <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
  </div>
)
