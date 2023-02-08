import { Module } from '@nestjs/common';
import { SendNotification } from '@application/services/send-notification';
import { DatabaseModule } from './database/database.module';
import { NotificationsController } from './http/controllers/notifications.controller';
import { CancelNotification } from '@application/services/cancel-notification';
import { GetRecipientNotification } from '@application/services/get-recipient-notifications';
import { ReadNotification } from '@application/services/read-notification';
import { UnreadNotification } from '@application/services/unread-notification';
import { CountRecipientNotification } from '@application/services/count-recipient-notifications';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotification
  ],
})
export class HttpModule {}
