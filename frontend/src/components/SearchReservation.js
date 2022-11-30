import React, { useState, useEffect, useRef } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { displayTimes, reservationsEndpoint } from '../constantValues'
import axios from 'axios'

<<<<<<< HEAD
=======
//-------------------- Get Request --------------------
export const reservationsGetRequest = async () => {
    try{
        console.log(axios.get(reservationsEndpoint))
        return await axios.get(reservationsEndpoint)
    }
    catch (error) {
        console.log('Error getting reservation data:', error)
        return []
    }
 }
 

>>>>>>> 9cffb660b6eb622ae3278de5b65acb174fd5f292
const SearchReservation = ({reservedTables, reservationReady, selectedReservation}) => {
    const [cdate, setDate] = useState(new Date())
    const [numOfguests, setNumOfguests] = useState('')
    const [timeChosen, setTime] = useState('')
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
<<<<<<< HEAD
    }) 
=======
        .then(res => {
            const resdata = res.data
            setReservationData(resdata)
        })
        .catch(res => {
            console.log('Error getting reservations')
        })

    }, []) 
>>>>>>> 9cffb660b6eb622ae3278de5b65acb174fd5f292
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(!cdate || !numOfguests || !timeChosen){
            alert('Missing fields')
            return
        }

        //grabbing tables being occupied given date & time
        const reservationsForDateEntered = reservationData.filter(({date}) => date === cdate.toDateString())
        //reservationsForDateEntered = reservationsForDateEntered.filter(({time}) => time === timeChosen)
        const reservedTablesForDate = reservationsForDateEntered.map((value) => value.table_number)

        const reservation = {
            date: cdate, 
            time: timeChosen, 
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