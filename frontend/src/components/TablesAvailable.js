import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { tableEndpoint } from '../constantValues'
import axios from 'axios'

export const tableGetRequest = async () => {
    try{
        return await axios.get(tableEndpoint)
    }
    catch (error) {
        console.log('Error getting table data:', error)
        return []
    }
}

const TablesAvailable = ({occupantTables, reservationDetails, addTable, reservationReady, previousPage}) => {
    const [fullOccupancy, setFullOccupancy] = useState(false)
    const [availableTables, setAvailableTables] = useState([])
    const dataFetchedRef = useRef(false)

    useEffect(() => {
        if (dataFetchedRef.current) 
            return;
        dataFetchedRef.current = true
        tableGetRequest().then(res => {
            const resdata = res.data
            checkAvailability(resdata)
        })
    }) 

    function checkAvailability(resdata) {
        if(occupantTables.length === resdata.length){
            setFullOccupancy(true)
            return
        }
        const tableNumbers = resdata.map((value) => value.number).sort()
        const getAvailableTables = tableNumbers.filter(i => !occupantTables.includes(i))
        setAvailableTables(getAvailableTables)
    }

  return (
    <div>
        {!fullOccupancy &&
            <div>
                <p className='center'>Choose from available tables:</p>
                {
                    availableTables.map((ele, i) => {
                        return(
                            <div className='center' key={i}>
                                <button type="button" className="btn" value={ele} onClick={() => {
                                    reservationReady(true)
                                    reservationDetails.table_number = ele
                                    addTable({ ...reservationDetails })
                                }}>Table {ele}</button>
                            </div>
                        )
                    })

                }
            </div>
        }
        
        {fullOccupancy &&
            <div className='center'>
                <p> No tables available for given time frame </p>
                <button type="button" className="btn"  style={{backgroundColor:'black', color:'white'}} onClick={() => previousPage(false)}>Choose different date</button>
            </div>
        }
    </div>
  )
}

export default TablesAvailable