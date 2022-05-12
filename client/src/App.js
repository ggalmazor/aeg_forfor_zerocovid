import { useState } from 'react';
import './App.css';
import HealthWidget from './components/HealthWidget';

function App() {
    const [healthData, setHealthData] = useState({location: 'AEG', temperature: '27', humidity: '57%', co2: '780'});
    return (
        <div className="App">
            <HealthWidget data={healthData}/> 
        </div>
    );
}

export default App;
