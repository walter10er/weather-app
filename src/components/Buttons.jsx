
function Buttons({setToggle, toggle}) {
  return (
    <div>
      <button onClick={() => setToggle(!toggle)} className="card__button">Change to {!toggle ? "°F" : "°C"}</button>
    </div>
  )
}

export default Buttons