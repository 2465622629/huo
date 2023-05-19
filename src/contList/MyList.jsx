import './myList.scss'
import {useState} from "react";

export function MyList(props) {
    const { name } = props;
    const [isActive, setIsActive] = useState(false);
    //点击时改变div的className
    const handleClick = () => {
        setIsActive(!isActive);
    };
    return (
        <div className={isActive ? 'cont-main active' : 'cont-main'} onClick={handleClick}>
            <div className="cont-text">
                <span>内容{name}</span>
            </div>

            <div className="btns">
                <button className="apply">应用</button>
                <button className="copy">复制</button>
            </div>
        </div>
    )
}