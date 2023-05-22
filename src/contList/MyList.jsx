import './myList.scss'
import {useEffect, useState} from "react";

export function MyList(props){
    const { cont } = props;
    const [content, setContent] = useState(cont);

    useEffect(() => {
        setContent(cont);
    }, [cont]);



    return (
        <div className="cont-main" onClick={() => props.onClick(content)}>
            <div className="cont-text">
                <span>{cont}</span>
            </div>
            <div className="btns">
                <button className="apply" onClick={() => props.onClick(content)}>应用</button>
            </div>
        </div>
    )
}
