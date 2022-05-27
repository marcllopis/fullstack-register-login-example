import React, { useContext } from "react";
import Input from "./Input";
import { Context } from "../context/Provider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // send login data to backend
    fetch("http://localhost:5000/login" , {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: context.user.email,
        password: context.user.password
      })
    })
    // check if user exists in database, otherwise redirect to error page
    .then((response) => { 
      // this check does not work with a ternary!
      if (response.status === 500) {
        context.setUser(context.emptyUser);
        navigate("/error");
      }  
      return response.json()
    })
    .then((data) => {
        // if the user profile exists in the db, store user data from backend response
        let userData = {
          email: context.user.email,
          password: context.user.password,
          name: data.userName,
          city: data.userCity,
          age: data.userAge
        };
        // pass user data into state & activate state for loggedIn
        context.setUser(userData);
        context.setLoggedIn(true);
        // redirect user to their profile
        navigate("/profile");
    });
  };

  // display form to login or redirect user to profile if already logged in
  return (
    // context.loggedIn 
    //   ? navigate("/profile") 
    //   :
        <form onSubmit={handleLogin}>
          <Input 
            inputType="text"
            linked={context.user.email}
            action={(event) => context.handleInfo(event, "email")}
            display="Your email..."
            identity="Email"
            required 
          />
          <Input
            inputType="password"
            linked={context.user.password}
            action={(event) => context.handleInfo(event, "password")}
            display="Your password..." 
            identity="Password"
            required 
          />
          <button className="buttonify">Log in</button>
        </form>
  );
};

export default Login;
