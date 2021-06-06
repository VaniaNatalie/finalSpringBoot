// Body
import React, { Component } from "react";
import './Body.css';
import Header from "./Header";
import Expense from "./Expense";

class Body extends Component {
    state = {}
    render() {
        return (
            <>
                <Header/>
                <div className='body'>
                    <Expense/>
                </div>
            </>
        );
    }
}

export default Body