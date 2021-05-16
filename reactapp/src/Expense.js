// Expense form
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";

class Expense extends Component {
    state = {
        date: new Date(),
        isLoading: true,
        expenses: [],
        categories: []
    }

    // async componentDidMount() {
    //     const response = await fetch('/api/categories');
    //     const body = await response.json();
    //     this.setState({categories: body, isLoading: false})
    // }

    render() {
        // const {categories, isLoading} = this.state;

        // if(isLoading) {
        //     return (<div>Loading</div>);
        // }

        // let optionList =
        //     categories.map (category =>
        //         // Every option is unique corresponding to category.id
        //         <option id={category.id}>
        //             {category.categoryName}
        //         </option>
        //     )

        return (
            <Container>
                <h3>Add expense</h3>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" onChange={this.handleChange}
                        placeholder="Add a title"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="category">Category</Label>
                        {/*<select>{optionList}</select>*/}
                        <Input type="text" name="category" id="category" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="date">Date</Label>
                        <DatePicker selected={this.state.date} onChange={this.handleChangeDate}/>
                    </FormGroup>

                    {/*<div className="row">*/}
                    {/*    <FormGroup className="col-md-4 mb-3">*/}
                    {/*        <Label for="location">Location</Label>*/}
                    {/*        <Input type="text" name="location" id="location" onChange={this.handleChange}/>*/}
                    {/*    </FormGroup>*/}
                    {/*</div>*/}

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

export default Expense