import React, { SelectHTMLAttributes } from "react";

import "./styles.css";
//criando nosso próprio input
//dizendo que a nossa interface recebe os props do input html
//para que possamos ter acesso a todas as props de um input normal
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  //criando uma propriedade que vai receber um array de objeto
  options: Array<{
    value: string;
    label: string;
  }>;
}
//destruturando as props, pegando a label o nome e todas as outras props
const Select: React.FC<SelectProps> = ({ name, label, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest} >
        {/* Desabilitado, e escondido na listagem */}
        <option value="" disabled hidden>Selecione uma opção</option>
        {/* Fazendo o map para listar as opções que teremos no select */}
        {options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>;
        })}
      </select>
    </div>
  );
};

export default Select;
