import React from 'react'
import '../components/forecast.scss'

const Forecast = ({title, data}) => {
  
  return (
    <>
    <div className='border-bottom w-100 mt-5'>
        <p>{title}</p>
    </div>

    <div className='d-flex justify-content-between mt-4 w-100 forbreaks'>
        {
            data.map((item, index) => {
                return <div className=' d-flex flex-column align-items-center ' key={index}>
                    <span>{item.title}</span>
                    <img src={item.icon} alt="" />
                    <span>{`${item.temp}°`}</span>
                </div>
                })
        }
    </div>
    </>
  )
}

export default Forecast