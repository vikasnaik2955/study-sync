package com.studysync.common;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.function.Function;

/**
 * The single page envelope every list endpoint returns. Decouples the wire shape from
 * Spring Data's {@code Page} so the contract stays stable for every client.
 */
public record PageResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean first,
        boolean last,
        String sort
) {
    /** Map a Spring Data {@link Page} of entities to a page of DTOs in one shot. */
    public static <E, D> PageResponse<D> from(Page<E> page, Function<E, D> mapper) {
        return new PageResponse<>(
                page.getContent().stream().map(mapper).toList(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isFirst(),
                page.isLast(),
                page.getSort().toString()
        );
    }
}
