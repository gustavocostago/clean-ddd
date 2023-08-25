import { AnswersRepository } from '../../repositories/answers-repository'
import { Answer } from '../entities/answer'

interface AnswerQuestionUseCaseResponse {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {}
  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseResponse) {
    const answer = new Answer({ authorId: instructorId, content, questionId })
    await this.answerRepository.create(answer)
    return answer
  }
}
