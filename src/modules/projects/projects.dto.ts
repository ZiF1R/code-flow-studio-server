export class CreateProjectDto {
  readonly userId: number;
  readonly teamId?: number;
  name: string;
  readonly codeName: string;
  template: boolean;
  public: boolean;
  freezed: boolean;
}

// TODO: delete tmp class
export class Template {
  id: number;
  name: string;
  type: 'default' | 'user';
}

export class CreateProjectDataDto {
  readonly userId: number;
  readonly teamId?: number;
  name?: string;
  template: Template;
  public: boolean;
}
