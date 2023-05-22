import './style.scss'
import {Button, Input,notification} from 'antd';
import React from 'react';
import {api_address} from "../config/config";
import type { NotificationPlacement } from 'antd/es/notification/interface';
export function Login() {
    const [myKey, setMyKey] = React.useState('') //卡密
    const [api, contextHolder] = notification.useNotification(); //弹窗

    //弹窗
    const openNotification = (placement: NotificationPlacement,title,msg) => {
        api.info({
            message: title,
            description:msg,
            placement,
        });
    };

    //发起登录请求
    function login() {
        fetch(`${api_address}/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                kami: myKey,
            })
        }).then(res => res.json()).then(res => {
            if (res.status === 200) {
                openNotification('top','登录成功','欢迎您')
                setTimeout(() => {
                    //设置本地cookie
                    document.cookie = `token=${res.token}`
                    // 将cookie 存到lockalStorage
                    localStorage.setItem('token', res.token)
                    //跳转到首页
                    window.location.href = `/index`
                }, 1000)

            } else {
                openNotification('top','登录失败',res.msg)
            }
        }, err => {
            console.log(err)
        })
    }

    //弹窗

    //处理登录
    function handleLogin() {
        if (myKey === '') {
            openNotification('top','出错了','请输入卡密')
        } else {
            login()
        }
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            if (myKey === '') {
                openNotification('top','出错了','请输入卡密')
            } else {
                login()
            }
        }
    }

    return (
        <div className="login">
            {contextHolder}
            <div className="contner">
                <div className="head_cont">
                    <h1>登录</h1>
                </div>
                <div className="center_cont">
                    <div className="login_cont">
                        <Input value={myKey} onKeyDown={handleKeyDown} onChange={(e) => {
                            setMyKey(e.target.value)
                        }} placeholder="请输入卡密" allowClear/>
                        <Button type="primary" size="large" onClick={handleLogin}>登录</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}