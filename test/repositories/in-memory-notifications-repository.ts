import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationRepository implements NotificationsRepository {
  public items: Notification[] = []

  async findById(id: string) {
    const notifications = this.items.find((item) => item.id.toString() === id)
    if (!notifications) {
      return null
    }
    return notifications
  }
  async save(notification: Notification) {
    this.items.push(notification)
  }
  async create(notification: Notification) {
    this.items.push(notification)
  }
}
