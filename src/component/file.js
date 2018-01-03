import React, { Component } from 'react';

import firebase from 'firebase';
import { Button, Progress } from 'semantic-ui-react';

class File extends Component {

    constructor() {
        super();
        this.state = {
            upload: 0,
            file: '',
            percentage: ''
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }
    handleSelect(event) {
        // const file = event.target.files[0];
        this.setState({file: event.target.files[0]})

        // const storageRef = firebase.storage().ref(`Pictures/`);
        // const filePath = storageRef.child(file.name);
        // const task = storageRef.put(file);

        // task.on('state_changed', (snapshot) => {
        //     let percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;

        //     this.setState({
        //         upload: percentage
        //     })
        // },(error)=> {
        //     this.setState({
        //         message: 'Not uploaded' + error.message
        //     })
        // }, () => {
        //     this.setState({
        //         message: 'Uploaded successfully',
        //         picture: task.snapshot.downloadURL
        //     })
        // })
    }
    handleUpload() {
        const storageRef = firebase.storage().ref(`Pictures/`);
        const filePath = storageRef.child(this.state.file.name);
        const task = filePath.put(this.state.file);

        task.on('state_changed', (snapshot) => {
            // let percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            this.setState({percentage: (snapshot.bytesTransferred/snapshot.totalBytes) * 100 })

            this.setState({
                upload: this.state.percentage
            })
        },(error)=> {
            this.setState({
                message: 'Not uploaded' + error.message
            })
        }, () => {
            this.setState({
                message: 'Uploaded successfully',
                picture: task.snapshot.downloadURL
            })
        })
    }

    render() {
        return (
            <div style={{ marginTop: '10%' }}>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-3'>
                        <div className='card h-100'>
                            <div className='card-body'>
                               
                                <div style={{ marginTop: '10%' }} className='text-center'>
                                <Progress percent={this.state.percentage} inverted color='violet' progress />
                                        <div className='form-group'>
                                            <input type="file" className='form-control' onChange={this.handleSelect}/>
                                        </div>
                                    <div>{this.state.message}</div>
                                    <Button inverted color='violet' onClick={this.handleUpload}>Upload</Button>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-md-3'>
                        <div className='card h-100'>
                            <div className='card-body'>
                                <div className='card'>
                                    <div className='card-body'><img width='100px' src={this.state.picture} /></div>
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