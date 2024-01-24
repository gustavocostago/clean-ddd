import { SendNotificationUseCase } from '../send-notification'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifications-repository'

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })
  it('should be able to create a question', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Que dia é hoje?',
      content: 'Gostaria de saber que dia é hoje.',
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0]).toEqual(
      result.value?.notification
    )
  })
})
