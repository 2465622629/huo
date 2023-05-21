import './style.scss'
import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, {useCallback, useEffect, useState} from 'react'

import MenuBar from './MenuBar'
import {MyList} from '../contList/MyList'


const colors = ['#958DF1', '#F98181', '#FBBC88', '#FAF594', '#70CFF8', '#94FADB', '#B9F18D']
const names = ['Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna']

const getRandomElement = (list) => list[Math.floor(Math.random() * list.length)]

const getRandomRoom = () => {
    const roomNumbers = ['初级会员', '中级会员', '高级会员']
    return getRandomElement(roomNumbers.map((number) => `${number}`))
}

const getRandomColor = () => getRandomElement(colors)
const getRandomName = () => getRandomElement(names)

const room = getRandomRoom()


const getInitialUser = () => {
    return JSON.parse(localStorage.getItem('currentUser')) || {
        name: getRandomName(),
        color: getRandomColor(),
    }
}

export function Hight({alertCont, cont}) {
    const [changeData, setChangeData] = useState({})
    const [status, setStatus] = useState('connecting')
    const [currentUser, setCurrentUser] = useState(getInitialUser)
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
    //获取网页中class为ProseMirror的div
    // 定义text 为editor的内容 如果没有内容则为空
    const text = editor ? editor.getText() : ''


    const fetchData = () => {
        fetch('http://45.11.46.84/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': 'PHPSESSID=1fogrcdvgi2723f5auv17dilmu',
            },
            body: JSON.stringify({
                'text': text,
                'previous_text': '上一条文本',
                'next_text': '下一条文本',
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    console.log('Success:', data)
                    setChangeData(data)
                } else {
                    console.log('Error:', data)
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
            // editor.chain()
            //     .focus()
            //     .setTextSelection(from, to)
            //     .insertContent(value)
            //     .run()
        }
    }

    // 改写文本
    const changeText = () => {
        const selection = getSelection()
        console.log(selection)
        if (selection) {
            fetchData()
        }
    }
    // 创建一个组件列表，判断mockData是否为空，如果不为空则渲染MyList组件，否则渲染div
    const listItems = changeData.msg ? Object.values(changeData.msg).map((item, index) => {
        return <MyList cont={item} onClick={(value) => doSomething(value)}/>
    }) : <div>暂无数据</div>

    function doSomething(value) {
        setSelection(value)
    }

    return (
        <div className="cont">
            <div className="editor">
                {editor && <MenuBar editor={editor}/>}
                <EditorContent className="editor__content" editor={editor}/>
                <div className="editor__footer">
                    <button className="change_text_btn" onClick={changeText}>改写选中文本</button>
                </div>
            </div>
            <div className="right-cont">
                {listItems}
                {/*<MyList cont={"你好a"} onClick={(value) => doSomething(value)}/>*/}
            </div>
        </div>
    )
}
