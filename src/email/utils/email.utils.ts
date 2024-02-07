import { EmailTemplateEntity } from '../models/email.entity';
import { EmailTemplateI } from '../models/email.interface';

export function transformEmailTemplateEntityToEmailTemplateI(emailTemplateEntity: EmailTemplateEntity): EmailTemplateI {
  return {
    id: emailTemplateEntity.id,
    uuid: emailTemplateEntity.uuid,
    name: emailTemplateEntity.name,
    content: emailTemplateEntity.content,
    createdAt: emailTemplateEntity.createdAt.toISOString(),
    modifiedAt: emailTemplateEntity.modifiedAt.toISOString(),
  };
}
