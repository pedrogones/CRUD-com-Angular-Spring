package com.pedro.crudspring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pedro.crudspring.model.Course;
import com.pedro.crudspring.repository.CourseRepository;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/courses")


public class CourseController {
  private final CourseRepository courseRepository;
  @GetMapping
  public @ResponseBody List<Course> list(){
    return courseRepository.findAll();
    }
  @GetMapping("/{_id}")
  public ResponseEntity<Course> findById(@PathVariable Long _id){
    return courseRepository.findById(_id).map(recordFound -> ResponseEntity.ok().body(recordFound)).orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public Course creat(@RequestBody Course course){
   return courseRepository.save(course);
  }

  @PutMapping("/{_id}")
  public ResponseEntity<Course> update(
    @PathVariable Long _id,
    @RequestBody Course course){

      return courseRepository.findById(_id).map(recordFound -> {
        recordFound.setName(course.getName());
        recordFound.setCategory(course.getCategory());
        recordFound.setAulas(course.getAulas());
        Course updated = courseRepository.save(recordFound);
        return ResponseEntity.ok().body(updated);
      }).orElse(ResponseEntity.notFound().build());

  }
  @DeleteMapping("/{_id}")
  public ResponseEntity<Void> delete(@PathVariable Long _id) {
    return courseRepository.findById(_id).map(recordFound -> {
      courseRepository.deleteById(_id);
      return ResponseEntity.noContent().<Void>build();
    }).orElse(ResponseEntity.notFound().build());
  }
}
