import React, { Component } from 'react';
import Header from "./Header";
import './Body.css';
import {Button, Container, Form, FormGroup, Input, Table} from 'reactstrap';
import {Link} from "react-router-dom";

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            categories : [], // Store categories fetched
            categoryItem: {
                categoryName: ''
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        const item = this.state.categoryItem;

        for (const category of this.state.categories) {
            if (item.categoryName === category.categoryName) {
                alert("Duplicated category!");
                return false;
            }
        }

        // Check empty input
        if(!item.categoryName) {
            alert("Please add category name");
            return false;
        }

        // POST category to API
        await fetch ('/api/categories', {
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
        this.props.history.push("/categories");
    }

    handleChange(event) {
        let item = {...this.state.categoryItem};
        console.log(this.state.categories);
        item.categoryName = event.target.value;
        this.setState({categoryItem: item});
    }

    async remove(id) {
        // Insert id from parameter to url
        await fetch(`api/categories/${id}`, {
            // Method is delete
            method: 'DELETE',
            // Only accepting json type
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        window.location.reload();
    }

    async update(id) {
        const response = await fetch(`/api/categories/${id}`);
        const body = await response.json();
        this.setState( {categoryItem: {...body}});

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
        this.props.history.push(`/categories`);
    }

    // Function to check if Component has been created and inserted into DOM
    async componentDidMount() {
        // Fetch data from SpringBoot endpoint
        const response = await fetch('/api/categories');
        const body = await response.json();
        // Set state from response data and change isLoading to false
        this.setState({categories: body, isLoading: false});
    }

    render() {
        const {categories, isLoading} = this.state;

        // If it is still waiting for data from async, return loading text
        if(isLoading) {
            return (<div>Loading</div>);
        }

        let rows =
            // Map every single category inside Categories and return the name
            categories.map (category =>
                // Every row is unique corresponding to category.id
                <tr key={category.id}>
                    <td>{category.categoryName}</td>
                    <td><Button size="sm" color="danger" onClick={ () =>
                        this.remove(category.id)}>Delete</Button></td>
                    <td><Button size="sm" color="secondary" onClick={ () =>
                        this.update(category.id)}>Update</Button></td>
                </tr>)

        // Else data is fetched
        return (
            <div>
                <Header />
                <Container className={'body'}>
                    <Form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <h3>Add category</h3>
                                <Input type="text" value={this.state.categoryItem.categoryName} placehorder="Add a category" onChange={this.handleChange}/>
                            </FormGroup>
                        </div>

                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>

                {' '}
                <Container>
                    <div className="row">
                        <Table className="col-sm-5">
                            <thead>
                            <tr>
                                <th width="30%">Categories</th>
                                <th width="10%" colSpan={2}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Category;