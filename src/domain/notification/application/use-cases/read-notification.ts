import { Either, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}
type ReadNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })
    await this.notificationsRepository.create(notification)
    return right({ notification })
  }
}
