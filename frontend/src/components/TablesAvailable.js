import React from 'react'
import { useState } from 'react'
import { tableNumbers } from '../constantValues'

const TablesAvailable = ({occupantTables, reservationDetails, reservationReady}) => {
    const [fullOccupancy, setFullOccupancy] = useState(false)
    let tables = Object.keys(tableNumbers)
    tables = tables.map((i) => parseInt(i))
    let arr = []

    //checks if all tables are occupant
    function checkAvailability() {
        if(occupantTables.length === tables.length)
            setFullOccupancy(true)
    }

    const getAvailableTables = tables.filter(i => !occupantTables.includes(i))
    for(let i = 0; i < getAvailableTables.length; i++){
            console.log(getAvailableTables[i])
            arr.push(getAvailableTables[i])}

    const chooseTable = arr.map((ele, i) => {
        return(
            <div>   
                <button  key={i} type="button" className="btn" value={ele} onClick={() => reservationReady()}>Table {ele}</button>
            </div>
        )
      })

      console.log(getAvailableTables)
    checkAvailability()
  return (
    <div>
        {!fullOccupancy &&
           
            {chooseTable}
 
        }

        {fullOccupancy &&
            <p> No tables available for given time frame </p>
        }
    </div>
  )
}

export default TablesAvailable