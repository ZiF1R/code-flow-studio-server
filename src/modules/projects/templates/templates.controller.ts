import {Controller, Get, HttpStatus, Query, Res} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {TemplatesService} from "./templates.service";

@ApiTags("Templates")
@Controller('api/templates')
export class TemplatesController {
  constructor(
    private templateService: TemplatesService
  ) {}

  @Get('/user')
  async getUserTemplates(@Res() response, @Query('userId') userId) {
    const templates = await this.templateService.getUserTemplates(+userId || 1);
    return response.status(HttpStatus.OK).json({templates});
  }

  @Get('/default')
  async getDefaultTemplates(@Res() response) {
    const templates = await this.templateService.getDefaultTemplates();
    return response.status(HttpStatus.OK).json({templates});
  }
}
