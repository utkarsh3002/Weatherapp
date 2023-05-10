import hotBg from './images/hot.jpg'
import coldBg from './images/cold.jpg'
import Weatherdata from './Components/Weatherdata';
import { getFormattedWeatherData } from './WeatherService';
import { useEffect ,useState} from 'react';
function App() {
  const [city, setCity] = useState("Paris");
  const[weather,setweather]=useState(null);
  const [units, setUnits] = useState("metric");
  const[Bg,setBg]=useState(hotBg)
  useEffect(()=>{
    
    
       
    const fetchWeatherData=async ()=>{
      const data=await getFormattedWeatherData(city,units);
      // console.log(data);
      setweather(data);
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    }
    fetchWeatherData();
  },[units,city])
const handleUnitsClick=(e)=>{
const button =e.currentTarget;
const currentUnit=button.innerText.slice(1);
const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
// console.log(currentunit)
}
const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
  return (
    <div className="App" style={{background : `url(${Bg}) center/cover no-repeat`}}>
      <div className="overlay">
      {weather && (
        <div className="container">
          <div className="section section__inputs">
            <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder='Enter City...'/>
            <button onClick={(e)=>(handleUnitsClick(e))}>&deg;F</button>
          </div>
          <div className="section section__temperature">
            <div className="icon">
              <h3>{`${weather.name},${weather.country}`}</h3>
              <img src={weather.iconURL} alt="weathericon" />
              <h3>{weather.description}</h3>
            </div>
            <div className="temperature">
              <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
            </div>
          </div>
          <Weatherdata weather={weather} units={units}/>
        </div>
      )}
        
      </div>
    </div>
  );
}

export default App;
