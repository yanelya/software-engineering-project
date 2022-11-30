import React, { useState, useEffect, useRef } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { displayTimes, reservationsEndpoint } from '../constantValues'
import axios from 'axios'

const SearchReservation = ({reservedTables, reservationReady, selectedReservation}) => {
    const [cdate, setDate] = useState(new Date())
    const [numOfguests, setNumOfguests] = useState('')
    const [time, setTime] = useState('')
    const [isOpen, setIsOpen] = useState(false);  
    const [reservationData, setReservationData] = useState([])
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
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(!cdate || !numOfguests || !time){
            alert('Missing fields')
            return
        }

        //grabbing tables being occupied given date & time
        const reservationsForDateEntered = reservationData.filter(({date}) => date === cdate.toDateString())
        const reservedTablesForDate = reservationsForDateEntered.map((value) => value.table_number)

        const reservation = {
            date: cdate, 
            time: time, 
            guests: numOfguests,
            table_number: ''
        }
        
        reservedTables(reservedTablesForDate)
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

export default SearchReservation