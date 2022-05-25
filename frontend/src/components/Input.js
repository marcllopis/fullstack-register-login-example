const Input = (props) => (
  <input 
    type={props.inputType}
    value={props.linked}
    onChange={props.action}
    placeholder={props.display}
  />
)
export default Input;
