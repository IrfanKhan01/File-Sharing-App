import React, { Component } from 'react';

// import firebase from 'firebase';
import { Button } from 'semantic-ui-react';

class File extends Component {

    constructor() {
        super();
        this.state = {
            value: 'Uplaod'
        }

    }

    render() {
        return (
            <div style={{ marginTop: '10%' }}>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-3'>
                        <div className='card h-100'>
                            <div className='card-body'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='form-group'>
                                            <input type="file" className='form-control' placeholder='Uplaod' />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '10%' }} className='text-center'>

                                    <Button color='violet'>Upload</Button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-md-3'>
                        <div className='card h-100'>
                            <div className='card-body'>
                                <div className='card'>
                                    <div className='card-body'>No File Here</div>
                                </div>
                                <div style={{ marginTop: '10%' }} className='text-center'>
                                    <Button color='purple'>Download</Button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-md-3'></div>

                </div>
            </div>
        )
    }

}

export default File