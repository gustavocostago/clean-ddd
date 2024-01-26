import { ReadNotificationUseCase } from '../read-notification'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifications-repository'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/now-allowed-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeNotification } from 'test/factories/make-notification'

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository)
  })
  it('should be able to read a question', async () => {
    const notification = makeNotification()

    inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0].readAt).toEqual(
      expect.any(Date)
    )
  })
  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('recipient-1'),
    })
    await inMemoryNotificationRepository.create(notification)
    const result = await sut.execute({
      recipientId: 'recipient-2',
      notificationId: notification.id.toValue(),
    })
    console.log(result.value)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
