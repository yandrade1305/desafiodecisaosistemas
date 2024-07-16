package br.com.decisaosistemas.repository;

import br.com.decisaosistemas.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findAllByIsCompletedTrueOrderByConclusionDateDesc();

    List<Activity> findAllByIsCompletedFalseOrderByCreationDateDesc();
}
