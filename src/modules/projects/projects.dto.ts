import {Template} from "../../models/template.model";
import {Project} from "../../models/project.model";

export class CreateProjectDto {
  readonly userId: number;
  readonly teamId?: number;
  name: string;
  readonly codeName: string;
  template: boolean;
  public: boolean;
  freezed: boolean;
}

export class CreateProjectDataDto {
  readonly userId: number;
  readonly teamId?: number;
  name?: string;
  defaultTemplate?: Template;
  userTemplate?: Project;
  public: boolean;
}
