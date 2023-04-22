import { useEffect, useState } from 'react'
import './table.scss'
import axios from 'axios'
import Box from '../box'
const Table = () => {
    //Не брал месяцы из полученных данных так как там может оказаться разные значение поэтому написал все месяцы сам
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    const [stores, setStores] = useState([])
    let allTotal = 0

    useEffect(() => {
        axios.get('http://localhost:3001/stores')
            .then(res => setStores(res.data))
    }, [])

    const changeValue = (idStore, idMonth, value) => {//получает id магазина, id месяца, значение
        //Измененные магазины записываются в новую переменную
        const newData = stores.map((store, i) => {
            //Перебирает все магазины чтобы найти магазин который нам нужен
            if (store.store.id === idStore) {

                //Перебирает все месяцы чтобы найти месяц который нам нужен
                //Измененные месяцы записываются в новую переменную
                const newMonths = store.months.map((month, i) => {
                    if (month.id === idMonth) {
                        //Когда находит нужный перезаписывает значение
                        return { ...month, value }
                    }
                    //Если id месяца не подходит то возвращается не измененный месяц
                    return month
                })
                //Возвращает измененный магазин с измененным значением месяца
                return { ...store, months: newMonths }
            }
            //Если id магазина не подходит то возвращается не измененный магазин
            return store
        })
        //state перезаписывается на измененные магазины
        setStores(newData)
    }

    return (
        <div className='table'>
            <div className='table__months'>
                <Box>Months</Box>
                {//Будет рендерить столько Box сколько месяцев
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
                        //Перебирает все месяцы и прибавляет их значение в total
                        const total = store.months.reduce((accumulator, currentValue) => {
                            return accumulator + currentValue.value;
                        }, 0);
                        //Общую сумму всех месяцев магазина прибавляет в allTotal и когда все магазины переберутся мы получим общую сумму
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
                                <Box> <span> {total}</span></Box>
                            </div>
                        )
                    })
                }
            </div>
            <div className='table__months'>
                <Box>Totals</Box>
                {
                    months.map((month, i) => {
                        //(Может быть это покажется слишком сложным)
                        //Перебирает все магазины и получает значение месяца с индексом i
                        //Таким образом суммирует значение всех магазинов за янв, фев, март и т.д.
                        const totalMonths = stores.reduce((accumulator, currentValue) => {

                            return accumulator + currentValue.months[i].value;
                        }, 0);
                        return (
                            <Box key={i}>
                                <span>
                                    {totalMonths}
                                </span>
                            </Box>
                        )
                    })
                }
                <Box>
                    <span>
                        {allTotal}
                    </span>
                </Box>
            </div>
        </div>
    )
}

export default Table