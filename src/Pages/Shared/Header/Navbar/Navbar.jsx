
import { useContext } from 'react';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import Toast from './../../../Toast/Toast';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import { TbUserCircle } from "react-icons/tb";




const Navbar = () => {


  const {user, logOut} = useContext(AuthContext)
  console.log(user);
  const handleLogout = () => {
    logOut()
        .then(() => {
            Toast.success('log Out Successfully');
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
          <ul className="flex flex-wrap gap-10 text-center mr-5 font-serif text-sm font-semibold">
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
                to="/allFood"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-rose-600" : ""
                }
              >
               All Food Items
              </NavLink>
            </li>
          
            <li>
              <NavLink
                to="/blog"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-rose-600" : ""
                }
              >
               Blog 
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/userProfile"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-rose-600" : ""
                              }
                            >
                          User Profile
                            </NavLink>
                          </li> */}
                    {
                       user ?  <li>
                        <NavLink
                          to="/login"
                          className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "text-white" : ""
                          }
                        ><span>{user.email}</span>
                        <button onClick={handleLogout}>Logout</button>
                        </NavLink>
                      </li>
                      :
                      <li>
                      <NavLink
                        to="/login"
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "text-white" : ""
                        }
                      >
                        Login
                      </NavLink>
                      </li>

                      }

               <li>
              <NavLink
                to="/userProfile"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-rose-600" : ""
                              }
                            >
                        <TbUserCircle className='h-8 w-7'></TbUserCircle>
                            </NavLink>
                          </li>
           
                </ul>
               
               
                {/* <li className="list-none">
              {user ? (
              <div className="md:flex gap-2 text-right">

              <button onClick={logOut} className=" bg-black border-black h-15">
              <Link to={"/login"}><img className="bg-black  h-15"  src="https://i.ibb.co/BBQQ9mr/loOUT.png" alt="" /></Link>
              </button>
              </div>
              ) : (
              <button className="btn bg-black  h-15">
              <Link to={"/login"}><img className="bg-black border-black h-15" src="https://i.ibb.co/3m1vZ8F/log.png" alt="" /></Link>
              </button>
              )}
              </li> */}

              
             
                  {/* <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
              <div className="navbar-end">
          <a className="btn">Button</a>
        </div> */}


                </div>
                
              </nav>
            </div>
          );
        };

        export default Navbar;
