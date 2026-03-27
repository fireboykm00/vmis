package com.vmis.service;

import com.vmis.dto.response.DashboardStatsResponse;
import com.vmis.repository.BabyRepository;
import com.vmis.repository.VaccineRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final BabyRepository babyRepository;
    private final VaccineRecordRepository vaccineRecordRepository;

    public DashboardStatsResponse getStats() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfMonth = LocalDate.now().withDayOfMonth(1).atStartOfDay();

        long totalBabies = babyRepository.count();
        long totalVaccines = vaccineRecordRepository.count();
        long overdueVaccines = vaccineRecordRepository.findOverdueVaccines(today).size();
        long upcomingVaccines = vaccineRecordRepository.findUpcomingVaccines(today, today.plusDays(7)).size();
        long todayVaccines = vaccineRecordRepository.countByDateGiven(today);
        long thisMonthVaccines = vaccineRecordRepository.countAfterDate(startOfMonth.toLocalDate());
        long registeredThisMonth = babyRepository.countRegisteredAfter(startOfMonth);

        DashboardStatsResponse response = new DashboardStatsResponse();
        response.setTotalBabies(totalBabies);
        response.setTotalVaccinesGiven(totalVaccines);
        response.setOverdueVaccines(overdueVaccines);
        response.setUpcomingVaccines(upcomingVaccines);
        response.setCompletedVaccines(0);
        response.setTodayVaccines(todayVaccines);
        response.setThisMonthVaccines(thisMonthVaccines);
        response.setRegisteredThisMonth(registeredThisMonth);
        return response;
    }
}