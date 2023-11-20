import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
  async findById(id: string) {
    const asnwerComment = this.items.find((item) => item.id.toString() === id)
    if (!asnwerComment) {
      return null
    }
    return asnwerComment
  }
  async findManyByAnswerId({ page }: PaginationParams, answerId: string) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
    return answerComments
  }
  async delete(asnwerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === asnwerComment.id
    )
    this.items.splice(itemIndex, 1)
  }
}
