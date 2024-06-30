import React from 'react'
import '../components/button.scss'

const Buttons = ({setquery}) => {

  const cities = [
    {
      id: 1,
      name: 'Nagpur'
    },
    {
      id: 2,
      name: 'pune'
    },
    {
      id: 3,
      name: 'mumbai'
    },
    {
      id: 4,
      name: 'delhi'
    },
    {
      id: 5,
      name: 'hyderabad'
    }
  ]

  return (
    <div className='main-button'>

      {
        cities.map((i)=>{
          return <button className='btn' key={i.id} onClick={()=> setquery({q: i.name})}>{i.name}</button>
        })
      }

   
    </div>
  )
}

export default Buttons