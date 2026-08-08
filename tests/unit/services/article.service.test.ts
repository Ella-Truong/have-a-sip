import { ArticleService } from "@/backend/services/article.service";
import { ArticleRepository } from "@/backend/repositories/article.repository";

import { 
    prismaArticleFixture,
    articleResultFixture,
    articleDetailFixture,
    articleSummaryFixture,
} from "../../fixtures/article.fixture";
import { buildingPagination } from "@/lib/helper";


jest.mock("@/lib/helper", () => ({
    generateSlug: jest.fn(() => "learning-prisma"),
    calculateReadingTime: jest.fn(() => 1),
    buildingPagination: jest.fn(),
}));

describe("ArticleService", () => {
    let service: ArticleService;
    let repository: jest.Mocked<ArticleRepository>;

    beforeEach(() => {
        //create fake repository
        repository = {
            findArticles: jest.fn(),
            findArticleBySlug: jest.fn(),
            findAllArticles: jest.fn(),
            findArticleById: jest.fn(),
            createArticle: jest.fn(),
            updateArticle: jest.fn(),
            deleteArticle: jest.fn(),
        } as jest.Mocked<ArticleRepository>;

        service = new ArticleService(repository);

        jest.clearAllMocks();
    });

    describe("createArticle", () => {
        it("should generate slug, calculate reading time, and create article", async () => {
            //Arrange
            repository.createArticle.mockResolvedValue(
                articleResultFixture
            );

            //Act
            const result = await service.createArticle(
                prismaArticleFixture
            );

            //Assert 
            expect(repository.createArticle).toHaveBeenCalledTimes(1);
            expect(repository.createArticle).toHaveBeenCalledWith({
                ...prismaArticleFixture,
                slug: "learning-prisma",
                readingTime: 1,
            });

            expect(result).toEqual(articleResultFixture);

        })
    });

    describe("updateArticle", () => {
        it("should update slug and reading time when title and content change", async () => {
            //Arrange
            repository.findArticleById.mockResolvedValue(
                articleDetailFixture
            );

            repository.updateArticle.mockResolvedValue(
                articleDetailFixture
            );

            const input = {
                title: "Learning Redis Updated",
                content: "Updated Redis content",
            };

            //Act
            const result = await service.updateArticle(
                "article-1",
                input
            );

            //Assert
            expect(repository.findArticleById).toHaveBeenCalledWith("article-1");
            expect(repository.updateArticle).toHaveBeenCalledWith(
                "article-1",
                {
                    ...input,
                    slug: "learning-prisma",
                    readingTime: 1,
                }
            );

            expect(result).toEqual(articleDetailFixture);
        });

        it("should set publishedAt when publishing for the first time", async () => {
            //Arrange
            repository.findArticleById.mockResolvedValue({
                ...articleDetailFixture,
                published: false,
                publishedAt: null,
            });

            repository.updateArticle.mockResolvedValue(
                articleDetailFixture
            );

            //Act
            await service.updateArticle(
                "article-1",
                {
                    published: true,
                }
            );

            //Assert
            expect(repository.updateArticle).toHaveBeenCalledWith(
                "article-1",
                expect.objectContaining({
                    published: true,
                    publishedAt: expect.any(Date)
                })
            );

        });

        it("should throw when article does not exist", async () => {
            // Arrange
            repository.findArticleById.mockResolvedValue(null);

            // Act & Assert
            await expect(
                service.updateArticle(
                    "article-1",
                    {
                        title: "Updated Article",
                    }
                )
            ).rejects.toThrow("Article not found");

            expect(repository.updateArticle).not.toHaveBeenCalled();
        })
    });

    describe("getArticles", () => {
        it("should return paginated articles", async () => {
            //Arrange
            const articles = [articleSummaryFixture];

            repository.findArticles.mockResolvedValue({
                articles,
                totalItems: 1,
            })

            const pagination = {
                currentPage: 1,
                pageSize: 10,
                totalItems: 1,
                totalPages: 1,
                hasNextPage: false,
                hasPreviousPage: false,
            };
            
            (buildingPagination as jest.Mock).mockReturnValue(pagination);
            
            const query = {
                page: 1,
                limit: 10,
            }

            //Act
            const result = await service.getArticles(query);

            //Assert
            expect(repository.findArticles).toHaveBeenCalledWith(
                1,
                10,
                undefined
            );

            expect(buildingPagination).toHaveBeenCalledWith(
                1,
                10,
                1
            );

            expect(result).toEqual({
                data: articles,
                pagination
            })
        })
    })
})