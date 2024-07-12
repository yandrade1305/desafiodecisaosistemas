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
public class ActivityUpdateRequest {
    private String description;
    private Boolean concluded;
    private LocalDate conclusionDate;
}
