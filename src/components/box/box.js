import React, { Component } from 'react';
import './box.scss';

class Box extends Component {
    render() {
        const { children } = this.props;

        return (
            <div className='box'>{children}</div>
        )
    }
}

export default Box;
