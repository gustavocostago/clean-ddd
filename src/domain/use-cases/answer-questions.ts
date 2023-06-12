import { Answer } from '../entities/answer'

interface AnswerQuestionUseCaseResponse {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseResponse) {
    const answer = new Answer(content)
    return answer
  }
}
