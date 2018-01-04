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
            percentage: 0
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleDownload = this.handleDownload.bind(this)
    }
    handleSelect(event) {

        this.setState({ file: event.target.files[0] });

    }
   
    handleUpload() {
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
        })
    }

    handleDownload() {
            let storageRef = firebase.storage().ref('/');

            // Create a reference to the file we want to download
            let starsRef = storageRef.child(`Pictures/${this.state.file}`);

            // Get the download URL
            starsRef.getDownloadURL().then(function(url) {
                    console.log(url)
            // Insert url into an <img> tag to "download"

                
            }).catch(function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors

            switch (error.code) {
                case 'storage/object_not_found':
                // File doesn't exist
                break;

                case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

                case 'storage/canceled':
                // User canceled the upload
                break;

                case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
            }
            });
    }

    render() {
        return (
            <div style={{ marginTop: '10%' }}>
                <div className='row'>

                    <div className='col-md-6'>
                        <div className='card h-100'>
                            <div className='card-body'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <img width='100px' src={this.state.file} alt="" />
                                        </div>
                                    </div>


                                <div style={{ marginTop: '10%' }} className='text-center'>
                                   
                                   
                                    <div>
                                        {
                                            this.state.file ? 

                                                <Progress percent={this.state.percentage} active />
                                                  
                                                :

                                                ''
                                        }

                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='text-center' id='file_browse_wrapper'>
                                                <span>
                                                    <input type='file' id='file_browse' onChange={this.handleSelect} />
                                                </span>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <Button inverted color='violet' onClick={this.handleUpload}>Upload</Button>
                                        </div>
                                    </div>

                                    <div style={{marginTop:'5%'}}>{this.state.message}</div>
                                  

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-md-6'>
                        <div className='card h-100'>
                            <div className='card-body'>
                                <div className='card'>
                                    <div className='card-body text-center'><img width='100px' src={this.state.picture} /></div>
                                </div>
                                <div style={{ marginTop: '10%' }} className='text-center'>
                                    <Button onClick={this.handleDownload} color='purple'>Download</Button>
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