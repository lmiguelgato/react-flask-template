import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import socketIOClient from "socket.io-client";

const ENDPOINT = 'http://127.0.0.1:5000'

function Websocket() {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('unassigned');
  const [statusList, setStatusList] = useState([])

  const startJob = async () => {
    setIsLoading(true)
    console.log('Starting job')
    const data = await axios.post('http://localhost:5000/job', {user_id: userId})
    console.log('Response from API', data);
    setStatusList(oldStatusList => [...oldStatusList, data.data.status])
  }

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('connected', data => {
      console.log('Event', data);
      setUserId(data['user_id'])
    });

    socket.on('status', data => {
      console.log('Status', data);
      if (data === 'Task completed!') {
        setIsLoading(false)
      }
      console.log(statusList)
      setStatusList(oldStatusList => [...oldStatusList, data.key])
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
      {statusList.map((status, index) => (<p key={index}>{status}</p>))}
    </div>
  )
}

export default Websocket;