// Expense form
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Button, Container, Form, FormGroup, Input, Label, Table} from "reactstrap";
import {Link} from "react-router-dom";
import Moment from "react-moment";

class Expense extends Component {
    // Structure of packet we're supposed to send
    emptyItem = {
        timeStamp: new Date(),
        description: '',
        // id: 1,
        category: {id: 1, categoryName: ''}
    }

    // Props (property) -> external property from user input
    constructor(props) {
        super(props);
        // Initialize state (set initial/default value to each obj inside state)
        this.state = {
            date: new Date(),
            isLoading: true,
            expenses: [],
            categories: [],
            item: this.emptyItem
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    async handleSubmit(event) {
        const item = this.state.item;
        await fetch ('/api/expenses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // Convert js string to JSON to store in database
            body: JSON.stringify(item),
        });
        // Prevent auto submission when user hits enter
        event.preventDefault();
        // Redirect to /expense
        this.props.history.push("/expense");
    }

    handleChange(event) {
        const target = event.target; // Return element that triggered event
        const value = target.value; // Return value of target (the one user inputted)
        const name = target.name; // Return name of target
        let item = {...this.state.item}; // Get item from state
        item[name] = value; // Update specific field of item
        this.setState({item: item}); // Update item in state
    }

    handleChangeDate(date) {
        let item = {...this.state.item};
        item.timeStamp = date; // Update time stamp in item
        this.setState({item: item}); // Update item in state
    }

    async remove(id) {
        // Insert id from parameter to url
        await fetch(`api/expenses/${id}`, {
            // Method is delete
            method: 'DELETE',
            // Only accepting json type
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then( () => {
            // Then create new array that does not contain the id passed
            let updatedExpenses = [...this.state.expenses].filter(i => i.id !== id);
            // Update expenses in state with new array that already has deleted id
            this.setState({expenses: updatedExpenses});
        });
    }
    
    async componentDidMount() {
        const response = await fetch('/api/categories');
        const body = await response.json();
        this.setState({categories: body, isLoading: false});

        const responseExp = await fetch('/api/expenses');
        const bodyExp = await responseExp.json();
        this.setState({expenses: bodyExp, isLoading: false});
    }

    render() {
        const {categories} = this.state;
        // Because we have 2 API calls, put isLoading on the second call
        const {expenses, isLoading} = this.state

        if(isLoading) {
            return (<div>Loading</div>);
        }

        // Options for displaying categories
        let optionList =
            categories.map (category =>
                // Every option is unique corresponding to category.id
                <option value={category.id} key={category.id}>{category.categoryName}</option>
            )

        // Rows for displaying expenses
        let rows =
            expenses.map (expense =>
                <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td><Moment date={expense.timeStamp} format="YYYY/MM/DD"/></td>
                    <td>{expense.category.categoryName}</td>
                    <td><Button size="sm" color="danger" onClick={ () =>
                    this.remove(expense.id)}>Delete</Button></td>
                </tr>)

        return (
            <div>
                <Container>
                    <h3>Add expense</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="text" name="description" id="description" onChange={this.handleChange}
                            placeholder="Add a description"/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="category">Category</Label>
                            <select onChange={this.handleChange}>{optionList}</select>
                        </FormGroup>

                        <FormGroup>
                            <Label for="date">Date</Label>
                            <DatePicker selected={this.state.item.timeStamp} onChange={this.handleChangeDate}/>
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

                {' '}
                <Container>
                    <h3>Expense List</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="30%">Description</th>
                                <th width="20%">Date</th>
                                <th>Category</th>
                                <th width="10%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Container>
            </div>

        );
    }
}

export default Expense