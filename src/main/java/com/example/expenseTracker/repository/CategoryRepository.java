package com.example.expenseTracker.repository;

import com.example.expenseTracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

// Connecting Category to database
// Serves only as interface to JpaRepository, which contains methods to access database from here
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
