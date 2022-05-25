import Input from "./Input";

const Login = () => (
  <form>
    <Input 
      inputType={"text"}
      // linked={context.newUser.email}
      // action={(event) => context.handleInfo(event, "email")}
      display={"Your email..."} 
      required 
    />
    <Input
      inputType={"text"}
      // linked={context.newUser.email}
      // action={(event) => context.handleInfo(event, "email")}
      display={"Your password..."} 
      required 
    />
    <button>Log in</button>
  </form>
)

export default Login;
