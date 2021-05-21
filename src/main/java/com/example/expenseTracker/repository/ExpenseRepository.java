package com.example.expenseTracker.repository;

import com.example.expenseTracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

// Connecting Expense to database
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
