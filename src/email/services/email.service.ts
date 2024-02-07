import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { HttpResponse } from 'src/httpResponse/utils/httpResponse.util';
import { Repository } from 'typeorm';
import { EmailTemplateEntity } from '../models/email.entity';
import { EmailTemplateI } from '../models/email.interface';
import { transformEmailTemplateEntityToEmailTemplateI } from '../utils/email.utils';

@Injectable()
export class EmailTemplateService {
  constructor(
    @InjectRepository(EmailTemplateEntity)
    private readonly emailTemplateRepository: Repository<EmailTemplateEntity>,
  ) {}

  // --- CRUD functions --- //

  // Create
  async createEmailTemplate(emailTemplateData: EmailTemplateI): Promise<HttpResponseI<EmailTemplateI>> {
    const newEmailTemplate = new EmailTemplateEntity();

    Object.keys(emailTemplateData).forEach(key => {
      newEmailTemplate[key] = emailTemplateData[key];
    });

    const savedEmailTemplate = await this.emailTemplateRepository.save(newEmailTemplate);

    return HttpResponse(
      HttpStatus.CREATED,
      'Email template created successfully',
      transformEmailTemplateEntityToEmailTemplateI(savedEmailTemplate),
    );
  }

  // Find all
  async findAllEmailTemplates(): Promise<HttpResponseI<EmailTemplateI[]>> {
    const emailTemplatesData = await this.emailTemplateRepository.find({ order: { id: 'DESC' } });

    const emailTemplatesResponse: EmailTemplateI[] = emailTemplatesData.map((emailTemplate: EmailTemplateEntity) =>
      transformEmailTemplateEntityToEmailTemplateI(emailTemplate),
    );

    return HttpResponse(HttpStatus.OK, 'All email templates fetched successfully', emailTemplatesResponse);
  }

  // Find one
  async findOneEmailTemplate(id: number): Promise<HttpResponseI<EmailTemplateI>> {
    try {
      const emailTemplate = await this.emailTemplateRepository.findOne({ where: { id: id } });
      if (!emailTemplate) {
        throw new NotFoundException('Email template not found');
      }
      return HttpResponse(
        HttpStatus.OK,
        'Email template fetched successfully',
        transformEmailTemplateEntityToEmailTemplateI(emailTemplate),
      );
    } catch (error) {
      throw new NotFoundException('Email template not found');
    }
  }

  // Update
  async updateEmailTemplate(
    id: number,
    updatedEmailTemplateData: Partial<EmailTemplateI>,
  ): Promise<HttpResponseI<EmailTemplateI>> {
    const emailTemplate = await this.emailTemplateRepository.findOne({ where: { id: id } });
    if (!emailTemplate) {
      throw new NotFoundException('Email template not found');
    }
    Object.assign(emailTemplate, updatedEmailTemplateData);
    const updatedEmailTemplate = await this.emailTemplateRepository.save(emailTemplate);
    return HttpResponse(
      HttpStatus.OK,
      'Email template updated successfully',
      transformEmailTemplateEntityToEmailTemplateI(updatedEmailTemplate),
    );
  }

  // Delete
  async deleteEmailTemplate(id: number): Promise<HttpResponseI<void>> {
    await this.emailTemplateRepository.delete(id);
    return HttpResponse(HttpStatus.OK, 'Email template deleted successfully', null);
  }
}
