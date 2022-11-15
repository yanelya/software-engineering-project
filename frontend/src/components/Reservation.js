import React from 'react'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const Reservation = () => {
  let current = new Date()
  let currentdate = current.toDateString()
  const [days, setDays] = useState(1)
  const [cdate, setcDate] = useState(currentdate)
  const [times, setTimes] = useState([])
  const [reserve, setReserve] = useState(false)
  const endpoint = 'http://localhost:4000/app/reservations'
  const dataFetchedRef = useRef(false);
  const displayTimes = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
    '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM']

  function nextDate () {
    current.setDate(current.getDate() + days)
    currentdate = current.toDateString()

    setDays(days + 1)

    console.log('setting date to: ', currentdate)
    setcDate(currentdate)
    console.log('date set to: ', cdate)

    //getRequest()
  }

  function previousDate () {
    current.setDate(current.getDate() + (days - 2))
    currentdate = current.toDateString()

    setDays(days - 1)
    setcDate(currentdate)

  } 

  function getRequest () {
    axios.get(endpoint, {})
    .then(res => {
      //GRAB DATA------------------------------------------------------------------------- working
      const data = res.data
      //console.log("data: ", data)

      //GRAB DATE------------------------------------------------------------------------- working
      const currentDay = data.filter(({date}) => date === cdate)
      //console.log("current date: ", cdate)
      console.log("Customers with Reservations on", cdate, currentDay)

      //GRAB TIME------------------------------------------------------------------------- working
      const reservedTimes = currentDay.map(value => value.time)
      //console.log('reservered times: ', reservedTimes)
  
      const filteredTimes = displayTimes.filter(i => !reservedTimes.includes(i))
      let timeRows = []
      let tempRow = []

      let count = 0
      for(let i = 0; i < filteredTimes.length; i++){
        count++
        tempRow.push(filteredTimes[i])
        if((count === 3)){
          timeRows.push(tempRow)
          tempRow = []
          count = 0
        }
        if(i === filteredTimes.length - 1 && count > 0)
          timeRows.push(tempRow)
      }

      setTimes(timeRows)
      //console.log("times: ", timeRows)
    })
    .catch((error) =>
        console.log('Error sending data:', error))
    }
    
    useEffect(() => {
      if (dataFetchedRef.current) 
        return;
      dataFetchedRef.current = true;
      getRequest();
    })
    
    const arr = times.map((ele, i) => {
      return(
        <div className='center' key={i}>
          {ele[0] && <button type="button" className="btn btn-outline-dark" >{ele[0]}</button>}
          {ele[1] && <button type="button" className="btn btn-outline-dark" >{ele[1]}</button>}
          {ele[2] && <button type="button" className="btn btn-outline-dark" >{ele[2]}</button>}
        </div>
      )
    })
    
  return (
    <div className="prevent-select">
      <h1 id='reservation'>Reservation</h1>

      {reserve && 
        <div>
          <div className='center'>
            <BsFillArrowLeftCircleFill onClick={() => days !== 1 ? previousDate() : '' } style={{cursor:'pointer'}} />
            {`${' '}${cdate}${' '}`}
            <BsFillArrowRightCircleFill onClick={() => {nextDate(); getRequest(); }} style={{cursor:'pointer'}}/>
          </div>
          <div className='section'>
            {arr}
          </div>
        </div>
      }

      {reserve === false && 
       <div className='center'>
          <button type="button" className="btn btn-outline-dark" onClick={() => setReserve(true)}>Make a Reservation</button>
        </div>
      }
      
    </div>
  )
}

export default Reservation