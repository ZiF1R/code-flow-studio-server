import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Template} from "../../../models/template.model";
import {Project} from "../../../models/project.model";

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template)
    private templateModel: typeof Template,
    @InjectModel(Project)
    private projectModel: typeof Project,
  ) {}

  async getDefaultTemplates(): Promise<Template[]> {
    return await this.templateModel.findAll();
  }

  async getUserTemplates(userId: number): Promise<Project[]> {
    return await this.projectModel.findAll({
      where: {
        userId,
        template: true
      }
    })
  }
}
