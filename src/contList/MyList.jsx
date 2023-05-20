import './myList.scss'
import {useState} from "react";
import {Hight} from "../menu/Hight";

export function MyList(props) {
    const { cont } = props;
    const [isActive, setIsActive] = useState(false);
    //点击时改变div的className
    const handleClick = () => {
        setIsActive(!isActive);
    };
    function sendMsg() {
        console.log(cont);
        //将name传给父组件
        return <Hight cont={cont+'asdfa'}/>
    }
    return (
        <div className={isActive ? 'cont-main active' : 'cont-main'} onClick={handleClick}>
            <div className="cont-text">
                <span>{cont}</span>
            </div>
            <div className="btns">
                <button className="apply" onClick={sendMsg}>应用</button>
                <button className="copy">复制</button>
            </div>
        </div>
    )
}