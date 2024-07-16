package br.com.decisaosistemas.service;

import br.com.decisaosistemas.dto.ActivityRequest;
import br.com.decisaosistemas.dto.ActivityResponse;
import br.com.decisaosistemas.exception.BadRequestNotFoundException;
import br.com.decisaosistemas.model.Activity;
import br.com.decisaosistemas.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public ActivityResponse create(ActivityRequest activityRequest) {
        Activity activity = Activity.builder()
                .description(activityRequest.getDescription())
                .isCompleted(false)
                .creationDate(LocalDate.now())
                .conclusionDate(null)
                .build();

        Activity activitySaved = activityRepository.save(activity);

        ActivityResponse activityResponse = ActivityResponse.builder()
                .id(activitySaved.getId())
                .description(activitySaved.getDescription())
                .isCompleted(activitySaved.getIsCompleted())
                .creationDate(activitySaved.getCreationDate())
                .conclusionDate(activitySaved.getConclusionDate())
                .build();

        return activityResponse;
    }

    public ActivityResponse update(Long id, ActivityRequest activityRequest) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new BadRequestNotFoundException(404, "Atividade não encontrada com o ID: " + id));

        activity.setDescription(activityRequest.getDescription());

        Activity updatedActivity = activityRepository.save(activity);

        return ActivityResponse.builder()
                .id(updatedActivity.getId())
                .description(updatedActivity.getDescription())
                .isCompleted(updatedActivity.getIsCompleted())
                .creationDate(updatedActivity.getCreationDate())
                .conclusionDate(updatedActivity.getConclusionDate())
                .build();
    }


    public List<ActivityResponse> listAll() {
        List<Activity> activities = activityRepository.findAll();
        return activities.stream()
                .map(activity -> ActivityResponse.builder()
                        .id(activity.getId())
                        .description(activity.getDescription())
                        .isCompleted(activity.getIsCompleted())
                        .creationDate(activity.getCreationDate())
                        .conclusionDate(activity.getConclusionDate())
                        .build())
                .collect(Collectors.toList());
    }

    public void delete(Long id) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new BadRequestNotFoundException(404, "Atividade não encontrada com o ID: " + id));

        activityRepository.delete(activity);
    }

    public ActivityResponse complete(Long id) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new BadRequestNotFoundException(404, "Atividade não encontrada com o ID: " + id));

        activity.setIsCompleted(true);
        activity.setConclusionDate(LocalDate.now());

        Activity completedActivity = activityRepository.save(activity);

        return ActivityResponse.builder()
                .id(completedActivity.getId())
                .description(completedActivity.getDescription())
                .isCompleted(completedActivity.getIsCompleted())
                .creationDate(completedActivity.getCreationDate())
                .conclusionDate(completedActivity.getConclusionDate())
                .build();
    }

    public List<ActivityResponse> listAllComplete() {
        List<Activity> activities = activityRepository.findAllByIsCompletedTrueOrderByConclusionDateDesc();
        return activities.stream()
                .map(activity -> ActivityResponse.builder()
                        .id(activity.getId())
                        .description(activity.getDescription())
                        .isCompleted(activity.getIsCompleted())
                        .creationDate(activity.getCreationDate())
                        .conclusionDate(activity.getConclusionDate())
                        .build())
                .collect(Collectors.toList());
    }

    public List<ActivityResponse> listAllIncomplete() {
        List<Activity> activities = activityRepository.findAllByIsCompletedFalseOrderByCreationDateDesc();
        return activities.stream()
                .map(activity -> ActivityResponse.builder()
                        .id(activity.getId())
                        .description(activity.getDescription())
                        .isCompleted(activity.getIsCompleted())
                        .creationDate(activity.getCreationDate())
                        .conclusionDate(activity.getConclusionDate())
                        .build())
                .collect(Collectors.toList());
    }
}
