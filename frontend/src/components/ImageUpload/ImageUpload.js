import React, { useReducer, useState } from 'react';
import styles from './ImageUpload.css'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

function ImageUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [style, setStyle] = useState(null);
  const [title, setTitle] = useState("");

  const handleContentChange = (e) => {
    setContent(e.target.files[0]);
  };

  const handleStyleChange = (e) => {
    setStyle(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    if (content) {
      formData.append('content_img', content);
    }

    if (style) {
      formData.append('style_img', style);
    }
    if (title) {
        formData.append('title', title);
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload_two_images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data); // Handle response from the backend
    } catch (error) {
      console.error('Error uploading images:', error);
    }
    setIsLoading(false);
    window.location.reload();
  };


  // changing names displayed on upload buttons:
  const contentBtn = document.getElementById('contentInput');
  const contentFileChosen = document.getElementById('chosenContent');

  if (contentBtn) {
      contentBtn.addEventListener('change', function(){
        try {
          contentFileChosen.textContent = this.files[0].name
      } catch(error) {
          // document.getElementById("contentInput").innerHTML = error.message;
          console.log(error)
    }})
  }

  const styleBtn = document.getElementById('styleInput');
  const styleFileChosen = document.getElementById('chosenStyle');

  if (styleBtn) {
      styleBtn.addEventListener('change', function(){
        try {
          styleFileChosen.textContent = this.files[0].name
        } catch(error) {
            // document.getElementById("contentInput").innerHTML = error.message;
            console.log(error)
      }})
  }

  return (
    <section className="uploadSection">
        <container>
            <div>
            <h1 className="uploadHeading">Transfer Styles Between Images!</h1>
            <div className="uploadCard">
              <form className="uploadForm" onSubmit={handleSubmit}>
                <div>
                  <input type="file" id="contentInput" onChange={handleContentChange} />
                  <label className="uploadContentFile" htmlFor="contentInput"><span id="chosenContent">🌄 +UPLOAD CONTENT IMAGE</span></label>
                  <input type="file" id="styleInput" onChange={handleStyleChange} />
                  <label className="uploadStyleFile" htmlFor="styleInput"><span id="chosenStyle">🎨 +UPLOAD STYLE IMAGE</span></label>
                </div>
                <div>
                    <input className="uploadTitleInput" type="text" value={title} placeholder="Title of your NST Image" onChange={handleTitleChange} />
                </div>
                <button className="uploadNstBtn" type="submit">Run NST</button>
                <p className="uploadNstInfo">Neural Style Transfer (NST) uses machine learning 
                  to take the content of one image and reproduce 
                  it in the art style of another image.</p>
              {isLoading ?
              <Button variant="secondary" disabled>
                <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                />
                  Running Neural Style Transfer...
              </Button> : null }
            </form>
            </div>
          </div>
        </container>
    </section>
  );
}

export default ImageUpload;
