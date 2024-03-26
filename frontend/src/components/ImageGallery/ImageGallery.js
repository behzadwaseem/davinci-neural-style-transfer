import React, { useState, useEffect, useReducer } from 'react';
import styles from "./ImageGallery.css";
import axios from 'axios';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";


function ImageGallery() {
  const [images, setImages] = useState([]);
  const [data, setData] = useState({title: '', i: 0})
  // const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/gallery');
      setImages(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const viewImage = (title, i) => {
    console.log(title, i)
    setData({title, i})
  }

  return (
    <section className="gallerySection">
      {data.title &&
        <div style={{position:'absolute', width:'100%', height:'60vh', background:'none', position:'relative',
        justifyContent:'center', alignItems:'center', overflowX:'hidden',
        objectFit:'contain'
      }}>
          <h2 style={{textAlign:'center', color:'#fff'}}>{data.title}</h2>
          <img src={'http://127.0.0.1:5000/static/nst-images/' + data.title + '.jpg'}
          style={{maxWidth:'90%', maxHeight:'90%',
          objectFit:'cover', marginLeft:'auto', 
          marginRight:'auto', display:'block',
          border:'2px solid black', boxShadow:'0px 5px 42px black',
          borderRadius:'10px'
        }}/>
        </div>
      }
      <container className="galleryContainer">
      <div className="galleryDescription">
        <h1 className="galleryTitle">Take a look at some other masterpieces!</h1>
        <p>⬆️ Click on an image to view it in the space above ⬆️</p>
      </div>
      <div>
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
          <Masonry gutter='20'>
            {images.map(image => (
                <div className="galleryItem">
                  <h2>{image.title}</h2>
                  <img className="galleryImage"
                  key={image.id} 
                  src={'http://127.0.0.1:5000/static/nst-images/' + image.title + '.jpg'}
                  onClick={()=>viewImage(image.title, image.id)}
                  alt={`Image ${image.id}`} />
                </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      </container>
    </section>
  );
}

export default ImageGallery;
