import { useEffect, useState } from 'react'
import './table.scss'
import axios from 'axios'
import Box from '../box'
const Table = () => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    const [stores, setStores] = useState([])
    let allTotal = 0
    useEffect(() => {
        axios.get('http://localhost:3001/stores')
            .then(res => setStores(res.data))
    }, [])

    const changeValue = (idStore, idMonth, value) => {
        const newData = stores.map((store, i) => {
            if (store.store.id === idStore) {
                const newMonths = store.months.map((month, i) => {
                    if (month.id === idMonth) {
                        return { ...month, value }
                    }
                    return month
                })
                return { ...store, months: newMonths }
            }
            return store
        })
        setStores(newData)
    }

    return (
        <div className='table'>
            <div className='table__months'>
                <Box>Months</Box>
                {
                    months.map((month, i) => {
                        return (
                            <Box key={i}>
                                {month}
                            </Box>
                        )
                    })
                }
                <Box>Total</Box>
            </div>
            <div className='table__stores'>
                {
                    stores.map((store, i) => {
                        const total = store.months.reduce((accumulator, currentValue) => {
                            return accumulator + currentValue.value;
                        }, 0);
                        allTotal += total
                        return (
                            <div key={i}>
                                <Box>
                                    {store.store.name}
                                </Box>
                                {
                                    store.months.map((month, i) => {
                                        return <Box key={i}>
                                            <input type="number"
                                                value={month.value}
                                                onChange={e => changeValue(store.store.id, month.id, +e.target.value)} />
                                        </Box>
                                    })
                                }
                                <Box>{total}</Box>
                            </div>
                        )
                    })
                }
            </div>
            <div className='table__months'>
                <Box>Totals</Box>
                {
                    months.map((month, i) => {
                        const totalMonths = stores.reduce((accumulator, currentValue) => {
                            return accumulator + currentValue.months[i].value;
                        }, 0);
                        allTotal += totalMonths
                        return (
                            <Box key={i}>
                                {totalMonths}
                            </Box>
                        )
                    })
                }
                <Box>{allTotal}</Box>
            </div>
        </div>
    )
}

export default Table