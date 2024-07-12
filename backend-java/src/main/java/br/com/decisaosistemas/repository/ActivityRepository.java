package br.com.decisaosistemas.repository;

import br.com.decisaosistemas.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
}
