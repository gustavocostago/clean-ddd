import { Entity } from '../../core/entities/entity'
import { UniqueEntityID } from '../../core/entities/unique-entity-id'

interface AnswerProps {
  questionId: UniqueEntityID
  authorId: UniqueEntityID
  content: string
  createAt: Date
  updateAt?: Date
}
export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }
}
