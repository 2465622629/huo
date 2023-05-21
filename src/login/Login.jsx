import './style.scss'

import {Button} from 'antd';
import React from 'react';
import TextArea from "antd/es/input/TextArea";
export function Login() {

    return (
        <div className="login">
            <div className="contner">
                <div className="head_cont">
                    <h1>登录</h1>
                </div>
                <div className="center_cont">
                    <div className="login_cont">
                        <TextArea size="large" placeholder="输入卡密" autoSize/>
                        <Button size="large">登录</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}