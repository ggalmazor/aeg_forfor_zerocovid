import {useEffect, useState} from 'react';
import './App.css';
import HealthWidget from './components/HealthWidget';
import {io} from "socket.io-client";

function App() {
  // const [location, setLocation] = useState('aeg');
  // const [temperature, setTemperature] = useState(-1);
  // const [humidity, setHumidity] = useState(-1);
  // const [internalCo2, setInternalCo2] = useState(-1);
  const [healthData, setHealthData] = useState({location: 'aeg', temperature: -1, humidity: -1, internal_co2: -1});

  useEffect(() => {
    const socket = io("ws://localhost:4000", {
      reconnectionDelay: 1_000
    });

    socket.on('connected', () => {
      console.log("Received: 'connected'");
      socket.emit('subscribe', {location: 'aeg', field: 'temperature'});
      socket.emit('subscribe', {location: 'aeg', field: 'humidity'});
      socket.emit('start');
    })

    socket.on('data', data => {
      console.log();
      // if (data.field === 'temperature')
      //   setTemperature(data.value);
      // if (data.field === 'humidity')
      //   setHumidity(data.value);
      // if (data.field === 'internal_co2')
      //   setInternalCo2(data.value);

      const algo = {
        location: healthData.location,
        temperature: healthData.temperature,
        humidity: healthData.humidity,
        internal_co2: healthData.internal_co2
      };
      algo[data.field] = data.value
      setHealthData(algo);
    });
  }, []);

  return (
    <div className="App">
      <HealthWidget data={healthData} />
      {/*<HealthWidget data={healthData} location={location} temperature={temperature} humidity={humidity} internal_co2={internalCo2}/>*/}
    </div>
  );
}

export default App;
