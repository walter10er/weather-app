
function Temp({temp , toggle}) {
  return (
    <div>
      <h2 className="card__temperature">{temp} {toggle ? "°F" : "°C"}</h2>
    </div>
  )
}

export default Temp