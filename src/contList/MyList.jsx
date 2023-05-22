import './myList.scss'
import {useEffect, useState} from "react";

export function MyList(props){
    const { cont } = props;
    const [isActive, setIsActive] = useState(false);
    const [content, setContent] = useState(cont);

    useEffect(() => {
        setContent(cont);
    }, [cont]);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={isActive ? 'cont-main active' : 'cont-main'} onClick={handleClick}>
            <div className="cont-text">
                <span>{cont}</span>
            </div>
            <div className="btns">
                <button className="apply" onClick={() => props.onClick(content)}>应用</button>
                <button className="copy">复制</button>
            </div>
        </div>
    )
}
