import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { EmailTemplateService } from '../services/email.service';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { EmailTemplateDTO } from '../dtos/email.dto';

@ApiTags('Email Templates')
@Controller('email-templates')
export class EmailTemplateController {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieved all email templates successfully', type: [EmailTemplateDTO] })
  findAllEmailTemplates(): Promise<HttpResponseI<EmailTemplateDTO[]>> {
    return this.emailTemplateService.findAllEmailTemplates();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retrieved email template by ID successfully', type: EmailTemplateDTO })
  findOneEmailTemplate(@Param('id') id: number): Promise<HttpResponseI<EmailTemplateDTO>> {
    return this.emailTemplateService.findOneEmailTemplate(id);
  }

  @Post()
  @ApiBody({ type: EmailTemplateDTO, description: 'Email template data' })
  @ApiResponse({ status: 201, description: 'Email template created successfully', type: EmailTemplateDTO })
  createEmailTemplate(@Body() emailTemplateData: EmailTemplateDTO): Promise<HttpResponseI<EmailTemplateDTO>> {
    return this.emailTemplateService.createEmailTemplate(emailTemplateData);
  }

  @Put(':id')
  @ApiBody({ type: EmailTemplateDTO, description: 'Updated email template data' })
  @ApiResponse({ status: 200, description: 'Email template updated successfully', type: EmailTemplateDTO })
  updateEmailTemplate(
    @Param('id') id: number,
    @Body() updatedEmailTemplateData: EmailTemplateDTO,
  ): Promise<HttpResponseI<EmailTemplateDTO>> {
    return this.emailTemplateService.updateEmailTemplate(id, updatedEmailTemplateData);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Email template deleted successfully' })
  deleteEmailTemplate(@Param('id') id: number): Promise<HttpResponseI<void>> {
    return this.emailTemplateService.deleteEmailTemplate(id);
  }
}
