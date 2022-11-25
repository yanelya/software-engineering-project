import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { tableEndpoint } from '../constantValues'
import axios from 'axios'

const TablesAvailable = ({occupantTables, reservationDetails, addTable, reservationReady}) => {
    const [tableData, setTableData] = useState([])
    const [fullOccupancy, setFullOccupancy] = useState(false)
    const [availableTables, setAvailableTables] = useState([])
    const dataFetchedRef = useRef(false)

    function tableGetRequest () {
        axios.get(tableEndpoint, {})
        .then(res => {
            const resdata = res.data
            setTableData(resdata)
            getFreeTables(resdata)
            checkAvailability()
        })
        .catch((error) =>
            console.log('Error sending data:', error)
    )}

    useEffect(() => {
        if (dataFetchedRef.current) 
            return;
        dataFetchedRef.current = true
        tableGetRequest()
    }) 

    function checkAvailability() {
        if(occupantTables.length === tableData.length)
            setFullOccupancy(true)
    }

    function getFreeTables (resdata){
        const tableNumbers = resdata.map((value) => value.number).sort()
        const getAvailableTables = tableNumbers.filter(i => !occupantTables.includes(i))
        setAvailableTables(getAvailableTables)
    }


  return (
    <div>
        <p className='center'>Choose from available tables:</p>
        {!fullOccupancy &&
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
        
        {fullOccupancy &&
            <p> No tables available for given time frame </p>
        }
    </div>
  )
}

export default TablesAvailable