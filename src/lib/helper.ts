export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g,"")
        .replace(/\s+/g, "-")
}

export function calculateReadingTime(content: string): number {
    const words = content.trim().split(/\s+/).length
    const wordPerMinute = 200;

    return Math.max(1, Math.ceil(words/wordPerMinute))
}

export function buildingPagination(
    page: number,
    limit: number,
    totalItems: number
) {
    const totalPages = Math.ceil(totalItems/limit);
        
    return {
        page, 
        limit, 
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    }
}