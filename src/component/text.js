import React, { Component } from 'react';
import firebase from 'firebase';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {Button} from 'semantic-ui-react';

class Text extends Component {
  constructor(prop) {
    super(prop)

    this.state = {

      value: '',
      flag: false,
      copied: false

    }

    this.handleChange = this.handleChange.bind(this);

    this.Clear = this.Clear.bind(this);

    this.Save = this.Save.bind(this);

    this.Copy = this.Copy.bind(this);

  }

  handleChange(event) {

    this.setState({

      value: event.target.value

    })

  }


  Clear() {
    this.setState({ value: '', flag: false })
    console.log(this.state.value)
  }

  Save() {
    firebase.database().ref('/').child('Text').set(this.state.value);
    this.setState({ flag: true })
  }

  Copy() {
    this.setState({ flag: false })
  }
  onCopy = () => {
    this.setState({ copied: true });
    alert('Text has been copied')
  };

  componentWillMount() {
    firebase.database().ref('/').child('Text').on('value', snapshot=> {
      this.setState({value: snapshot.val()})
    })
  }
  render() {
    return (
      <div>
        <div style={{ marginTop: '5%' }} className='container'>


          <div className='row'>
            <div className='col-md-2'>

            </div>
            <div className='col-md-8'>
              <div>
                <div style={{ marginTop: '5%' }} className='form-group'>

                  <h1 className='font-weight-bold'>
                    <label htmlFor="text">Text</label>
                  </h1>


                  <textarea className='form-control form-control-lg' id='text' rows='5' value={this.state.value} onChange={this.handleChange} placeholder='Type something....'></textarea>
                </div>

                {

                  (this.state.flag) ?
                    <section>
                      <CopyToClipboard onCopy={this.onCopy} text={this.state.value}>

                        <Button inverted color='blue' floated='right'>Copy</Button>
                      </CopyToClipboard>
                    </section>

                    :

                    <Button inverted color='violet' floated='right' onClick={this.Save}>Save</Button>

                }
                <Button color='purple' onClick={this.Clear}>Clear</Button>
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
