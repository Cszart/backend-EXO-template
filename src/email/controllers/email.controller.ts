import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { EmailTemplateI } from '../models/email.interface';
import { EmailTemplateService } from '../services/email.service';

@Controller('email-templates')
export class EmailTemplateController {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Get()
  findAllEmailTemplates(): Promise<HttpResponseI<EmailTemplateI[]>> {
    return this.emailTemplateService.findAllEmailTemplates();
  }

  @Get(':id')
  findOneEmailTemplate(@Param('id') id: number): Promise<HttpResponseI<EmailTemplateI>> {
    return this.emailTemplateService.findOneEmailTemplate(id);
  }

  @Post()
  createEmailTemplate(@Body() emailTemplateData: EmailTemplateI): Promise<HttpResponseI<EmailTemplateI>> {
    return this.emailTemplateService.createEmailTemplate(emailTemplateData);
  }

  @Put(':id')
  updateEmailTemplate(
    @Param('id') id: number,
    @Body() updatedEmailTemplateData: Partial<EmailTemplateI>,
  ): Promise<HttpResponseI<EmailTemplateI>> {
    return this.emailTemplateService.updateEmailTemplate(id, updatedEmailTemplateData);
  }

  @Delete(':id')
  deleteEmailTemplate(@Param('id') id: number): Promise<HttpResponseI<void>> {
    return this.emailTemplateService.deleteEmailTemplate(id);
  }
}
