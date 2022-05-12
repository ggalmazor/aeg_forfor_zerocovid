import React from 'react'

function HealthWidget(props) {
    const {location, temperature, humidity, co2} = props.data;
  return (
    <div>
        <h1>HealthWidget</h1>
        <p>{location}</p>
        <p>{temperature}</p>
        <p>{humidity}</p>
        <p>{co2}</p>
    </div>
    
  )
}

export default HealthWidget