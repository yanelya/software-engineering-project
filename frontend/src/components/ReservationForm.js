import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css"
import { reservationsEndpoint } from '../constantValues'
import ReservationButton from './ReservationButton'
import SearchReservation from './SearchReservation'
import MakeReservation from './MakeReservation'
import TablesAvailable from './TablesAvailable'

const ReservationForm = () => {
    const [reservation, setReservation] = useState({
        date: '',
        time: '',
        guests: ''
    })
    const [reservationData, setReservationData] = useState([])
    const [occupantTables, setOccupantTables] = useState([])
    const [reserve, setReserve] = useState(false)
    const [dateChosen, setDateChosen] = useState(false)
    const [tableChosen, setTableChosen] = useState(false)
    const dataFetchedRef = useRef(false)
    
    //-------------------- Get Request --------------------
    function reservationsGetRequest () {
        axios.get(reservationsEndpoint, {})
        .then(res => {
            const resdata = res.data
            setReservationData(resdata)
        })
        .catch((error) =>
            console.log('Error sending data:', error)
    )}

    //----------------calls api once at render-------------
    useEffect(() => {
        if (dataFetchedRef.current) 
            return;
        dataFetchedRef.current = true
        reservationsGetRequest()
    }) 

  return (
    <div className='bottom-space'>
      <div className='container'>
        <div className="prevent-select">
          <h1>Reservation</h1>

          {!reserve && !dateChosen &&
            <ReservationButton 
            text='Make a Reservation' 
            reservationReady={setReserve} />
          }

          {reserve && !dateChosen && 
            <SearchReservation 
            reservations={reservationData} 
            availableTables={setOccupantTables} 
            reservationReady={setDateChosen} 
            selectedReservation={setReservation} />
          }

          {dateChosen && 
            <TablesAvailable 
            occupantTables={occupantTables} 
            reservationDetails={reservation}
            reservationReady={setTableChosen} />
          }

          {tableChosen && 
            <MakeReservation 
            reservationDetails={reservation}
            date={new Date()} 
            timeChosen={dateChosen} 
            reservationReady={setDateChosen} />
          }
            
        </div>
      </div>
    </div>
  )
}

export default ReservationForm