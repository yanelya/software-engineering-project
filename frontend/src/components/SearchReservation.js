import React from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState } from 'react'
import { displayTimes } from '../constantValues'


const ReservationForm = ({reservations, availableTables, reservationReady, selectedReservation}) => {
    const [cdate, setDate] = useState(new Date())
    const [numOfguests, setNumOfguests] = useState('')
    const [time, setTime] = useState('')
    const [isOpen, setIsOpen] = useState(false);    
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(!cdate || !numOfguests || !time){
            alert('Missing fields')
            return
        }

        //grabbing tables being occupied given date & time
        const reservationsForDateEntered = reservations.filter(({date}) => date === cdate.toDateString())
        let reservedTables = []
        for(let i = 0; i < reservationsForDateEntered.length; i++)
            reservedTables.push(reservationsForDateEntered[i].table_number)

        const reservation = {
            date: cdate, 
            time: time, 
            guests: numOfguests
        }
        
        availableTables(reservedTables)
        reservationReady(true)
        selectedReservation(reservation)
    }

    const handleChange = (e) => {
        setIsOpen(!isOpen);
        setDate(e);
    };

    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const selectTimes = displayTimes.map((ele, i) => {
        return(
            <option key={i} value={ele}>{ele}</option>
        )
    })

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className='form-control'>
            <label>Date</label>
            <button className='form-control-button' onClick={handleClick}>
                {cdate.toDateString()}
            </button>
            {isOpen &&
                <DatePicker 
                dateFormat='MMMM dd yyyy' 
                minDate={new Date()} 
                selected={cdate} 
                onChange={handleChange} 
                inline />
            }
        </div>

        <div className='form-control'>
            <label htmlFor='Time'>Time</label>
            <select name='Time' onChange={(e) => setTime(e.target.value)}>
                <option value="Select" defaultValue hidden>-- Select --</option>
                {selectTimes}
            </select >
        </div>

        <div className='form-control'>
            <label>Number of Guests</label>
            <input type='number' min='1' placeholder='Number of Guests' value={numOfguests} onChange={(e) => setNumOfguests(e.target.value)}/>
        </div>

        <input type='submit' value='Check available tables' className='btn btn-block'/>
        </form>
    </div>
  )
}

export default ReservationForm