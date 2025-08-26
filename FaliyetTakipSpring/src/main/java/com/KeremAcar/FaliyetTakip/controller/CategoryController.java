package com.KeremAcar.FaliyetTakip.controller;

import com.KeremAcar.FaliyetTakip.model.Category;
import com.KeremAcar.FaliyetTakip.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping
    public Category create(@RequestBody Category category){
        return categoryRepository.save(category);
    }

    @GetMapping
    public List<Category> allCategories(){
        return categoryRepository.findAll();
    }


}
