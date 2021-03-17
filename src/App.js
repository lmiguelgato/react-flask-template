import React, { useState } from 'react';
import { io } from "socket.io-client";
import { Navbar, NavbarBrand } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import './App.css';


const socket = io("http://localhost:5000/events");
function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  
  console.log(socket)
  socket.on("connect", message => {
    console.log(message);
    socket.emit('status', {status: 'I\'m connected!'});
  })
  socket.on("userid", message => {
    console.log(message);
    setUserId(message.userid)
  })
  socket.on("celerystatus", data => {
    console.log(data);
  });

  const handlePredictClick = (event) => {
    setIsLoading(true);
    console.log('test');
    fetch('http://localhost:5000/longtask', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({"elementid": "1", "userid": userId})
      })
      .then(response => response.json())
      .then(
        () => setIsLoading(false)
      );
  }

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
        onClick={!isLoading ? handlePredictClick : null}>
        { isLoading ? 'Making prediction' : 'Predict' }
      </Button>
    </div>
  );
}

export default App;
