import React from "react";

  const Button = ({className,buttonLabel,onClick}) =>{

return <button className={className} onClick={onClick}>
    {buttonLabel}
</button>

  }

  export default Button;