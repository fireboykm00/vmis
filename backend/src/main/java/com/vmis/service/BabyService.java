package com.vmis.service;

import com.vmis.dto.baby.BabyRequest;
import com.vmis.dto.baby.BabyResponse;
import com.vmis.exception.ResourceNotFoundException;
import com.vmis.model.Baby;
import com.vmis.repository.BabyRepository;
import com.vmis.repository.VaccineRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BabyService {

    private final BabyRepository babyRepository;
    private final VaccineRecordRepository vaccineRecordRepository;

    public List<BabyResponse> getAllBabies() {
        return babyRepository.findAll().stream()
                .map(this::toResponseWithCount)
                .toList();
    }

    public BabyResponse getBabyById(Long id) {
        Baby baby = babyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Baby not found with id: " + id));
        return toResponseWithCount(baby);
    }

    @Transactional
    public BabyResponse createBaby(BabyRequest request) {
        Baby baby = new Baby(
                request.getName(),
                request.getDateOfBirth(),
                request.getGender(),
                request.getGuardianName(),
                request.getPhoneNumber()
        );
        baby.setAddress(request.getAddress());
        baby.setNotes(request.getNotes());
        baby = babyRepository.save(baby);
        return BabyResponse.fromEntity(baby);
    }

    @Transactional
    public BabyResponse updateBaby(Long id, BabyRequest request) {
        Baby baby = babyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Baby not found with id: " + id));
        
        baby.setName(request.getName());
        baby.setDateOfBirth(request.getDateOfBirth());
        baby.setGender(request.getGender());
        baby.setGuardianName(request.getGuardianName());
        baby.setPhoneNumber(request.getPhoneNumber());
        baby.setAddress(request.getAddress());
        baby.setNotes(request.getNotes());
        
        baby = babyRepository.save(baby);
        return toResponseWithCount(baby);
    }

    @Transactional
    public void deleteBaby(Long id) {
        if (!babyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Baby not found with id: " + id);
        }
        babyRepository.deleteById(id);
    }

    public List<BabyResponse> searchBabies(String query) {
        return babyRepository.search(query).stream()
                .map(this::toResponseWithCount)
                .toList();
    }

    private BabyResponse toResponseWithCount(Baby baby) {
        BabyResponse response = BabyResponse.fromEntity(baby);
        response.setVaccineCount((int) vaccineRecordRepository.countByBabyId(baby.getId()));
        return response;
    }
}