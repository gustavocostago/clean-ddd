import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface GetQuestionByIdUseCaseRequest {
  slug: string
}
type GetQuestionByIdUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class GetQuestionByIdUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionByIdUseCaseRequest): Promise<GetQuestionByIdUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)
    if (!question) throw new Error('Question not Found')
    return right({ question })
  }
}
