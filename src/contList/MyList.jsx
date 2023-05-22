import './myList.scss'
import {useEffect, useState} from "react";
import clipboardCopy from "clipboard-copy";
import {CheckOutlined, CopyOutlined} from '@ant-design/icons';
import {  message } from 'antd';
export function MyList(props){
    const { cont } = props;
    const [content, setContent] = useState(cont);
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: '复制成功',
        });
    };

    useEffect(() => {
        setContent(cont);
    }, [cont]);
    const handleCopy = () => {
        clipboardCopy(content);
        success();
    };
    return (
        <div className="cont-main">
            {contextHolder}
            <div className="cont-text">
                <span>{cont}</span>
            </div>
            <div className="btns">
                <button className="apply" onClick={() => props.onClick(content)}>
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
