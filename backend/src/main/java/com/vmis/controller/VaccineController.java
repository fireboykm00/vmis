package com.vmis.controller;

import com.vmis.dto.response.MessageResponse;
import com.vmis.dto.vaccine.VaccineRequest;
import com.vmis.dto.vaccine.VaccineResponse;
import com.vmis.service.VaccineService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class VaccineController {

    private final VaccineService vaccineService;

    @GetMapping("/babies/{babyId}/vaccines")
    public ResponseEntity<java.util.List<VaccineResponse>> getVaccinesByBabyId(@PathVariable Long babyId) {
        return ResponseEntity.ok(vaccineService.getVaccinesByBabyId(babyId));
    }

    @PostMapping("/babies/{babyId}/vaccines")
    public ResponseEntity<VaccineResponse> createVaccine(
            @PathVariable Long babyId,
            @Valid @RequestBody VaccineRequest request) {
        return ResponseEntity.ok(vaccineService.createVaccine(babyId, request));
    }

    @PutMapping("/vaccines/{id}")
    public ResponseEntity<VaccineResponse> updateVaccine(
            @PathVariable Long id,
            @Valid @RequestBody VaccineRequest request) {
        return ResponseEntity.ok(vaccineService.updateVaccine(id, request));
    }

    @DeleteMapping("/vaccines/{id}")
    public ResponseEntity<MessageResponse> deleteVaccine(@PathVariable Long id) {
        vaccineService.deleteVaccine(id);
        return ResponseEntity.ok(new MessageResponse("Vaccine record deleted successfully"));
    }

    @GetMapping("/vaccines/{id}")
    public ResponseEntity<VaccineResponse> getVaccineById(@PathVariable Long id) {
        return ResponseEntity.ok(vaccineService.getVaccineById(id));
    }
}