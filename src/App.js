import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import Websocket from './components/Websocket';


function App() {
  return (
    <div className="App">
      <Navbar dark color="primary">
      <div className="container">
        <NavbarBrand href="/">Awesome web app using React and Flask.</NavbarBrand>
      </div>
      </Navbar>
      <header className="App-header">
        <Websocket />
      </header>
    </div>
  );
}

export default App;
