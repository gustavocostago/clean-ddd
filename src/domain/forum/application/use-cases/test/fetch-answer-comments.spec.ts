import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchAnswerCommentsUseCase } from '../fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comments-repository'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answers Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })
  it('should be able to fetch recent answers', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      })
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      })
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      })
    )
    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })
    expect(answerComments).toHaveLength(3)
  })
  it('should be able to fetch paginated answers comments', async () => {
    for (let i = 0; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
        })
      )
    }
    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })
    expect(answerComments).toHaveLength(3)
  })
})
