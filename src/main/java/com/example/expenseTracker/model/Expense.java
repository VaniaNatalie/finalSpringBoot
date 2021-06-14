package com.example.expenseTracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Entity
@Table(name="expense")
public class Expense {
    @Id
    @SequenceGenerator(name = "expense_seq", sequenceName = "expense_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "expense_seq")
    private Long id;
    private String timeStamp; // Exact time point of expense creation

    @NotNull
    private String description; // Description of expense

    @NonNull
    private int price; // Price of expense

    @ManyToOne
    private Category category;

    // Ignore this attribute when returning response
    @JsonIgnore
    @ManyToOne
    private User user;

    public Expense() {}

    public Expense(Long id, String timeStamp, String description, int price, Category category, User user) {
        this.id = id;
        this.timeStamp = timeStamp;
        this.description = description;
        this.price = price;
        this.category = category;
        this.user = user;
    }

    // Id is auto generated
    public Expense(String timeStamp, String description, int price, Category category, User user) {
        this.timeStamp = timeStamp;
        this.description = description;
        this.price = price;
        this.category = category;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
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

    public int getPrice() { return price; }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Expense{" +
                "id=" + id +
                ", timeStamp='" + timeStamp + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", category=" + category +
                ", user=" + user +
                '}';
    }
}
