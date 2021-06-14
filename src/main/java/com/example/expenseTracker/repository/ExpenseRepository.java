package com.example.expenseTracker.repository;

import com.example.expenseTracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

// Connecting Expense to database
// Serves only as interface to JpaRepository, which contains methods to access database from here
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
