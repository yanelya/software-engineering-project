import axios from 'axios'
jest.mock('axios')
import { reservationsGetRequest } from '../components/SearchReservation.js'
import { tableGetRequest } from '../components/TablesAvailable.js'
import { reservationsEndpoint, tableEndpoint } from '../constantValues.js'

const testData = 
[
    { id: 1, name: "John" },
    { id: 2, name: "Andrew" },
]

test('canary test', () => {
    expect(true).toBe(true);
});


describe('reservationsGetRequest', () => {
    it('Retrieved data from customers API', async () => {
        axios.get.mockResolvedValueOnce(testData)
        const result = await reservationsGetRequest()
        expect(result).toEqual(testData)
    });

    it('reservationsEndpoint called', async () => {
        axios.get.mockResolvedValueOnce(testData)
        await reservationsGetRequest()
        expect(axios.get).toHaveBeenCalledWith(reservationsEndpoint)
    })
});


describe('tableGetRequest', () => {
    it('Retrieved data from table API', async () => {
        axios.get.mockResolvedValueOnce(testData)
        const result = await tableGetRequest()
        expect(result).toEqual(testData)
    });

    it('tableEndpoint called', async () => {
        axios.get.mockResolvedValueOnce(testData)
        await tableGetRequest()
        expect(axios.get).toHaveBeenCalledWith(tableEndpoint)
    })
});