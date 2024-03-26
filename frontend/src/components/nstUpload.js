import React from 'react';
import { Component } from 'react';
import axios from 'axios';

export default class NstUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            responseMessage: {
                status: "",
                message: "",
                error: "",
            },
        };
    }
    
    // handling image change
    handleChange = (e) => {
        const galleryArray = [];

        for (let i=0; i < e.target.files.length; i++) {
            this.fileValidation(e.target.files[i]);
            galleryArray.push(e.target.files[i]);
        }
        this.setState({
            image: galleryArray,
        })
    };

    // handling file submissions
    submitHandler = (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let i=0; i < this.state.image.length; i++) {
            data.append('files[]', this.state.image[i]);
        }

        // sending data to backend
        axios.post("http://127.0.0.1:5000/upload_image", data)
        // logging any responses or errors
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                this.setState({
                responseMessage: {
                    status: response.data.status,
                    message: response.data.message
                },
            });
            setTimeout(() => {
                this.setState({
                    image: "",
                    responseMessage: "",
                });
            }, 100000);
            document.querySelector('#imageForm').reset()
            }
            alert('Upload successful!')
        })
        .catch((error) => {
            console.error(error);
            if (error.response) {
                console.log(error.response)
                if (error.response.status === 401) {
                    alert("Credentials invalid.");
                }
            }
        });
    };

    // validating file selected for upload
    fileValidation = (file) => {
        if (file.type === 'image/png'
        || file.type === 'images/jpg'
        || file.type === 'images/jpeg')
        {
            this.setState({
                responseMessage: {
                    error: "",
                },
            });
            return true;
        } else {
            this.setState({
                responseMessage: {
                    error: "Invalid file type.",
                },
            });
            return false;
        }
    };

    render() {
        return (
            <div className="container py-f">
                <div className="row">
                    <div className='col-lg-12'>
                        <form onSubmit={this.submitHandler} encType='multipart/form-data' id='imageForm'>
                            <div className="card shadow">
                                {this.state.responseMessage.satus === 'success' ? (
                                    <div className='alertSuccess'>
                                        {this.state.responseMessage.message}
                                    </div>
                                ) : this.state.responseMessage.status === 'failed' ? (
                                    <div className='alertSuccess'>
                                        {this.state.responseMessage.message}
                                    </div>
                                ) : (
                                    ""
                                )}
                                <h4 className="card-header fw-bold">
                                    DaVinci
                                </h4>
                            </div>

                            <div className='card-body'>
                                <div className='form-group py-2'>
                                    <label htmlFor='images'>Images</label>
                                    <input 
                                    type='file'
                                    name='image'
                                    // multiple
                                    onChange={this.handleChange}
                                    className='form-control'
                                    />
                                </div>
                            </div>

                            <div className='card-footer'>
                                <button type='submit' className='btn btn-success'>
                                    Upload
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}