import { AnswerQuestionUseCase } from './answer-questions'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    console.log(answer)
    return
  },
}

describe('Answer Use Case', () => {
  test('Answer Content', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)
    const answer = await answerQuestion.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Teste',
    })
    expect(answer.content).toEqual('Teste')
  })
})
