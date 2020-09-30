import React, { InputHTMLAttributes } from "react";

import "./styles.css";
//criando nosso próprio input
//dizendo que a nossa interface recebe os props do input html
//para que possamos ter acesso a todas as props de um input normal
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}
//destruturando as props, pegando a label o nome e todas as outras props
const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...rest} />
    </div>
  );
};

export default Input;
