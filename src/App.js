import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Login} from "./login/Login";
import {Hight} from "./menu/Hight"; // 引入路由



const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<Login/>}/>
                    <Route exact path="/index" element={<Hight/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
