import React, { useContext, useEffect } from "react";
import Input from "./Input";
import { Context } from "../context/Provider";
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const context = useContext(Context);
  // const navigate = useNavigate();

  // useEffect(() => context.setRegistration(false), [])

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
    // reset state for user to blank and redirect user to login page
    .then((response) => {
      context.setUser(context.emptyUser)
      context.setRegistration(true);
    //   if(response.status === 201) {
    //     context.setUser(response.name)
    //     return <Navigate replace to={"/login"} />
    //     // navigate("/login");
    //   } else {
    //     return <Navigate replace to={"/error"} />
    //   }
    })
  }

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
  )
}

export default Signup;
