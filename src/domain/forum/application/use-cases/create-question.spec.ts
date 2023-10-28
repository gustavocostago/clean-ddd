import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {
    console.log(question)
    return
  },
}

test('Create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)
  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'Cuiabá x Corinthians',
    content: 'Estádio chega a 38 mil pessoas',
  })
  expect(question.id).toBeTruthy()
})
