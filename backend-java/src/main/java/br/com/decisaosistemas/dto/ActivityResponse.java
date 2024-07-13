package br.com.decisaosistemas.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityResponse {
    private Long id;
    private String description;
    private Boolean isCompleted;
    private LocalDate creationDate;
    private LocalDate conclusionDate;
}
