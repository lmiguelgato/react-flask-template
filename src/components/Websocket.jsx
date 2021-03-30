import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import socketIOClient from "socket.io-client";

const ENDPOINT = 'http://127.0.0.1:5000'

function Websocket() {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('unassigned');
  const [status, setStatus] = useState('')

  const startJob = async () => {
    setIsLoading(true)
    console.log('Starting job')
    const data = await axios.post('http://localhost:5000/job', {user_id: userId})
    console.log('Response from API', data);
    setStatus(data.data.status)
  }

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log('inside useEffect')
    socket.on('connected', data => {
      console.log('Event', data);
      setUserId(data['user_id'])
    });

    socket.on('status', data => {
      console.log('Status', data.key);
      if (data.key === 'Task completed!') {
        setIsLoading(false)
      }
      setStatus(data.key)
    });
  }, [])

  return (
    <div>
      <Button
      block
      variant="success"
      disabled={isLoading}
      onClick={!isLoading ? startJob : null}>
      { isLoading ? 'Making prediction' : 'Predict' }
      </Button>
      {status}
    </div>
  )
}

export default Websocket;