import React from 'react';
import './App.css';
import rawFiles from './files';

const convertFileDates = files => files.map((file, i)=> ({
  ...file,
  updated: (new Date(file.updated)).toString().slice(0,24),
}) );

const files = convertFileDates(rawFiles.map((f, i)=> ({
  ...f, position: i,
})) );

class App extends React.Component {
  state = {
    files,
    currentSort: null,
  }

  sortBy = field => ()=> {
    if( this.state.currentSort === field+'-up'){
      const sortedFiles = JSON.parse(JSON.stringify(files))
      .sort((fileA, fileB)=>
        fileA[field] > fileB[field] ? -1 : 1
      );

      this.setState({
        currentSort: field+'-dn',
        files: convertFileDates(rawFiles.map(file=> ({
          ...file,
          position: sortedFiles.findIndex(f=> file.name === f.name),
        })))
      });

    } else {
      const sortedFiles = JSON.parse(JSON.stringify(files))
      .sort((fileA, fileB)=>
        fileA[field] > fileB[field] ? 1 : -1
      );

      this.setState({
        currentSort: field+'-up',
        files: convertFileDates(rawFiles.map(file=> ({
          ...file,
          position: sortedFiles.findIndex(f => file.name === f.name),
        })) )
      });
    }
  }


  render() {
    return (
      <div className='App'>
        <div className='sorting-table'>
          <div className='header-row'>
            <div>
              <button onClick={this.sortBy('name')}>Name</button>
            </div>
            <div>
              <button onClick={this.sortBy('size')}>Size</button>
            </div>
            <div>
              <button onClick={this.sortBy('updated')}>Updated</button>
            </div>
          </div>
          {
            this.state.files.map((file, i)=> (
              <div className='row'
                   key={file.name}
                   style={{ top: ((file.position+1) * 100/ (files.length + 1))+'%' }}>
                <div>{file.name}</div>
                <div>{file.size}</div>
                <div>{file.updated}</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
