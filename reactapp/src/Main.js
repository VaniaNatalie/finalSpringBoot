// Bring everything together
import React, { Component } from "react";
import Body from "./Body";
import Expense from "./Expense";
import Category from "./Category";
import {BrowserRouter, Route, Switch} from "react-router-dom";

class Main extends Component {
    state = {}
    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route path='/' exact = {true} component={Body}/>
                        {/*<Route path='/expense' exact = {true} component={Expense}/>*/}
                        <Route path='/categories' exact = {true} component={Category}/>
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}

export default Main;