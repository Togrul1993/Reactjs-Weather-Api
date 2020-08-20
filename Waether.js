import React,{ useState } from 'react';


const api = {
  key: "199fd995bd5bd569dec70b713d1eb198",
  base:"https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
        });
     
    }
  }


  const dataBuilder = (d) => {

    let months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Octyabr", "Noyabr", "Dekabr"];

    let days = ["Bazar", "Bazar Ertəsi", "Çərşənbə Axşamı", "Çərşənbə", "Cümə Axşamı", "Cümə", "Şənbə"];

    let day = days[d.getDay()];

    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return ` ${date} ${month} ${year}  ${day}`
  }

  

  return (
    <div className={
      (typeof weather.main != "undefined")
        ? ((weather.main.temp > 16)
          ? 'warm app '
          : 'app')
        : 'app'
    }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name} , {weather.sys.country}</div>
              <div className="date">{dataBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)} °C</div>      
              <div className="weather">{weather.weather[0].main}</div>     
            </div>
          </div>
          
          ) : ('')}
      </main>
    </div>
  );
}

export default App;
