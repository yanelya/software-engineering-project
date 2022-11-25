import React from 'react'

const ReservationButton = ({text, reservationReady}) => {
  return (
    <div className='center'>
        <br></br><br></br>
        <button type="button" className="btn"  style={{backgroundColor:'black', color:'white'}} onClick={() => reservationReady(true)}>{text}</button>
    </div>
  )
}

export default ReservationButton