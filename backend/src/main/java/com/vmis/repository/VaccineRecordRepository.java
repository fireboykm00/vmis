package com.vmis.repository;

import com.vmis.model.VaccineRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VaccineRecordRepository extends JpaRepository<VaccineRecord, Long> {
    @Query("SELECT v FROM VaccineRecord v JOIN FETCH v.baby WHERE v.baby.id = :babyId ORDER BY v.dateGiven DESC")
    List<VaccineRecord> findByBabyIdOrderByDateGivenDesc(@Param("babyId") Long babyId);

    @Query("SELECT v FROM VaccineRecord v WHERE v.nextDueDate IS NOT NULL AND v.nextDueDate < :today")
    List<VaccineRecord> findOverdueVaccines(@Param("today") LocalDate today);

    @Query("SELECT v FROM VaccineRecord v WHERE v.nextDueDate IS NOT NULL AND v.nextDueDate >= :today AND v.nextDueDate <= :endDate")
    List<VaccineRecord> findUpcomingVaccines(@Param("today") LocalDate today, @Param("endDate") LocalDate endDate);

    @Query("SELECT COUNT(v) FROM VaccineRecord v WHERE v.dateGiven = :date")
    long countByDateGiven(@Param("date") LocalDate date);

    @Query("SELECT COUNT(v) FROM VaccineRecord v WHERE v.dateGiven >= :startDate")
    long countAfterDate(@Param("startDate") LocalDate startDate);

    @Query("SELECT COUNT(v) FROM VaccineRecord v JOIN v.baby b WHERE b.id = :babyId")
    long countByBabyId(@Param("babyId") Long babyId);
}