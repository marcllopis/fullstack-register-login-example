import React, { useContext } from "react";
import Input from "./Input";
import { Context } from "../context/Provider";
import { Navigate } from "react-router-dom";

const Login = () => {
  const context = useContext(Context);

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
    // if user exists, response from backend provides their data
    .then((response) => response.json())
    .then((data) => {
      let userData = {
        email: context.user.email,
        password: context.user.password,
        name: data.userName,
        city: data.userCity,
        age: data.userAge
      }
      context.setUser(userData);
    //   if(response.status === 200) {
    //     return <Navigate to={"/profile"} />
    //   } else {
    //     return <Navigate to={"/error"} />
    //   }
    })
    .then(context.setRegistration(false))
    .then(context.setLoggedIn(true))
    // .then(data.LoggedIn ? context.setLoggedIn(true) : <Navigate to={"/error"} />)
  }

  return (
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
  )
}

export default Login;
