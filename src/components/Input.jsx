import React, { useState } from 'react'
import'../components/input.scss'
import { CiSearch } from "react-icons/ci";
import { BiCurrentLocation } from "react-icons/bi";

const Input = ({setquery, setUnits}) => {

  const [city, setcity] = useState('');

  const handleSearchClick = () =>{
    if(city !== '') setquery({q: city})
  };

  const handleLocation=()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude, longitude}= position.coords
        setquery({lat: latitude, lon: longitude})
      })
    }
  }

  return (
    <div className='main-input row'>
        <div className='iconsalign col-12 col-md-10 col-sm-10 col-xs-12'>
            <input type="text" placeholder='search city...' className='inputfield' value={city}
            onChange={(e)=> setcity(e.currentTarget.value)}
            />
            <CiSearch size={30} className='searchicon' onClick={handleSearchClick}/>
            <BiCurrentLocation size={30} className='searchicon' onClick={handleLocation} />
        </div>
        <div className='col-12 col-md-2 col-sm-2 col-xs-12 celfar'>
          <button className='btn' onClick={()=> setUnits('metric')}>°c</button>
          <span>|</span>
          <button className='btn' onClick={()=> setUnits('imperial')}>°f</button>

        </div>
    </div>
  )
}

export default Input