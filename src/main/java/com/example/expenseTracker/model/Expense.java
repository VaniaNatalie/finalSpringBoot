package com.example.expenseTracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name="expense")
public class Expense {
    @Id
    @SequenceGenerator(name = "expense_seq", sequenceName = "expense_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "expense_seq")
    private Long id;
    private Instant timeStamp; // Exact time point of expense creation
    private String description; // Description of expense

    @ManyToOne
    private Category category;

    // Ignore this attribute when returning response
    @JsonIgnore
    @ManyToOne
    private User user;

    public Expense() {}

    public Expense(Long id, Instant timeStamp, String description, Category category, User user) {
        this.id = id;
        this.timeStamp = timeStamp;
        this.description = description;
        this.category = category;
        this.user = user;
    }

    // Id is auto generated
    public Expense(Instant timeStamp, String description, Category category, User user) {
        this.timeStamp = timeStamp;
        this.description = description;
        this.category = category;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Instant timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Expense{" +
                "id=" + id +
                ", timeStamp=" + timeStamp +
                ", description='" + description + '\'' +
                ", category=" + category +
                ", user=" + user +
                '}';
    }
}
