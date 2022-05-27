import React, { useContext } from 'react';
import { Context } from '../context/Provider';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const context = useContext(Context);

  const handleLogout = () => {
    context.setUser(context.emptyUser)
    context.setLoggedIn(false)
  }

  return(
    <nav>
      <section className='nav-header'>
        <img src="/images/letterP.png" className="logo" alt="logo" />
        <h1>Profilebook</h1>
      </section>
      {/* depending if user is logged in, show different buttons on the nav bar */}
      {context.loggedIn 
        ? 
          <Link to={"/"} onClick={handleLogout}>
            <h4>Logout</h4>
          </Link>
        :
          <section>
            <Link to={"/register"}>
              <h4>Sign up</h4>
            </Link>
            <Link to={"/login"}>
              <h4>Log in</h4>
            </Link>
          </section>
      }
    </nav>
  );
};

export default Navbar;
