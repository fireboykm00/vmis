package com.vmis.dto.response;

public class DashboardStatsResponse {
    private long totalBabies;
    private long totalVaccinesGiven;
    private long overdueVaccines;
    private long upcomingVaccines;
    private long completedVaccines;
    private long todayVaccines;
    private long thisMonthVaccines;
    private long registeredThisMonth;

    public long getTotalBabies() { return totalBabies; }
    public void setTotalBabies(long totalBabies) { this.totalBabies = totalBabies; }
    public long getTotalVaccinesGiven() { return totalVaccinesGiven; }
    public void setTotalVaccinesGiven(long totalVaccinesGiven) { this.totalVaccinesGiven = totalVaccinesGiven; }
    public long getOverdueVaccines() { return overdueVaccines; }
    public void setOverdueVaccines(long overdueVaccines) { this.overdueVaccines = overdueVaccines; }
    public long getUpcomingVaccines() { return upcomingVaccines; }
    public void setUpcomingVaccines(long upcomingVaccines) { this.upcomingVaccines = upcomingVaccines; }
    public long getCompletedVaccines() { return completedVaccines; }
    public void setCompletedVaccines(long completedVaccines) { this.completedVaccines = completedVaccines; }
    public long getTodayVaccines() { return todayVaccines; }
    public void setTodayVaccines(long todayVaccines) { this.todayVaccines = todayVaccines; }
    public long getThisMonthVaccines() { return thisMonthVaccines; }
    public void setThisMonthVaccines(long thisMonthVaccines) { this.thisMonthVaccines = thisMonthVaccines; }
    public long getRegisteredThisMonth() { return registeredThisMonth; }
    public void setRegisteredThisMonth(long registeredThisMonth) { this.registeredThisMonth = registeredThisMonth; }
}