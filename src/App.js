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

  sortByName = ()=> {
    if( this.state.currentSort === 'name-up'){
      const sortedFiles = this.state.files.sort((fileA, fileB)=>
        fileA.name > fileB.name ? -1 : 1
      );

      this.setState({
        currentSort: 'name-dn',
        files: this.state.files.map(file=> ({
          ...file,
          position: sortedFiles.indexOf(file),
        }))
      });

    } else {
      const sortedFiles = this.state.files.sort((fileA, fileB)=>
        fileA.name > fileB.name ? 1 : -1
      );

      this.setState({
        currentSort: 'name-up',
        files: this.state.files.map(file=> ({
          ...file,
          position: sortedFiles.indexOf(file),
        }))
      });
    }
  }

  sortBySize = ()=> {
    if( this.state.currentSort === 'size-up'){
      this.setState({
        currentSort: 'size-dn',
        files: files.sort((fileA, fileB)=>
          fileA.size > fileB.size ? -1 : 1
        )
      });

    } else {
      this.setState({
        currentSort: 'size-up',
        files: files.sort((fileA, fileB)=>
          fileA.size > fileB.size ? 1 : -1
        )
      });
    }
  }

  sortByDate = ()=> {
    if( this.state.currentSort === 'date-up'){
      this.setState({
        currentSort: 'date-dn',
        files: convertFileDates(
          rawFiles.sort((fileA, fileB)=>
            fileA.updated > fileB.updated ? -1 : 1
          ))
      });

    } else {
      this.setState({
        currentSort: 'date-up',
        files: convertFileDates(
          rawFiles.sort((fileA, fileB)=>
            fileA.updated > fileB.updated ? 1 : -1
          ))
      });
    }
  }


  render() {
    return (
      <div className='App'>
        <div className='sorting-table'>
          <div className='header-row'>
            <div>
              <button onClick={this.sortByName}>Name</button>
            </div>
            <div>
              <button onClick={this.sortBySize}>Size</button>
            </div>
            <div>
              <button onClick={this.sortByDate}>Updated</button>
            </div>
          </div>
          {
            this.state.files.map((file, i)=> (
              <div className='row'
                   key={file.name}>
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
