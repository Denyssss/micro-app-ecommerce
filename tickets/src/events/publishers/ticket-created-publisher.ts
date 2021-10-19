import { Publisher, Subjects, TicketCreatedEvent } from '@dsticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
