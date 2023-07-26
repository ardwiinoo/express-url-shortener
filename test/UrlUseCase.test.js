const UrlUseCase = require("../src/domain/useCase/UrlUseCase");
const UrlEntity = require("../src/domain/entity/UrlEntity");
const UrlRepository = require("../src/framework/repository/UrlRepository");

jest.mock("../src/framework/repository/UrlRepository", () => {
    return jest.fn().mockImplementation(() => {
        return {
            createUrl: jest.fn()
        };
    });
});

const urlRepository = new UrlRepository();

test(`createUrl should call UrlRepository.createUrl and return UrlEntity`, async () => {
    // arrange
    const shortId = 'ardwiinoo';
    const redirectUrl = 'https://google.com';
    const urlEntity = new UrlEntity(shortId, redirectUrl, []);
    const createUrlMock = urlRepository.createUrl.mockResolvedValueOnce(urlEntity);
    const urlUseCase = new UrlUseCase(urlRepository);

    // act
    const createdUrl = await urlUseCase.createUrl(shortId, redirectUrl, []);

    // assert
    expect(createUrlMock).toHaveBeenCalledWith(urlEntity);
    expect(createdUrl).toEqual(urlEntity);
});