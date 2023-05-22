import './myList.scss'
import {useEffect, useState} from "react";
import clipboardCopy from "clipboard-copy";
import {CheckOutlined, CopyOutlined} from '@ant-design/icons';
import {  message } from 'antd';
export function MyList(props){
    const { cont } = props;
    const [content, setContent] = useState(cont);
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    };

    useEffect(() => {
        setContent(cont);
    }, [cont]);
    const handleCopy = () => {
        clipboardCopy(content);
        success('复制成功');
    };
    //应用
    function handleApply(){
        props.onClick(content);
        success('应用成功');
    }
    return (
        <div className="cont-main">
            {contextHolder}
            <div className="cont-text">
                <span>{cont}</span>
            </div>
            <div className="btns">
                <button className="apply" onClick={handleApply}>
                    <CheckOutlined />
                    应用
                </button>
                <button className="copy" onClick={handleCopy}>
                    <CopyOutlined />
                    复制
                </button>
            </div>
        </div>
    )
}
