import { Either, left, right } from '@/core/either'
import { QuestionCommentRepository } from '../repositories/question-comments-repository'
import { NotAllowedError } from './errors/now-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string
  authorId: string
}
type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionsCommentRepository: QuestionCommentRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionsCommentRepository.findById(
      questionCommentId
    )
    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }
    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }
    await this.questionsCommentRepository.delete(questionComment)

    return right({})
  }
}
