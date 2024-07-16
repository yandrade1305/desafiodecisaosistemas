package br.com.decisaosistemas.controller;

import br.com.decisaosistemas.dto.ActivityRequest;
import br.com.decisaosistemas.dto.ActivityResponse;
import br.com.decisaosistemas.service.ActivityService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/activity")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping("/create")
    public ActivityResponse createActivity(@RequestBody ActivityRequest request){
        return activityService.create(request);
    }

    @PatchMapping("/update/{id}")
    public ActivityResponse updateActivity(@PathVariable Long id, @RequestBody ActivityRequest request){
        return activityService.update(id, request);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteActivity(@PathVariable Long id){
        activityService.delete(id);
    }

    @GetMapping("/get")
    public List<ActivityResponse> listAllActivities() {
        return  activityService.listAll();
    }

    @PostMapping("/complete/{id}")
    public ActivityResponse completeActivity(@PathVariable Long id){
        return activityService.complete(id);
    }

    @GetMapping("/get-complete")
    public List<ActivityResponse> listAllCompleteActivities() {
        return  activityService.listAllComplete();
    }

    @GetMapping("/get-incomplete")
    public List<ActivityResponse> listAllIncompleteActivities() {
        return  activityService.listAllIncomplete();
    }
}
