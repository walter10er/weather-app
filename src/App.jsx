import axios from "axios"
import { useEffect, useState } from "react"
import {
  thunderstormSvg,
  drizzleSvg,
  rainSvg,
  snowSvg,
  atmosphereSvg,
  clearSvg,
  cloudSvg
} from "./assets/images/index.js"
import "./App.css"
import Buttons from "./components/Buttons.jsx"
import Temp from "./components/Temp.jsx"
import Cards from "./components/Cards.jsx"

const key = "b2289caf39ae85ba31da8b376941b1d4"
const url = "https://api.openweathermap.org/data/2.5/weather"

const initialState ={
  latitude:0,
  longitude:0
}

const conditionCodes = {
  thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
  rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
  snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  clear: [800],
  clouds: [801, 802, 803, 804]
}

const icons = {
  thunderstorm: thunderstormSvg,
  drizzle: drizzleSvg,
  rain: rainSvg,
  snow: snowSvg,
  atmosphere: atmosphereSvg,
  clear: clearSvg,
  clouds: cloudSvg
}



function App() {
  const [coords, setCoords] = useState(initialState)
  const[weather, setWeather] = useState({})
  const [toggle, setToggle] = useState(false)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    (navigator.geolocation.getCurrentPosition((position) => {
      const{latitude, longitude} = position.coords
      setCoords({latitude,longitude})
    }, (error) => {
      console.log("no aceptaste la ubicacion")
    }))
  }, [])


  useEffect(() => {
    setLoading (true)
    if (coords){
      axios.get(`${url}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`)
      .then(res => {
        const keys = Object.keys(conditionCodes)
        const iconName = keys.find(key => conditionCodes[key].includes(res.data?.weather[0]?.id))
        setWeather({
          city : res.data?.name ,
          country : res.data?.sys?.country,
          icon: icons[iconName],
          main : res.data?.weather[0]?.main,
          wind: res.data?.wind?.speed,
          clouds: res.data?.clouds?.all,
          pressure: res.data?.main?.pressure,
          temperature: parseInt(res.data?.main?.temp - 273.15)

        })
      }).catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
    }
  }, [coords])


const temp = toggle ? parseInt((weather.temperature * 9/5) + 32) : weather.temperature

  return (
    <>
      <div className="card">
        {loading ? (
          <h1>Cargando...</h1>
        ) : (
          <Cards weather = {weather}/>
        ) }

        {loading ? (
          <h1></h1>
        ) : (
          <Temp temp = {temp} toggle = {toggle}/>
        ) }

        {loading ? (
          <h1></h1>
        ) : (
          <Buttons setToggle = {setToggle} toggle = {toggle}/>
        ) }

      </div>
    </>
  )
}

export default App
