import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notifications-repository';

interface CountRecipientNotificationRequest {
  recipientid: string;
}

interface CountRecipientNotificationResponse {
  count: number
};

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: CountRecipientNotificationRequest): Promise<CountRecipientNotificationResponse> {
    const { recipientid } = request;

    const count = await this.notificationRepository.CountManyByRecipientId(recipientid)

  return {count}
  }
}
