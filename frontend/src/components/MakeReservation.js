import React from 'react'
import GuestForm from './GuestForm'
import { CustomLink } from './Navbar'

const MakeReservation = ({reservationDetails, reservationReady, reservationReady2}) => {

  const onSubmit = () => {
    reservationReady(false) 
    reservationReady2(false)
  }

  return (
    <div>
        <div className='sub-container'>
            <p>Date: {reservationDetails.date.toDateString()}</p>
            <p>Time: {reservationDetails.time}</p>
            <p>Table: {reservationDetails.table_number}</p>
        </div>

        <div className='center'>
            <br></br>
            <p className='mock-link' onClick={onSubmit}>Select different time or date</p>
        </div>

        <GuestForm />
        <br></br><hr></hr><br></br>

        <div className='center'>
            <CustomLink to='/Login'>Or login here</CustomLink>
        </div>
    </div>
  )
}

export default MakeReservation