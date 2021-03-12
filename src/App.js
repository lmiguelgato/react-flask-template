import React, { Component } from 'react';
import { io } from "socket.io-client";
import { Navbar, NavbarBrand } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import './App.css';


const socket = io("http://localhost:5000/events");
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      userId: ""
    };
    
    console.log(socket)
    socket.on("connect", message => {
      console.log(message);
      socket.emit('status', {status: 'I\'m connected!'});
    })
    socket.on("userid", message => {
      console.log(message);
      this.setState({
        userId: message.userid
      })
    })
    socket.on("celerystatus", data => {
      console.log(data);
    });
  }

  handlePredictClick = (event) => {
    this.setState({ isLoading: true });
    console.log('test')
    fetch('http://localhost:5000/longtask', 
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

  componentDidMount() {
    
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
