package com.vmis.dto.baby;

import com.vmis.model.Baby;
import com.vmis.model.enums.Gender;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

public class BabyResponse {
    private Long id;
    private String name;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String guardianName;
    private String phoneNumber;
    private String address;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String age;
    private int vaccineCount;

    public static BabyResponse fromEntity(Baby baby) {
        BabyResponse response = new BabyResponse();
        response.setId(baby.getId());
        response.setName(baby.getName());
        response.setDateOfBirth(baby.getDateOfBirth());
        response.setGender(baby.getGender());
        response.setGuardianName(baby.getGuardianName());
        response.setPhoneNumber(baby.getPhoneNumber());
        response.setAddress(baby.getAddress());
        response.setNotes(baby.getNotes());
        response.setCreatedAt(baby.getCreatedAt());
        response.setUpdatedAt(baby.getUpdatedAt());
        response.setAge(calculateAge(baby.getDateOfBirth()));
        return response;
    }

    private static String calculateAge(LocalDate dateOfBirth) {
        if (dateOfBirth == null) return "Unknown";
        Period period = Period.between(dateOfBirth, java.time.LocalDate.now());
        if (period.getYears() > 0) {
            return period.getYears() + " year" + (period.getYears() > 1 ? "s" : "");
        } else if (period.getMonths() > 0) {
            return period.getMonths() + " month" + (period.getMonths() > 1 ? "s" : "");
        } else {
            return period.getDays() + " day" + (period.getDays() > 1 ? "s" : "");
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }
    public String getGuardianName() { return guardianName; }
    public void setGuardianName(String guardianName) { this.guardianName = guardianName; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }
    public int getVaccineCount() { return vaccineCount; }
    public void setVaccineCount(int vaccineCount) { this.vaccineCount = vaccineCount; }
}