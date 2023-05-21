import './style.scss'

import {Button, Input} from 'antd';
import React from 'react';

export function Login() {
    const [myKey, setMykey] = React.useState('') //卡密
    //发起登录请求
    function login() {
        console.log("当前卡密", myKey)
        fetch('http://45.11.46.84/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                kami: myKey,
            })
        }).then(res => res.json()).then(res => {
            console.log(`登录结果`, res)
            if (res.status === 200) {
                alert('登录成功')
                window.location.href = '/'
            } else {
                alert('登录失败，请检查卡密是否正确')
            }
        }, err => {
            console.log(err)
        })
    }

    //处理登录
    function handleLogin() {
        if (myKey === '') {
            alert('请输入卡密')
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
                        <Button size="large" onClick={handleLogin}>登录</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}