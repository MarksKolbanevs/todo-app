import { useContext } from 'react';
import './index.scss';
import TodoContext from '../contexts/TodoContext';

export default function CustomCheckbox(props:{disabled?:boolean;completed?:boolean,onClick?: () => void}){
    return(
        <input className={props.completed ? "custom-checkbox completed" : "custom-checkbox"} disabled={props.disabled} type="checkbox" onClick={props.onClick} />
    )
}
