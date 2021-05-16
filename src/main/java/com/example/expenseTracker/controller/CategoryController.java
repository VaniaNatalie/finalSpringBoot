package com.example.expenseTracker.controller;

import com.example.expenseTracker.model.Category;
import com.example.expenseTracker.repository.CategoryRepository;
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
public class CategoryController {
    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Get request
    @GetMapping("/categories")
    Collection<Category> categories() {
        // Return all data in category table from database
        return categoryRepository.findAll();
    }

    // Get request for specific category id
    @GetMapping("/categories/{id}")
    ResponseEntity<?> getCategory(@PathVariable Long id) { // Get id from url path
        Optional<Category> category = categoryRepository.findById(id);
        // Map result from category and put it in body if id exists
        // Otherwise create new response with status not found (404)
        return category.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Post request to add new category
    @PostMapping("/categories")
    // Validate request, embed inside body and throw exception if doesn't meet criteria
    ResponseEntity<Category> addCategory(@Valid @RequestBody Category category)
            throws URISyntaxException {
        // Save category after validated
        Category newCategory = categoryRepository.save(category);
        // Return URI to /categories/id and the response to be displayed in the body
        return ResponseEntity.created(new URI("/api/categories" + newCategory.getId()))
                .body(newCategory);
    }

    // Put request to update existing category
    @PutMapping("/categories/{id}")
    ResponseEntity<Category> updateCategory(@Valid @RequestBody Category category) {
        // Override existing category
        Category updateCategory = categoryRepository.save(category);
        return ResponseEntity.ok().body(updateCategory);
    }

    // Delete request
    @DeleteMapping("/categories/{id}")
    ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        // Return status ok
        return ResponseEntity.ok().build();
    }

}
