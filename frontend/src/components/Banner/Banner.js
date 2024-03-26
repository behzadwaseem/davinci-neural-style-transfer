import React, { useState, useEffect, useReducer } from 'react';
import styles from "./Banner.css";

function Banner() {
    return (
        <section classname="navSection">
            <nav className="navBanner"> 
                <h1>DaVinci</h1>
                <p>Made with 🫶🏽 by Behzad</p>
                {/* <div className="navSectionLinks">
                    <h3>Upload Images</h3>
                    <h3>Gallery</h3>
                </div> */}
            </nav>
        </section>
    )
}
export default Banner;