import React from 'react';
import Link from '../router/Link';
import { ipcRenderer } from 'electron';

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
    this.reader.onload = this.processFile;
    ipcRenderer.on('upload-complete', (event, data) => {
      console.log(data.transactionsFound + ' records processed.');
    });
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
  
  processFile() {
    ipcRenderer.on('upload-complete', (e,d) => console.log({e:e,d:d}));
    var bankData = ipcRenderer.send('file-upload', this.reader.result);
  }
  
  render() {
    return (
      <div id="upload">
        <Link state="menu">&lt; Back to Menu</Link>
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
