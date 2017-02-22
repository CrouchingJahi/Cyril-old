import React from 'react';
import Link from '../router/Link';
import Services from '../services/Services';

export default class UploadScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.fileSelected = this.fileSelected.bind(this);
    this.readFile = this.readFile.bind(this);
    this.processFile = this.processFile.bind(this);
    
    this.state = {
      file: null
    };
    this.reader = new FileReader();
    this.reader.onload = () => {
      Services.uploadFile(this.reader.result, this.processFile);
    };
  }

  fileSelected(e) {
    this.setState({
      file: e.target.files[0]
    });
  }

  readFile() {
    var file = this.state.file;
    if (file) {
      if (file.name.match(/\.(qfx|ofx)$/)) {
        this.reader.readAsText(file);
      }
    }
  }
  
  processFile(results) {
    console.log(results);
    // do stuff with results
  }
  
  render() {
    return (
      <div id="upload">
        <Link state="menu">&#8249; Back to Menu</Link>
        <h2>Upload</h2>
        <label className="file-input">
          <input type="file" name="ofx" accept=".ofx,.qfx" onChange={this.fileSelected}></input>
          Select a File
        </label>
        <span>{ this.state.file ?
            'Currently selected: ' + this.state.file.name :
            'Accepted filetypes: .ofx, .qfx' }</span>
        <p><button onClick={this.readFile}>Upload</button></p>
      </div>
    );
  }
}
