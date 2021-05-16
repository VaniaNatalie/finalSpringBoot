import React, { Component } from 'react';

class Category extends Component {
    state = {
        isLoading : true,
        categories : [] // Store categories fetched
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
        // Else data is fetched
        return (
            <div>
                <h2>Categories</h2>
                {
                    // Map every single category inside Categories and return the name
                    categories.map (category =>
                        // Every div is unique corresponding to category.id
                        <div id={category.id}>
                            {category.categoryName}
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Category;