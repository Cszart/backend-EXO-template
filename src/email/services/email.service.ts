import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { HttpResponse } from 'src/httpResponse/utils/httpResponse.util';
import { Repository } from 'typeorm';
import { EmailTemplateEntity } from '../models/email.entity';
import { transformEmailTemplateEntityToEmailTemplateDTO } from '../utils/email.utils';
import { EmailTemplateDTO } from '../dtos/email.dto';

@Injectable()
export class EmailTemplateService {
  constructor(
    @InjectRepository(EmailTemplateEntity)
    private readonly emailTemplateRepository: Repository<EmailTemplateEntity>,
  ) {}

  // --- CRUD functions --- //

  // Create
  async createEmailTemplate(emailTemplateData: EmailTemplateDTO): Promise<HttpResponseI<EmailTemplateDTO>> {
    const newEmailTemplate = new EmailTemplateEntity();

    Object.keys(emailTemplateData).forEach(key => {
      newEmailTemplate[key] = emailTemplateData[key];
    });

    const savedEmailTemplate = await this.emailTemplateRepository.save(newEmailTemplate);

    return HttpResponse(
      HttpStatus.CREATED,
      'Email template created successfully',
      transformEmailTemplateEntityToEmailTemplateDTO(savedEmailTemplate),
    );
  }

  // Find all
  async findAllEmailTemplates(): Promise<HttpResponseI<EmailTemplateDTO[]>> {
    const emailTemplatesData = await this.emailTemplateRepository.find({ order: { id: 'DESC' } });

    const emailTemplatesResponse: EmailTemplateDTO[] = emailTemplatesData.map((emailTemplate: EmailTemplateEntity) =>
      transformEmailTemplateEntityToEmailTemplateDTO(emailTemplate),
    );

    return HttpResponse(HttpStatus.OK, 'All email templates fetched successfully', emailTemplatesResponse);
  }

  // Find one
  async findOneEmailTemplate(id: number): Promise<HttpResponseI<EmailTemplateDTO>> {
    try {
      const emailTemplate = await this.emailTemplateRepository.findOne({ where: { id: id } });
      if (!emailTemplate) {
        throw new NotFoundException('Email template not found');
      }
      return HttpResponse(
        HttpStatus.OK,
        'Email template fetched successfully',
        transformEmailTemplateEntityToEmailTemplateDTO(emailTemplate),
      );
    } catch (error) {
      throw new NotFoundException('Email template not found');
    }
  }

  // Update
  async updateEmailTemplate(
    id: number,
    updatedEmailTemplateData: EmailTemplateDTO,
  ): Promise<HttpResponseI<EmailTemplateDTO>> {
    const emailTemplate = await this.emailTemplateRepository.findOne({ where: { id: id } });
    if (!emailTemplate) {
      throw new NotFoundException('Email template not found');
    }
    Object.assign(emailTemplate, updatedEmailTemplateData);
    const updatedEmailTemplate = await this.emailTemplateRepository.save(emailTemplate);
    return HttpResponse(
      HttpStatus.OK,
      'Email template updated successfully',
      transformEmailTemplateEntityToEmailTemplateDTO(updatedEmailTemplate),
    );
  }

  // Delete
  async deleteEmailTemplate(id: number): Promise<HttpResponseI<void>> {
    await this.emailTemplateRepository.delete(id);
    return HttpResponse(HttpStatus.OK, 'Email template deleted successfully', null);
  }
}
