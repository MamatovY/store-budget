import React, { Component } from 'react';
import './table.scss';
import Box from '../box';
import data from './../../mock_stores.json'

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: []
        };
    }


    componentDidMount() {
        this.setState({ stores: data });
    }

    changeValue = (idStore, idMonth, value) => {
        const { stores } = this.state;

        const newData = stores.map((store, i) => {
            if (store.store.id === idStore) {
                const newMonths = store.months.map((month, i) => {
                    if (month.id === idMonth) {
                        return { ...month, value };
                    }
                    return month;
                });
                return { ...store, months: newMonths };
            }

            return store;
        });

        this.setState({ stores: newData });
    };

    render() {
        const { stores } = this.state;
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        let allTotal = 0

        return (
            <div className='table'>
                <div className='table__months'>
                    <Box>Months</Box>
                    {months.map((month, i) => {
                        return (
                            <Box key={i}>
                                {month}
                            </Box>
                        )
                    })}
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
                                    <Box>{store.store.name}</Box>
                                    {store.months.map((month, i) => {
                                        return <Box key={i}>
                                            <input type="number"
                                                value={month.value}
                                                onChange={e => this.changeValue(store.store.id, month.id, + e.target.value)} />
                                        </Box>
                                    })}
                                    <Box> <span> {total}</span></Box>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='table__months'>
                    <Box>Totals</Box>
                    {months.map((month, i) => {
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
                    })}
                    <Box><span>{allTotal}</span></Box>
                </div>
            </div>
        )
    }
}

export default Table;
