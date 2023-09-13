import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface AnswerProps {
  questionId: UniqueEntityID
  authorId: UniqueEntityID
  content: string
  createdAt: Date
  updateAt?: Date
}
export class Answer extends Entity<AnswerProps> {
  get questionId() {
    return this.props.questionId
  }
  get authorId() {
    return this.props.authorId
  }
  get content() {
    return this.props.content
  }
  get createdAt() {
    return this.props.createdAt
  }
  get updateAt() {
    return this.props.updateAt
  }
  set content(content: string) {
    this.props.content = content
  }
  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    )
    return answer
  }
}
