import React, { useState } from 'react'
import { UilSearch, UilLocationPoint} from '@iconscout/react-unicons'

function Inputs({setQuery, units, setUnits}) {
  const [city, setCity] = useState("")

  const unitChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if(units !== selectedUnit) setUnits(selectedUnit);
  }

  const searchClick = () => {
    if(city !== '') setQuery({q: city})
  }

  const locationClick = () => {
    if(navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat, lon,
        })
      })
    }
  }
  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>

        <input value={city} onChange={(e) => setCity(e.currentTarget.value)} type="text" placeholder='search city'  className='text-xl font-light  p-2 w-full focus:outline-none shadow-xl capitalize placeholder:lowercase'></input>

        <UilSearch size={25} className="text-white cursor-pointer" 
        onClick={searchClick}  />

        <UilLocationPoint size={25} className="text-white cursor-pointer" onClick={locationClick} />
      </div>

      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button name='metric' className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={unitChange}>°C</button>
        <p className='text-xl text-white mx-1'>|</p>
        <button name='imperial'  className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={unitChange}>°F</button>
      </div>

    </div>
  )
}

export default Inputs