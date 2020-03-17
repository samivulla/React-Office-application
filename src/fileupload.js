import React, { Component } from 'react'
import Upload from './upload/upload';
import './fileUpload.css';
export class fileupload extends Component {

    onChangeHandler = event => {

        console.log(event.target.files[0])

    }
    render() {
        return (
            <div className="App">
                <div className="Card">
                    <Upload />
                </div>
            </div>
        )
    }
}

export default fileupload
