import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsUseCaseRequest {
  page: number
  answerId: string
}
interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerComments: AnswerCommentRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerComments.findManyByAnswerId(
      { page },
      answerId
    )
    return { answerComments }
  }
}
