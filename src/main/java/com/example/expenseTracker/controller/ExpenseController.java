package com.example.expenseTracker.controller;

import com.example.expenseTracker.model.Expense;
import com.example.expenseTracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

@RestController
@RequestMapping("/api")
public class ExpenseController {
    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/expenses")
    Collection<Expense> getExpenses() {
        return expenseRepository.findAll();
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
