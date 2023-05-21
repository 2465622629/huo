import './App.css';
import {Hight} from "./menu/Hight";
import { BrowserRouter as Router, Switch, Route } from 'react-router'; // 引入路由



const App = () => {
    return (
        // <Router>
        //     <div className="App">
        //         <Switch>
        //             <Route exact path="/" component={Hight} />
        //         </Switch>
        //     </div>
        // </Router>
        <div className="App">
            <Hight/>
        </div>
    );
};

export default App;
