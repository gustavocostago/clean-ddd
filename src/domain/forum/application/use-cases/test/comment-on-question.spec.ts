import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from '../comment-on-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Create Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionsCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionsCommentsRepository
    )
  })
  it('should be able to create a question comment', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)
    await sut.execute({
      authorId: '1',
      questionId: question.id.toString(),
      content: 'Gostaria de saber que dia é hoje.',
    })
    expect(inMemoryQuestionsCommentsRepository.items[0].content).toEqual(
      'Gostaria de saber que dia é hoje.'
    )
  })
})
