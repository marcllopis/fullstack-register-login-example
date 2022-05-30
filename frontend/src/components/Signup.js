import React, { useContext } from "react";
import Input from "./Input";
import { Context } from "../context/Provider";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // send registration data to backend
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: context.user.email,
        password: context.user.password,
        name: context.user.name,
        city: context.user.city,
        age: context.user.age
      }),
    })
    .then((response) => {
      // reset state user to blank, so user data from db can be stored in it after login
      context.setUser(context.emptyUser)
      // redirect user to login page or to error page if something went wrong
      if (response.status === 201) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    });
  };

   // display form to register or redirect user to profile if already logged in
  return(
    <form onSubmit={handleSubmit}>
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
      <Input 
        inputType="text"
        linked={context.user.name}
        action={(event) => context.handleInfo(event, "name")}
        display="Your name..."
        identity="Name"
      />
      <Input 
        inputType="text"
        linked={context.user.city}
        action={(event) => context.handleInfo(event, "city")}
        display="Your city..." 
        identity="City"
      />
      <Input 
        inputType="number"
        linked={context.user.age}
        action={(event) => context.handleInfo(event, "age")}
        display="Your age..."
        identity="Age"
      />
      <button className="buttonify">Register</button>
    </form>
  );
};

export default Signup;
