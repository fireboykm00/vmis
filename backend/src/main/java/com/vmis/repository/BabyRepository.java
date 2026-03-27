package com.vmis.repository;

import com.vmis.model.Baby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BabyRepository extends JpaRepository<Baby, Long> {
    @Query("SELECT b FROM Baby b WHERE b.name LIKE %:query% OR b.phoneNumber LIKE %:query%")
    List<Baby> search(@Param("query") String query);

    @Query("SELECT COUNT(b) FROM Baby b WHERE b.createdAt >= :startDate")
    long countRegisteredAfter(LocalDateTime startDate);
}