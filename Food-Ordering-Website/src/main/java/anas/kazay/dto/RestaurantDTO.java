package anas.kazay.dto;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
@Embeddable
public class RestaurantDTO {
    private Long id;
    private String title;
    @Column(length = 1000)
    private List<String> images;
    private String description;
}
