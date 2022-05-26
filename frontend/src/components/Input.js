const Input = (props) => (
  <>
    <label htmlFor={props.identity}>{props.identity}</label>
    <input 
      type={props.inputType}
      value={props.linked}
      onChange={props.action}
      placeholder={props.display}
      id={props.identity}
    />
  </>
)
export default Input;
