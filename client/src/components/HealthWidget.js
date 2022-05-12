import React from 'react'

function HealthWidget(props) {
  const {location, temperature, humidity, internal_co2} = props.data;
  return (
    <div>
      <h1>HealthWidget</h1>
      <p>Location: {location}</p>
      <p>Temperature: {temperature}</p>
      <p>Humidity: {humidity}</p>
      <p>Internal CO2: {internal_co2}</p>
      {/*<p>Location: {location} - {props.location}</p>*/}
      {/*<p>Temperature: {temperature} - {props.temperature}</p>*/}
      {/*<p>Humidity: {humidity} - {props.humidity}</p>*/}
      {/*<p>Internal CO2: {internal_co2} - {props.internal_co2}</p>*/}
    </div>
  )
}

export default HealthWidget
