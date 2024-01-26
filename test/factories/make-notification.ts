import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID
) {
  const newNotification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.text(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  )
  return newNotification
}
