import React, {Component} from 'react';
import './App.css';
import Tab from './App';


class Final extends Component {
    
    render() {
        return (
            <div>
                <div className='centered'>
                    <div className='child-container'>
                        <h1 className='text-center'>
                            <span className='text-info display-4'> SHARE YOUR CONTENT</span>
                            <span className='text-warning display-4'> GLOBALLY</span>
                        </h1>
                        <Tab />
                    </div>
                </div>
            </div>
          
        )
    }
}

export default Final