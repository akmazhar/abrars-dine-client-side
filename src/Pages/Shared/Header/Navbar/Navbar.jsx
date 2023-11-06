import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";



const Navbar = () => {


  const {user, logOut} = useContext(AuthContext)
  console.log(user);
  const handleLogout = () => {
    logOut()
        .then(() => {
            toast.success('log Out Successfully');
        })
        .catch(error => {
            console.log(error.message)
        })
}
  

  return (
    <div className="bg-black text-white">
      <nav className="flex flex-wrap justify-between items-center py-2 shadow-md grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Logo />
     
        <div className="w-full md:w-auto ml-80 mr-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <ul className="flex flex-wrap gap-5 mr-5 font-mono text-xl font-semibold">
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-rose-600" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addProduct"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-rose-600" : ""
                }
              >
                Add Product
              </NavLink>
            </li>
          
            <li>
              <NavLink
                to="/myCart"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-rose-600" : ""
                }
              >
                My Cart
              </NavLink>
            </li>
{
  user ?  <li>
  <NavLink
    to="/login"
    className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "text-rose-600" : ""
    }
  >
   <button onClick={handleLogout}>Logout</button>
  </NavLink>
</li>
:
<li>
<NavLink
  to="/login"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-rose-600" : ""
  }
>
  Login
</NavLink>
</li>

}

           
           
          </ul>

          <li className="list-none">
              {user ? (
              <div className="md:flex gap-2 text-right">

              <button onClick={logOut} className=" bg-black  h-15">
              <Link to={"/login"}><img className="bg-black  h-15"  src="https://i.ibb.co/PcJrTF1/loOUT.png" alt="" /></Link>
              </button>
              </div>
              ) : (
              <button className="btn bg-black  h-15">
              <Link to={"/login"}><img className="bg-black  h-15" src="https://i.ibb.co/Bj482K6/log.png" alt="" /></Link>
              </button>
              )}
              </li>
              {/* <div>
               {
              user?.email ? <p>{user?.email}</p> : <p>{''}</p>
               }
               </div> */}
            {/* <li>
              <NavLink
                to="/register"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-rose-600" : ""
                }
              >
                Register
              </NavLink>
            </li> */}
          
{/* 
        <label className="swap swap-rotate mr-5"> */}
  
  {/* this hidden checkbox controls the state */}
  {/* <input type="checkbox" /> */}
  
  {/* sun icon */}
  {/* <svg className="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
   */}
  {/* moon icon */}
  {/* <svg className="swap-off fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
  
</label> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
