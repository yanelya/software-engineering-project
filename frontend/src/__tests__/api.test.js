import axios from 'axios'
jest.mock('axios')
import { reservationsGetRequest } from '../components/SearchReservation.js'
//import { tableGetRequest } from '../components/TablesAvailable.js'
import { reservationsEndpoint, tableEndpoint } from '../constantValues.js'
//import * as apiservice from '../components/TablesAvailable'


const testData = 
[
    { id: 1, name: "John" },
    { id: 2, name: "Andrew" },
]

test('canary test', () => {
    expect(true).toBe(true);
});

export default Text;
