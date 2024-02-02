import { Module } from '@nestjs/common';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Template} from "../../../models/template.model";
import {Project} from "../../../models/project.model";

@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService],
  imports: [
    SequelizeModule.forFeature([Template, Project])
  ]
})
export class TemplatesModule {}
