import {useEffect, useState} from 'react';
import './App.css';
import HealthWidget from './components/HealthWidget';
import {io} from "socket.io-client";

function App() {

  const [healthData, setHealthData] = useState({location: 'aeg', temperature: -1, humidity: -1, internal_co2: -1});

  useEffect(() => {
    const socket = io("ws://localhost:4000", {
      reconnectionDelay: 1_000
    });

    socket.on('connected', () => {
      console.log("Received: 'connected'");
      socket.emit('subscribe', {location: 'aeg', field: 'temperature'});
      socket.emit('subscribe', {location: 'aeg', field: 'humidity'});
      socket.emit('subscribe', {location: 'aeg', field: 'internal_co2'});
      socket.emit('start');
    })

    socket.on('data', data => {
      setHealthData(prevState => {
        return {...prevState, [data.field]: data.value}
      });
    });
  }, []);

  return (
    <div className="App">
      <HealthWidget data={healthData} />
    </div>
  );
}

export default App;
