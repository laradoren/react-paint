
import './styles/app.scss';
import Header from "./components/Header";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <div className="main">
            <Switch>
                <Route path = '/:id'>
                    <Header />
                    <div className="main__inner">
                        <Toolbar />
                        <Canvas />
                    </div>
                </Route>
                <Redirect to={`f${(+new Date).toString(16)}`}/>
            </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
