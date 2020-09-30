import React, { TextareaHTMLAttributes } from "react";

import "./styles.css";
//criando nosso próprio input
//dizendo que a nossa interface recebe os props do input html
//para que possamos ter acesso a todas as props de um input normal
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}
//destruturando as props, pegando a label o nome e todas as outras props
const Textarea: React.FC<TextareaProps> = ({ name, label, ...rest }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...rest} />
    </div>
  );
};

export default Textarea;
