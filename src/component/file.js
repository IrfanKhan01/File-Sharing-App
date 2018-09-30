import React, { Component } from 'react';
import './file.css'
import firebase from 'firebase';
import { Button, Progress, Segment } from 'semantic-ui-react';

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
            inputFile: 'click',
            imageToRender: '',
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleSelect(event) {
        this.setState({
            loadImg: URL.createObjectURL(event.target.files[0])
        })
        this.setState({ file: event.target.files[0] });
        this.setState({ pic: this.state.file })
    }

    browse() { this.refs.inputFile.click() }

    handleUpload() {
        this.setState({ prog: true })
        const storageRef = firebase.storage().ref(`Pictures/`);
        const filePath = storageRef.child(this.state.file.name);
        const task = filePath.put(this.state.file);

        task.on('state_changed', (snapshot) => {
            this.setState({
                percentage: ((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
                upload: this.state.percentage
            })
        }, (error) => {
            this.setState({
                message: 'Not uploaded' + error.message
            })
        }, () => {
            this.setState({
                message: 'Uploaded successfully',
            })
            firebase.database().ref('/').child('Data/pictureURL').set(task.snapshot.downloadURL);
        });

        filePath.getDownloadURL().then((url) => {
            this.setState({ u: url })
            console.log(this.state.u)
        })
    }

    componentDidMount() {
        firebase.database().ref('/').child('Data/pictureURL').on('value', snap => {
            let imgUrl = snap.val();
            console.log(imgUrl);
            this.setState({
                imageToRender: imgUrl
            })
        })
        console.log(this.state.imageToRender);
    }

    shouldComponentUpdate(nextProp, nextState) {
        console.log(nextState);
        return true;
    }

    render() {
        return (
            <div>
                <h1>File</h1>
                <div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='card h-100'>
                                <div className='card-body'>
                                    <Segment>
                                        <img className='img-fluid' width='100px' src={this.state.loadImg} alt="" />
                                        {
                                            this.state.prog ?
                                                <Progress percent={this.state.percentage} active={this.state.percentage >= 100 ? false : true} attached='bottom' color='purple' />
                                                : false
                                        }
                                    </Segment>
                                    <div style={{ marginTop: '5%' }}>{this.state.message}</div>
                                    <div style={{ marginTop: '10%' }} className='text-center'>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <div className='text-center'>
                                                    <input type="file" ref='inputFile' onChange={this.handleSelect} style={{ display: 'none' }} />
                                                    <Button inverted color='purple' onClick={this.browse.bind(this)}>Browse</Button>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <Button inverted color='violet' onClick={this.handleUpload}>Upload</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='card h-100'>
                                <div className='card-body text-center'>
                                    <Segment>
                                        {
                                            this.state.imageToRender ?
                                            <img className='img-fluid' width='100px'
                                                    src={this.state.imageToRender} alt='download it' />
                                            :
                                            <p className='text-center'>There is no file...</p>
                                        }
                                    </Segment>
                                    <div style={{ marginTop: '10%' }} className='text-center'>
                                        <a className='btn btn-info' 
                                            href={this.state.imageToRender} 
                                            download={true}>Download</a>
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