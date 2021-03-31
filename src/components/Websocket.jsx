import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import socketIOClient from "socket.io-client";

const ENDPOINT = 'http://127.0.0.1:5000'

function Websocket() {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('unassigned');
  const [status, setStatus] = useState('')
  const [progress, setProgress] = useState(0)

  const startJob = async () => {
    setIsLoading(true)
    const data = await axios.post('http://localhost:5000/job', {user_id: userId})
    setStatus(data.data.status)
  }

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('connected', data => {
      setUserId(data['user_id'])
    });

    socket.on('status', data => {
      if (data.current === data.total) {
        setIsLoading(false)
        setProgress(0)
      } else {
        setProgress(Math.floor(100*data.current/data.total))
        setStatus(data.status)
      }
    });
  }, [])

  return (
    <div>
      <Button
      block
      variant="success"
      disabled={isLoading}
      onClick={!isLoading ? startJob : null}>
      { isLoading ? 'Making prediction (' + progress + ' %)' : 'Predict' }
      </Button>
      {status}
    </div>
  )
}

export default Websocket;