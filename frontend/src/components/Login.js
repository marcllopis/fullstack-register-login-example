import React, { useContext } from "react";
import Input from "./Input";
import { Context } from "../context/Provider";
import { Navigate } from "react-router-dom";

const Login = () => {
  const context = useContext(Context);

  // useEffect(() => context.setRegistration(false), [])

  const handleLogin = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/login" , {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: context.newUser.email,
        password: context.newUser.password
      })
    })
    .then((response) => {
      context.setNewUser({
        email: "",
        password: "",
        name: "",
        city: "",
        age: "",
      })
      if(response.status === 201) {
        return <Navigate to={"/profile"} />
      } else {
        return <Navigate to={"/error"} />
      }
    })
  }

  return (
    <form onSubmit={handleLogin}>
      <Input 
        inputType={"text"}
        linked={context.user.email}
        action={(event) => context.handleInfo(event, "email")}
        display={"Your email..."} 
        required 
      />
      <Input
        inputType={"password"}
        linked={context.user.password}
        action={(event) => context.handleInfo(event, "password")}
        display={"Your password..."} 
        required 
      />
      <button className="buttonify">Log in</button>
    </form>
  )
}

export default Login;
