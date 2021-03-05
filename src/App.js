import { Navbar, NavbarBrand } from 'reactstrap'
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Awesome web app using React and Flask.</NavbarBrand>
        </div>
      </Navbar>
    </div>
  );
}

export default App;
