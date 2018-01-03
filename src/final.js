import React, {Component} from 'react';

import Tab from './App';

class Final extends Component {
    
    render() {
        return (
            <div style={{marginTop: '5%'}}>
                <h1 className='text-center'>SHARE YOUR CONTENT HERE</h1>
                <p className='text-center'>Upto 5MB</p>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <Tab />
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        )
    }
}

export default Final