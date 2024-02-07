export interface EmailTemplateI {
  id: number;
  uuid: string;
  name: string;
  content: string; // HTML as string
  createdAt?: string;
  modifiedAt?: string;
}
