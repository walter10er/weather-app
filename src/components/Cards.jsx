
function Cards({weather}) {
  return (
    <div>
      <h1 className="card__title">Weather App</h1>
        <h2 className="card__subtitle">{weather.city}, {weather.country}</h2>
        <div className="card__body">
          <img src={weather.icon} alt={weather.main} width={150}  />
          <div className="card__info">
            <h3 className="card__main">{weather.main}</h3>
            <p className="card__wind-speed">Wind speed {weather.wind} m/s</p>
            <p className="card__clouds">Clouds {weather.clouds}%</p>
            <p className="card__pressure">Pressure {weather.pressure} hPa</p>
          </div>
        </div>
    </div>
  )
}

export default Cards