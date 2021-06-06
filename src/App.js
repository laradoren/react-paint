
import './styles/app.scss';
import Header from "./components/Header";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <div className="main">
      <Header />
      <div className="main__inner">
          <Toolbar />
          <Canvas />
      </div>
    </div>
  );
}

export default App;
