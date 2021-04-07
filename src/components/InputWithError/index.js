import React from "react";
import "./index.css";

function InputWithError(props) {
  return (
    <div className="flex-column">
      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
      { props.description && <span className="description">{props.description}</span> }
      { props.error && <span className="error">{ props.error }</span> }
    </div>
  )
}

export default InputWithError;