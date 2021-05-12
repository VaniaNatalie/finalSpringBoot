package com.example.expenseTracker.repository;

import com.example.expenseTracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

// Connecting Category to database
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // When passing String name, search the database and return
    Category findByCategoryName(String categoryName);

}
