package com.vmis.controller;

import com.vmis.dto.baby.BabyRequest;
import com.vmis.dto.baby.BabyResponse;
import com.vmis.dto.response.MessageResponse;
import com.vmis.service.BabyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/babies")
@RequiredArgsConstructor
public class BabyController {

    private final BabyService babyService;

    @GetMapping
    public ResponseEntity<List<BabyResponse>> getAllBabies() {
        return ResponseEntity.ok(babyService.getAllBabies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BabyResponse> getBabyById(@PathVariable Long id) {
        return ResponseEntity.ok(babyService.getBabyById(id));
    }

    @PostMapping
    public ResponseEntity<BabyResponse> createBaby(@Valid @RequestBody BabyRequest request) {
        return ResponseEntity.ok(babyService.createBaby(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BabyResponse> updateBaby(@PathVariable Long id, @Valid @RequestBody BabyRequest request) {
        return ResponseEntity.ok(babyService.updateBaby(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteBaby(@PathVariable Long id) {
        babyService.deleteBaby(id);
        return ResponseEntity.ok(new MessageResponse("Baby deleted successfully"));
    }

    @GetMapping("/search")
    public ResponseEntity<List<BabyResponse>> searchBabies(@RequestParam String q) {
        return ResponseEntity.ok(babyService.searchBabies(q));
    }
}