package com.example.expenseTracker.controller;

import com.example.expenseTracker.model.Category;
import com.example.expenseTracker.model.Expense;
import com.example.expenseTracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ExpenseController {
    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/expenses")
    Collection<Expense> getExpenses() {
        return expenseRepository.findAll();
    }

    // Get request for specific expense id
    @GetMapping("/expenses/{id}")
    ResponseEntity<?> getCategory(@PathVariable Long id) { // Get id from url path
        Optional<Expense> expense = expenseRepository.findById(id);
        return expense.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/expenses")
    ResponseEntity<Expense> addExpense(@Valid @RequestBody Expense expense)
            throws URISyntaxException {
        Expense newExpense = expenseRepository.save(expense);
        return ResponseEntity.created(new URI("/api/expenses" + newExpense.getId())).body(newExpense);
    }

    @PutMapping("/expenses/{id}")
    ResponseEntity<Expense> updateExpense(@Valid @RequestBody Expense expense) {
        Expense updateExpense = expenseRepository.save(expense);
        return ResponseEntity.ok().body(updateExpense);
    }

    @DeleteMapping("/expenses/{id}")
    ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
        // Return status ok
        return ResponseEntity.ok().build();
    }

}
