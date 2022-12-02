import React from 'react'
import { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import ReservationButton from './ReservationButton'
import SearchReservation from './SearchReservation'
import MakeReservation from './MakeReservation'

const ReservationForm = () => {
    const [reservation, setReservation] = useState({
        date: new Date(),
        time: '',
        guests: '',
        table_number: []
    })
    const [reserve, setReserve] = useState(false)
    const [dateChosen, setDateChosen] = useState(false)
    const [tableChosen, setTableChosen] = useState(false)

  return (
    <div className='bottom-space'>
      <div className='container'>
        <div className="prevent-select">
          <h1>Reservation</h1>

          {!reserve && !dateChosen && !tableChosen &&
            <ReservationButton 
            text='Make a Reservation' 
            reservationReady={setReserve} />
          }

          {reserve && !dateChosen && !tableChosen &&
            <SearchReservation 
            reservationReady={setDateChosen} 
            reservationReady2={setTableChosen} 
            selectedReservation={setReservation} />
          }

          {reserve && dateChosen && tableChosen && 
            <MakeReservation 
            reservationDetails={reservation}
            reservationReady={setDateChosen} 
            reservationReady2={setTableChosen} />
          }
            
        </div>
      </div>
    </div>
  )
}

export default ReservationForm