// Expense form
import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {Button, Container, Form, FormGroup, Input, Label, Table} from "reactstrap";
import {Link} from "react-router-dom";

class Expense extends Component {
    // Structure of packet we're supposed to send
    // Id for both expense and category will be auto generated in
    // spring boot so there is no need to specify it
    emptyItem = {
        // Set default values
        timeStamp: new Date().toISOString().substr(0,10), // Get only date w/o timezone
        description: '',
        price: '',
        category: {id: 1, categoryName: ''}
    }

    // Props (property) -> external property from user input
    constructor(props) {
        super(props);

        // Initialize state (set initial/default value to each obj inside state)
        this.state = {
            isLoading: true,
            expenses: [],
            categories: [],
            item: this.emptyItem
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }

    async handleSubmit(event) {
        const item = this.state.item;
        if(!item.description || !item.price ) {
            alert("Please complete the fields");
            return false;
        }
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
        console.log(item);
        this.setState({item: item}); // Update item in state
    }

    handleChangeCategory(event) {
        const selectedCategory = event.target.value;
        let item = {...this.state.item};
        item.category.id = selectedCategory;

        this.setState({item: item});
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

    async update(id) {
        const response = await fetch(`/api/expenses/${id}`);
        const body = await response.json();
        this.setState( {item: {...body}});

        /*
        await fetch(`api/expenses/${id}`, {
            // Method is put
            method: 'PUT',
            // Only accepting json type
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(item),
        });
        */
        this.props.history.push(`/expense/`);
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
                    <td>{expense.timeStamp}</td>
                    <td>{expense.category.categoryName}</td>
                    <td>${expense.price}</td>
                    <td><Button size="sm" color="danger" onClick={ () =>
                        this.remove(expense.id)}>Delete</Button></td>
                    <td><Button size="sm" color="secondary" onClick={ () =>
                        this.update(expense.id)}>Update</Button></td>
                </tr>)

        return (
            <div>
                <Container>
                    <h3>Add expense</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="text" name="description" value={this.state.item.description} onChange={this.handleChange}
                                   placeholder="Add a description"/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="category">Category</Label>
                            {' '}
                            <select value={this.state.item.category.id} onChange={this.handleChangeCategory}>{optionList}</select>
                            {' '}
                            <Link to="/categories">Edit Category</Link>
                        </FormGroup>

                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="timeStamp">Date</Label>
                                <Input type="date" name="timeStamp" value={this.state.item.timeStamp} onChange={this.handleChange}/>
                                {/*<DatePicker dateFormat="MM/dd/yyyy" selected={this.state.item.timeStamp} onChange={this.handleChangeDate}/>*/}
                            </FormGroup>
                        </div>

                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="price">Price</Label>
                                <Input type="number" name="price" value={this.state.item.price} onChange={this.handleChange}
                                       placeholder="Add a price"/>
                            </FormGroup>
                        </div>

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
                            <th width="10%">Price</th>
                            <th width="25%" colSpan={2}>Action</th>
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