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
import MyOrder from './Pages/MyOrder/MyOrder';
import UpdateFood from './Pages/UpdateFood/UpdateFood';
import MyAddedFood from './Pages/MyAddedFood/MyAddedFood';
import Details from './Pages/AllFood/Details';
import PrivetRoute from './Router/PrivetRoute';
import FoodPurchase from './Pages/FoodPurchase/FoodPurchase';
import AddFood from './Pages/AddFood/AddFood';
// import Add from './Pages/MyAddedFood/Add';
// import Banner from './Pages/Shared/Banner/Banner';
// import Navbar from './Pages/Shared/Header/Navbar/Navbar';
// import Footer from './Pages/Shared/Footer/Footer';
// import Logo from './Pages/Shared/Header/Logo/Logo';
// import FoodCard from './Pages/FoodCard/FoodCard';
// import PrivetRoute from './Router/PrivetRoute';
// import Pagination from './Pages/Pagination/Pagination';
// import SearchFunctionality from './Pages/SearchFunctionality/SearchFunctionality';
// import SingleFood from './Pages/SingleFood/SingleFood';
// import EachCard from './Pages/EachCard/EachCard';





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
  {
    path: "/allFood",
    element: <AllFood></AllFood>
  },
  {
    path: "/blog",
    element: <Blog></Blog>
  },
  {
    path: "/myOrder",
    element: <PrivetRoute><MyOrder></MyOrder></PrivetRoute>
  },
  {
    path: "/userProfile",
    element: <UserProfile></UserProfile>
  },
  {
    path: "/updateFood",
    element: <PrivetRoute><UpdateFood></UpdateFood></PrivetRoute>,
    loader: ({params}) => fetch(`https://restaurant-management-server-three.vercel.app/updateFood/${params.id}`) 
  },

  {
    path: "/myAddedFood",
    element:<PrivetRoute><MyAddedFood></MyAddedFood></PrivetRoute>
  },
  {
    path: "/details/:id",
    element: <Details></Details>
  },
   {
    path: "/foodPurchase",
    element: <FoodPurchase></FoodPurchase>,
    loader: ({params}) => fetch(`https://restaurant-management-server-three.vercel.app/foodPurchase/${params.id}`) 
  },
  {
    path: "/addFood",
    element: <AddFood>,</AddFood>
  },

  // {
  //   path: "/eachCard",
  //   element: <EachCard></EachCard>
  // },
  // {
  //   path: "/foodCard",
  //   element: <FoodCard></FoodCard>
  // },


  // {
  //   path: "/pagination",
  //   element: <Pagination></Pagination>
  //   loader: ({currentPage, itemsPerPage}) => fetch(`https://restaurant-management-server-three.vercel.app/count?_page=${currentPage}&_limit=${itemsPerPage}`)
  // },
  // {
  //   path: "/searchFunctionality",
  //   element: <SearchFunctionality></SearchFunctionality>,
  //   loader: ({params}) => fetch(`https://restaurant-management-server-three.vercel.app/dish/${params.name}`) 
  // },
  // {
  //   path: "/singleFood",
  //   element: <SingleFood></SingleFood>
  // },
 
  
  // {
  //   path: "/add",
  //   element: <Add></Add>
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
