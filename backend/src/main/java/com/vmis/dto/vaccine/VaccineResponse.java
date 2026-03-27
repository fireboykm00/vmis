package com.vmis.dto.vaccine;

import com.vmis.model.VaccineRecord;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class VaccineResponse {
    private Long id;
    private Long babyId;
    private String babyName;
    private String vaccineName;
    private LocalDate dateGiven;
    private LocalDate nextDueDate;
    private String batchNumber;
    private String notes;
    private String administeredBy;
    private LocalDateTime createdAt;
    private boolean overdue;
    private boolean upcoming;

    public static VaccineResponse fromEntity(VaccineRecord record) {
        LocalDate today = LocalDate.now();
        boolean over = record.getNextDueDate() != null && record.getNextDueDate().isBefore(today);
        boolean up = record.getNextDueDate() != null && 
                          !record.getNextDueDate().isBefore(today) && 
                          record.getNextDueDate().isBefore(today.plusDays(7));

        VaccineResponse response = new VaccineResponse();
        response.setId(record.getId());
        response.setBabyId(record.getBaby().getId());
        response.setBabyName(record.getBaby().getName());
        response.setVaccineName(record.getVaccineName());
        response.setDateGiven(record.getDateGiven());
        response.setNextDueDate(record.getNextDueDate());
        response.setBatchNumber(record.getBatchNumber());
        response.setNotes(record.getNotes());
        response.setAdministeredBy(record.getAdministeredBy());
        response.setCreatedAt(record.getCreatedAt());
        response.setOverdue(over);
        response.setUpcoming(up);
        return response;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getBabyId() { return babyId; }
    public void setBabyId(Long babyId) { this.babyId = babyId; }
    public String getBabyName() { return babyName; }
    public void setBabyName(String babyName) { this.babyName = babyName; }
    public String getVaccineName() { return vaccineName; }
    public void setVaccineName(String vaccineName) { this.vaccineName = vaccineName; }
    public LocalDate getDateGiven() { return dateGiven; }
    public void setDateGiven(LocalDate dateGiven) { this.dateGiven = dateGiven; }
    public LocalDate getNextDueDate() { return nextDueDate; }
    public void setNextDueDate(LocalDate nextDueDate) { this.nextDueDate = nextDueDate; }
    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getAdministeredBy() { return administeredBy; }
    public void setAdministeredBy(String administeredBy) { this.administeredBy = administeredBy; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public boolean isOverdue() { return overdue; }
    public void setOverdue(boolean overdue) { this.overdue = overdue; }
    public boolean isUpcoming() { return upcoming; }
    public void setUpcoming(boolean upcoming) { this.upcoming = upcoming; }
}