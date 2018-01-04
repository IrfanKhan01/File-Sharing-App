import React, { Component } from 'react';
import './file.css'
import firebase from 'firebase';
import { Button, Progress } from 'semantic-ui-react';

class File extends Component {

    constructor() {
        super();
        this.state = {
            upload: 0,
            file: '',
            percentage: 0,
            prog: false,
            u: '',
            loadImg: '',
            inputFile: 'click'
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        // this.handleDownload = this.handleDownload.bind(this)
    }
    handleSelect(event) {
        this.setState({
            loadImg: URL.createObjectURL(event.target.files[0])
        })
        this.setState({ file: event.target.files[0] });
        this.setState({ pic: this.state.file })
        console.log(this.state.file.typeOf)

    }

    handleUpload() {
        this.setState({ prog: true })
        const storageRef = firebase.storage().ref(`Pictures/`);
        const filePath = storageRef.child(this.state.file.name);
        const task = filePath.put(this.state.file);

        task.on('state_changed', (snapshot) => {

            this.setState({ percentage: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 })

            this.setState({
                upload: this.state.percentage
            })
        }, (error) => {
            this.setState({
                message: 'Not uploaded' + error.message
            })
        }, () => {
            this.setState({
                message: 'Uploaded successfully',
                picture: task.snapshot.downloadURL
            })
        });
        filePath.getDownloadURL().then((url) => {
            console.log(url)
            this.setState({ u: url })
        })
    }

    browse() {
        this.refs.inputFile.click()
        
    }

    render() {
        return (
            <div>
            <h1>File</h1>
            <div style={{ marginTop: '5%' }}>
               
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card h-100'>
                            <div className='card-body'>
                                <div className='card'>
                                    <div className='card-body text-center'>
                                        <img className='img-fluid' width='150px' src={this.state.loadImg} alt=""/>
                                    </div>
                                </div>
                                <div style={{ marginTop: '10%' }} className='text-center'>
                                    <div>
                                        {
                                            this.state.prog ? <Progress percent={this.state.percentage} active={this.state.percentage >= 100 ? false : true} size='small' color='purple' /> : false
                                        }
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            {/* <div className='text-center' id='file_browse_wrapper'> */}
                                                <div className='text-center'>
                                                
                                                    {/* <input type='file' id='file_browse' onChange={this.handleSelect} /> */}
                                                    <input type="file" ref='inputFile' onChange={this.handleSelect} style={{display:'none'}}/>
                                                    <Button inverted color='purple' content='purple' onClick={this.browse.bind(this)}>Browse</Button>
                                                
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <Button inverted color='violet' onClick={this.handleUpload}>Upload</Button>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '5%' }}>{this.state.message}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='card h-100'>
                            <div className='card-body'>
                                <div className='card'>
                                    <div className='card-body text-center'><img className='img-fluid' width='150px' src={this.state.picture} /></div>
                                </div>
                                <div style={{ marginTop: '10%' }} className='text-center'>
                                    <a className='btn btn-info' href={this.state.u} download={true}>Download</a>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
            </div>
        )
    }

}

export default File