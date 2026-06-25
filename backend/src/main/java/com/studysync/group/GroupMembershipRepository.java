package com.studysync.group;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GroupMembershipRepository extends JpaRepository<GroupMembership, UUID> {

    Optional<GroupMembership> findByGroupIdAndUserId(UUID groupId, UUID userId);

    boolean existsByGroupIdAndUserId(UUID groupId, UUID userId);

    List<GroupMembership> findByGroupIdOrderByCreatedAtAsc(UUID groupId);

    List<GroupMembership> findByUserIdOrderByCreatedAtDesc(UUID userId);

    long countByGroupId(UUID groupId);

    void deleteByGroupIdAndUserId(UUID groupId, UUID userId);
}
