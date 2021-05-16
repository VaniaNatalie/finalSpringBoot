// Body
import React, { Component } from "react";
import './Body.css';
import Header from "./Header";

class Body extends Component {
    state = {}
    render() {
        return (
            <>
                <Header/>
                <div className='body'>
                    <div className='body-title'>
                        How much have u feed your piggybank?
                    </div>
                </div>
            </>
        );
    }
}

export default Body