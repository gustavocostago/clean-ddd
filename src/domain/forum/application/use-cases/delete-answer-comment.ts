import { AnswerCommentRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string
  authorId: string
}
interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answersCommentRepository: AnswerCommentRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answersCommentRepository.findById(
      answerCommentId
    )
    if (!answerComment) {
      throw new Error('Answer comment not found')
    }
    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }
    await this.answersCommentRepository.delete(answerComment)

    return {}
  }
}
