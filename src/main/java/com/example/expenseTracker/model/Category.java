package com.example.expenseTracker.model;

import javax.persistence.*;

@Entity
@Table(name="category")
public class Category {
    @Id
    private Long id;
    private String categoryName; // The categories user wants

    // Connecting Category to User, persist on both User and Category table


    public Category() {}

    public Category(Long id, String categoryName) {
        this.id = id;
        this.categoryName = categoryName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", categoryName='" + categoryName + '\'' +
                '}';
    }
}
