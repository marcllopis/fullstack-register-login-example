import React, { useContext } from "react";
import Input from "./Input";
import { Context } from "../context/Provider";

const Signup = () => {
  const context = useContext(Context);

  const handleSubmit= async (event) => {
    event.preventDefault();
    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        newUser: Context.newUser,
      }),
    })
  }

  return(
    <form onSubmit={handleSubmit}>
      <Input 
        inputType={"text"}
        linked={context.newUser.email}
        action={(event) => context.handleInfo(event, "email")}
        display={"Your email..."} 
        required 
      />
      <Input 
        inputType={"text"} 
        linked={context.newUser.password}
        action={(event) => context.handleInfo(event, "password")}
        display={"Your password..."} 
        required 
      />
      <Input 
        inputType={"text"} 
        linked={context.newUser.name}
        action={(event) => context.handleInfo(event, "name")}
        display={"Your name..."} 
      />
      <Input 
        inputType={"number"}
        linked={context.newUser.age}
        action={(event) => context.handleInfo(event, "age")}
        display={"Your age..."} 
      />
      <button>Register</button>
    </form>
  )
}

export default Signup;
