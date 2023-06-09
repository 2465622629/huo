import './style.scss'
import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, {useEffect, useRef, useState} from 'react'
import {api_address} from "../config/config";
import MenuBar from './MenuBar'
import {MyList} from '../contList/MyList'
import {Tour, TourProps, Skeleton, notification} from "antd";
import type {NotificationPlacement} from "antd/es/notification/interface";


export function Hight() {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const [open, setOpen] = useState(false);
    const [changeData, setChangeData] = useState({})
    const [api, contextHolder] = notification.useNotification(); //弹窗

    const steps: TourProps['steps'] = [
        {
            title: '编辑您的论文',
            description: '这里是编辑区，您可以尽情发挥您的创意',
            target: () => ref1.current,
            placement: 'rightBottom',
        },
        {
            title: '这里对您选中的文本进行改写',
            description: '点击改写按钮，我们将使用最强大的AI技术为您提供修改建议',
            target: () => ref2.current,
            placement: 'rightTop',
        },
        {
            title: '单击应用按钮',
            description: '您只需要轻轻单击应用按钮，一篇完美的文章就诞生了',
            target: () => ref3.current,
            placement: 'leftTop',
        },
    ];

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                history: true,
            }),
            Highlight,
            TaskList,
            TaskItem,
            CharacterCount.configure({
                limit: 10000,
            }),
        ],
    })
    // 定义text 为editor的内容 如果没有内容则为空
    const text = editor ? editor.getText() : ''
    //弹窗
    const openNotification = (placement: NotificationPlacement, title, msg) => {
        api.info({
            message: title,
            description: msg,
            placement,
        });
    };

    //页面加载调用
    useEffect(() => {
        init()
    }, [])

    const fetchData = (data) => {
        fetch(`${api_address}/api.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'text': data,
                'previous_text': '上一条文本',
                'next_text': '下一条文本',
                'token': localStorage.getItem('token')
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    setChangeData(data)
                } else if (data.status === 402) {
                    //等待1秒
                    setTimeout(() => {
                        //账号失效
                        openNotification('top', '出错了', data.msg)
                        //清除token
                        localStorage.removeItem('token')
                        // 跳转到登录页面
                        window.location.href = '/'
                    }, 1500)
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }
    //获取选中的内容
    const getSelection = () => {
        if (editor) {
            const {from, to} = editor.state.selection
            return editor.getText().slice(from - 1, to)
        }
        return ''
    }

    //设置选中的内容
    const setSelection = (value) => {
        if (editor) {
            const {from, to} = editor.state.selection
            editor.commands.insertContentAt({from: from, to: to}, value)
        }
    }

    //加载本地文本
    function loadLocalText() {
        let localText = localStorage.getItem('text')
        // 获取当前文本内容
        let cont = editor.getText()
        if (cont.length=== 0) {
            editor.commands.setContent(localText)
        }
    }
    const handleUpdate = () => {
        const newContent = editor.getText()
        localStorage.setItem('text', newContent);
    };

    // 改写文本
    const changeText = () => {
        const selection = getSelection()
        if (selection) {
            setChangeData({})
            fetchData(text)
        }
    }
    // 创建一个组件列表，判断mockData是否为空，如果不为空则渲染MyList组件，否则渲染div
    const listItems = changeData.msg ? Object.values(changeData.msg).map((item, index) => {
        return <MyList cont={item} key={index} onClick={(item) => doSomething(item)}/>
    }) : <Skeleton active/>

    //初始化页面调用
    function init() {
        //判断用户是否第一次登录
        let isFirst = localStorage.getItem('isFirstLogin')
        if (isFirst === 'true') {
            setOpen(true)
            // 设置本地存储标记为已登录
            localStorage.setItem('isFirstLogin', false);
        }
        let isLogin = localStorage.getItem('token')
        if (!isLogin) {
            alert("请先登录")
            window.location.href = '/'
            //删除所有 dom
            document.body.innerHTML = ''
            setOpen(false)
        }
    }
    window.addEventListener('beforeunload', function(event) {
        localStorage.setItem('text', text);
    });

    function doSomething(value) {
        setSelection(value)
    }

    // 改写全部文本
    const changeAllText = () => {
        // 获取全部文本
        const allText = editor ? editor.getText() : ''
        setChangeData({})
        fetchData(allText)


        // 遍历文本
        // allText.content.forEach((item) => {
        //     if (item.type === 'paragraph') {
        //         item.content.forEach((item2) => {
        //             if (item2.type === 'text') {
        //                 console.log(`当前文本${item2.text}`)
        //             }
        //         })
        //     }
        // })
    }


    return (
        <div className="cont">
            {contextHolder}
            <div className="editor" ref={ref1}>
                {/*<div className="guide1" ref={ref2}></div>*/}
                {editor && <MenuBar editor={editor}/>}
                <EditorContent onBlur={handleUpdate} onClick={loadLocalText} className="editor__content" editor={editor}/>
                <div className="editor__footer" ref={ref2}>
                    <button className="change_text_btn" onClick={changeText}>改写选中文本</button>
                    <button className="change_text_btn" onClick={changeAllText}>改写全部文本</button>
                    <Tour open={open} onClose={() => setOpen(false)} steps={steps}/>
                </div>
            </div>
            <div className="right-cont" ref={ref3}>
                {listItems}
            </div>
        </div>
    )
}
