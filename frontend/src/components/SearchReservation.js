import React, { useState, useEffect, useRef } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { displayTimes, reservationsEndpoint, tableEndpoint } from '../constantValues'
import axios from 'axios'

const SearchReservation = ({reservationReady, reservationReady2, selectedReservation}) => {
    const [dateChosen, setDate] = useState(new Date())
    const [numOfguests, setNumOfguests] = useState('')
    const [timeChosen, setTime] = useState('')
    const [isOpen, setIsOpen] = useState(false);  
    const [reservationData, setReservationData] = useState([])
    const [TableAvailability, setTableAvailability] = useState(true)
    const dataFetchedRef = useRef(false)

    const [tableData, setTableData] = useState([])
    
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

    function tableGetRequest () {
        axios.get(tableEndpoint, {})
        .then(res => {
            const resdata = res.data
            setTableData(resdata)
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
        tableGetRequest()
    }) 

    function checkAvailability(resdata, occupantTables) {
        //all tables occupied
        if(occupantTables.length === resdata.length)
            return []
    
        const availableTables = resdata.filter(obj => { return !occupantTables.includes(obj.table_number) })
        availableTables.sort((a,b)=> (a.seats < b.seats ? 1 : -1))
        const guests = numOfguests
        let tablesForReservation = []

        // combined tables reservation
        if(availableTables[0].seats < guests){
            //adding all seats of avaliable tables to see if there are accomodations
            const seats = availableTables.map(i => i.seats)
            let totalSeats  = seats.reduce((partialSum, a) => partialSum + a, 0)
            if(totalSeats < guests)
                return []
            
            let sum = availableTables[0].seats
            for(let i = 0; i < availableTables.length; i++){
                let table = availableTables[i]
                if (sum < guests){
                    tablesForReservation.push(table)
                    sum += table.seats
                }
                else{
                    tablesForReservation.push(table)
                    break
                }
            }
        }
        // single table reservation
        else{
            availableTables.sort((a,b)=> (a.seats > b.seats ? 1 : -1))

            for(let i = 0; i < availableTables.length; i++){
                let table = availableTables[i]
                if(table.seats >= guests){
                    tablesForReservation.push(table)
                    break
                }
            }
        }
        return tablesForReservation
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(!dateChosen || !numOfguests || !timeChosen){
            alert('Missing fields')
            return
        }

        //grabbing tables being occupied given date & time
        const reservationsForDateEntered = reservationData.filter(({date, time}) => date === dateChosen.toDateString() && time === timeChosen)
        const reservedTablesForDate = reservationsForDateEntered.map((value) => value.table_number)

        const tables = checkAvailability(tableData, reservedTablesForDate)

        const reservation = {
            date: dateChosen, 
            time: timeChosen, 
            guests: numOfguests,
            table_number: tables
        }

        if(tables.length === 0){
            setTableAvailability(false)
            return
        }
        
        reservationReady2(true)
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

        {!TableAvailability &&
        <div className='center'>
            <p> No tables available for given time frame </p>
            <button type="button" className="btn"  style={{backgroundColor:'black', color:'white'}} onClick={() => setTableAvailability(!TableAvailability)}>Choose different date</button>
        </div>
        }
        
        { TableAvailability &&
        <form onSubmit={handleSubmit}>
        <div className='form-control'>
            <label>Date</label>
            <button className='form-control-button' onClick={handleClick}>
                {dateChosen.toDateString()}
            </button>
            {isOpen &&
                <DatePicker 
                dateFormat='MMMM dd yyyy' 
                minDate={new Date()} 
                selected={dateChosen} 
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
        </form>}
    </div>
  )
}

export default SearchReservation