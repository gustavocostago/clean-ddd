import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionByIdUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionByIdUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionByIdUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      title: 'Example Question',
      slug: Slug.create('example-question'),
      authorId: new UniqueEntityID(),
      content: 'teste',
    })
    inMemoryQuestionsRepository.create(newQuestion)
    const { question } = await sut.execute({
      slug: 'example-question',
    })
    expect(newQuestion.id).toEqual(question.id)
  })
})
