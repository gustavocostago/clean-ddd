import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comments-repository'
import { CommentOnAnswerUseCase } from '../comment-on-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswersCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Create Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswersCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswersCommentsRepository
    )
  })
  it('should be able to create a answer comment', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)
    await sut.execute({
      authorId: '1',
      answerId: answer.id.toString(),
      content: 'Gostaria de saber que dia é hoje.',
    })
    expect(inMemoryAnswersCommentsRepository.items[0].content).toEqual(
      'Gostaria de saber que dia é hoje.'
    )
  })
})
