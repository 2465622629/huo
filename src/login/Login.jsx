import './style.scss'
import {Button, Input,message } from 'antd';
import React from 'react';
import {api_address} from "../config/config";

export function Login() {
    const [myKey, setMykey] = React.useState('') //卡密
    const [messageApi, contextHolder] = message.useMessage();
    //发起登录请求
    function login() {
        fetch(`${api_address}/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //允许携带cookie
                'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({
                kami: myKey,
            })
        }).then(res => res.json()).then(res => {
            console.log(`登录结果`, res)
            console.log(res.headers)
            if (res.status === 200) {
                alert('登录成功')
                //获取本地cookie
                let cookie = res.headers
                console.log(`请求头${cookie}`)
                // window.location.href = `http://${window.location.host}/?cookie=${res.cookie}`
            } else {
                alert('登录失败，请检查卡密是否正确')
            }
        }, err => {
            console.log(err)
        })
    }

    //弹窗
    const openMessage = () => {
        messageApi.info('This is a normal message');
    };
    //处理登录
    function handleLogin() {
        if (myKey === '') {
            openMessage()
            return
        }
        login()
    }

    return (
        <div className="login">
            <div className="contner">
                <div className="head_cont">
                    <h1>登录</h1>
                </div>
                <div className="center_cont">
                    <div className="login_cont">
                        <Input value={myKey} onChange={(e) => {
                            setMykey(e.target.value)
                        }} placeholder="请输入卡密" allowClear/>
                        <Button type="primary" size="large" onClick={handleLogin}>登录</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}