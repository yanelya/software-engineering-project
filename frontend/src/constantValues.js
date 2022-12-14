const displayTimes = ['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', 
    '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', 
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM']

const server = 'http://localhost:4000/app/'

const reservationsEndpoint = `${server}reservations`

const tableEndpoint = `${server}tables`

const customersEndpoint = `${server}customers`

const userDataEndpoint = `${server}userData`

const loginEndpoint = `${server}login`

export {displayTimes, reservationsEndpoint, tableEndpoint, customersEndpoint, userDataEndpoint, loginEndpoint}