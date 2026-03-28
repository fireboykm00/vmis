package com.vmis.service;

import com.vmis.dto.vaccine.VaccineRequest;
import com.vmis.dto.vaccine.VaccineResponse;
import com.vmis.exception.ResourceNotFoundException;
import com.vmis.model.Baby;
import com.vmis.model.VaccineRecord;
import com.vmis.repository.BabyRepository;
import com.vmis.repository.VaccineRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VaccineService {

    private final VaccineRecordRepository vaccineRecordRepository;
    private final BabyRepository babyRepository;

    @Transactional(readOnly = true)
    public List<VaccineResponse> getVaccinesByBabyId(Long babyId) {
        Baby baby = babyRepository.findById(babyId)
                .orElseThrow(() -> new ResourceNotFoundException("Baby not found with id: " + babyId));
        
        List<VaccineRecord> records = vaccineRecordRepository.findByBabyIdOrderByDateGivenDesc(babyId);
        
        return records.stream()
                .map(v -> VaccineResponse.fromEntity(v))
                .toList();
    }

    @Transactional
    public VaccineResponse createVaccine(Long babyId, VaccineRequest request) {
        Baby baby = babyRepository.findById(babyId)
                .orElseThrow(() -> new ResourceNotFoundException("Baby not found with id: " + babyId));

        VaccineRecord record = new VaccineRecord(
                baby,
                request.getVaccineName(),
                request.getDateGiven()
        );
        record.setNextDueDate(request.getNextDueDate());
        record.setBatchNumber(request.getBatchNumber());
        record.setNotes(request.getNotes());
        record.setAdministeredBy(request.getAdministeredBy());

        record = vaccineRecordRepository.save(record);
        return VaccineResponse.fromEntity(record);
    }

    @Transactional
    public VaccineResponse updateVaccine(Long id, VaccineRequest request) {
        VaccineRecord record = vaccineRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vaccine record not found with id: " + id));

        record.setVaccineName(request.getVaccineName());
        record.setDateGiven(request.getDateGiven());
        record.setNextDueDate(request.getNextDueDate());
        record.setBatchNumber(request.getBatchNumber());
        record.setNotes(request.getNotes());
        record.setAdministeredBy(request.getAdministeredBy());

        record = vaccineRecordRepository.save(record);
        return VaccineResponse.fromEntity(record);
    }

    @Transactional
    public void deleteVaccine(Long id) {
        if (!vaccineRecordRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vaccine record not found with id: " + id);
        }
        vaccineRecordRepository.deleteById(id);
    }

    public VaccineResponse getVaccineById(Long id) {
        VaccineRecord record = vaccineRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vaccine record not found with id: " + id));
        return VaccineResponse.fromEntity(record);
    }
}