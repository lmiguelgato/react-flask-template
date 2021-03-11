import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap'
import Button from 'react-bootstrap/Button';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  handlePredictClick = (event) => {
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/longtask', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({"elementid": "1", "userid": "2"})
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    const isLoading = this.state.isLoading;

    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Awesome web app using React and Flask.</NavbarBrand>
          </div>
        </Navbar>
        <Button
          block
          variant="success"
          disabled={isLoading}
          onClick={!isLoading ? this.handlePredictClick : null}>
          { isLoading ? 'Making prediction' : 'Predict' }
        </Button>
      </div>
    );
  }
}

export default App;
