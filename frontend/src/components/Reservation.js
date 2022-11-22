import React from 'react'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs"
import { useState, useEffect, useRef } from 'react'
import GuestForm from './GuestForm'
import axios from 'axios'
import {CustomLink} from './Navbar'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const Reservation = () => {
  let current = new Date()
  let currentdate = current.toDateString()
  const [days, setDays] = useState(1)
  const [cdate, setcDate] = useState(current)
  const [times, setTimes] = useState([])
  const [reserve, setReserve] = useState(false)
  const [data, setData] = useState([])
  const [dateChosen, setDateChosen] = useState(false)
  const endpoint = 'http://localhost:4000/app/reservations'
  const dataFetchedRef = useRef(false);
  const displayTimes = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
    '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM']

  //-------------------- Get Request --------------------
  function getRequest () {
    axios.get(endpoint, {})
    .then(res => {
      const resdata = res.data
      setData(resdata)
      //------------ for rendering the first day ---------
      if(cdate === current)
        renderTimeSlots(resdata)
    })
    .catch((error) =>
        console.log('Error sending data:', error)
  )}

  //----------------calls api once at render-------------
  useEffect(() => {
    if (dataFetchedRef.current) 
      return;
    dataFetchedRef.current = true
    getRequest()
  })

  function formatTimes(reservedTimes){
    const arr = displayTimes.filter(i => !reservedTimes.includes(i))
    let timeRows = []
    let tempRow = []

    let count = 0
    for(let i = 0; i < arr.length; i++){
      count++
      tempRow.push(arr[i])
      if((count === 3)){
        timeRows.push(tempRow)
        tempRow = []
        count = 0
      }
      if(i === arr.length - 1 && count > 0)
        timeRows.push(tempRow)
    }
    return timeRows
  }

  function renderTimeSlots(resdata){
    const currentDay = resdata.filter(({date}) => date === cdate.toDateString())
    const reservedTimes = currentDay.map(value => value.time)
    const timeSlots = formatTimes(reservedTimes)
    setTimes(timeSlots)
  }
  
  function nextDate () {
    current.setDate(current.getDate() + days)
    currentdate = current.toDateString()

    setDays(days + 1)
    setcDate(current)
  
    const currentDay = data.filter(({date}) => date === currentdate)
    const reservedTimes = currentDay.map(value => value.time)
    const timeSlots = formatTimes(reservedTimes)
    setTimes(timeSlots)
  }

  function previousDate () {
    current.setDate(current.getDate() + (days - 2))
    currentdate = current.toDateString()

    setDays(days - 1)
    setcDate(current)

    const currentDay = data.filter(({date}) => date === currentdate)
    const reservedTimes = currentDay.map(value => value.time)
    const timeSlots = formatTimes(reservedTimes)
    setTimes(timeSlots)
  } 

  function handleChange(selectedDate){
    const diffTime = Math.abs(selectedDate - current)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1)
      current.setDate(current.getDate())
    else
      current.setDate(current.getDate() + (diffDays))

    currentdate = current.toDateString()
      
    setDays(diffDays)
    setcDate(current)
    
    const currentDay = data.filter(({date}) => date === currentdate)
    const reservedTimes = currentDay.map(value => value.time)
    const timeSlots = formatTimes(reservedTimes)
    setTimes(timeSlots)
  }

  const displayTimeSlots = times.map((ele, i) => {
    return(
      <div className='center' key={i}>
        {ele[0] && <button type="button" className="btn" value={ele[0]} onClick={() => setDateChosen(ele[0])}>{ele[0]}</button>}
        {ele[1] && <button type="button" className="btn" value={ele[1]} onClick={() => setDateChosen(ele[1])}>{ele[1]}</button>}
        {ele[2] && <button type="button" className="btn" value={ele[2]} onClick={() => setDateChosen(ele[2])}>{ele[2]}</button>}
      </div>
    )
  })

  return (
    <div className="prevent-select">
      <h1 className='sub-header'>Reservation</h1>

      {reserve && !dateChosen && 
        <div>
          <div className='center'>
              <DatePicker dateFormat='MMMM dd yyyy' popperPlacement="bottom" minDate={new Date()} selected={cdate} onChange={(date) => handleChange(date)} />
              <span>
                <BsFillArrowLeftCircleFill size='10%' style={{float:'left', cursor:'pointer'}} onClick={() => days !== 1 ? previousDate() : '' } />
                <BsFillArrowRightCircleFill size='10%' onClick={() => nextDate()} style={{float:'right', cursor:'pointer'}}/>
              </span>
          </div>
          <div className='section'>
            <p className='center'> Available times below</p><br></br>
            {displayTimeSlots}
          </div>
        </div>
      }

      {!reserve && !dateChosen &&
        <div className='center'>
          <br></br>
          <button type="button" className="btn" style={{background:'#000', color: '#fff'}} onClick={() => setReserve(true)}>Make a Reservation</button>
        </div>
      }

      {dateChosen && 
        <div>
          <div className='sub-container'>
            <p>Date: {cdate.toDateString()}</p>
            <p>Time: {dateChosen}</p>
          </div>
          <div className='center'>
            <br></br>
            <p className='mock-link' onClick={() => setDateChosen(false)}>Select different time or date</p>
          </div>
          <GuestForm />
          <hr></hr><br></br>
          <button>Submit</button>
          <div className='center'>
            <CustomLink to='/Login'>Or login here</CustomLink>
          </div>
        </div>
      }
      
    </div>
  )
}

export default Reservation