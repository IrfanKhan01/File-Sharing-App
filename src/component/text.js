import React, { Component } from 'react';
import firebase from 'firebase';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {Button} from 'semantic-ui-react';

class Text extends Component {
  constructor(prop) {
    super(prop)

    this.state = {
      textToShow: '',
      flag: false,
      copied: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  handleChange(event) {
    this.setState({ textToShow: event.target.value })
  }

  handleClear() {
    this.setState({ value: '', flag: false })
    console.log(this.state.value)
  }

  handleSave() {
    firebase.database().ref('/').child('Text/value').set(this.state.value);
    this.setState({ flag: true })
  }

  handleCopy() {
    this.setState({ flag: false })
  }

  onCopy = () => {
    this.setState({ copied: true });
    alert('Text has been copied')
  };

  componentDidMount() {
    firebase.database().ref('/').child('Text/value').on('value', snapshot=> {
      this.setState({value: snapshot.val()})
    })
  }
  
  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
              <div>
                <div className='form-group'>
                  <h1 className='font-weight-bold'>
                    <label htmlFor="text">Text</label>
                  </h1>
                  <textarea className='form-control form-control-lg' id='text' rows='5' 
                    value={this.state.textToShow} onChange={this.handleChange} placeholder='Type something....'>
                  </textarea>
                </div>
                {
                  (this.state.flag) ?
                    <section>
                      <CopyToClipboard onCopy={this.handleCopy} text={this.state.value}>
                        <Button inverted color='blue' floated='right'>Copy</Button>
                      </CopyToClipboard>
                    </section>
                    :
                    <Button inverted color='violet' floated='right' onClick={this.handleSave}>Save</Button>
                }
                <Button color='purple' onClick={this.handleClear}>Clear</Button>
              </div>
            </div>
            <div className='col-md-2'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Text;
