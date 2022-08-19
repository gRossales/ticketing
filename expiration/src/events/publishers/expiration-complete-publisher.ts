import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@grticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
