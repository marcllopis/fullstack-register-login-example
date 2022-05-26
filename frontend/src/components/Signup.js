import React, { useContext } from "react";
import Input from "./Input";
import { Context } from "../context/Provider";
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const context = useContext(Context);
  // const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: context.newUser.email,
        password: context.newUser.password,
        name: context.newUser.name,
        city: context.newUser.city,
        age: context.newUser.age
      }),
    })
    .then((response) => {
      // reset the state for registration
      context.setNewUser({
        email: "",
        password: "",
        name: "",
        city: "",
        age: "",
      })
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
        inputType={"text"}
        linked={context.newUser.email}
        action={(event) => context.handleInfo(event, "email")}
        display={"Your email..."} 
        required 
      />
      <Input 
        inputType={"password"} 
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
        inputType={"text"} 
        linked={context.newUser.city}
        action={(event) => context.handleInfo(event, "city")}
        display={"Your city..."} 
      />
      <Input 
        inputType={"number"}
        linked={context.newUser.age}
        action={(event) => context.handleInfo(event, "age")}
        display={"Your age..."} 
      />
      <button className="buttonify">Register</button>
    </form>
  )
}

export default Signup;
