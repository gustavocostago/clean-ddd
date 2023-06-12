import { describe, expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-questions'

describe('Answer Use Case', () => {
  test('Answer Content', () => {
    const answerQuestion = new AnswerQuestionUseCase()
    const answer = answerQuestion.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Teste',
    })
    expect(answer.content).toEqual('Teste')
  })
})
