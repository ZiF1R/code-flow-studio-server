import { randomBytes } from "crypto";
import { existsSync, mkdirSync } from "fs";
import { execSync } from "child_process"
import { join, normalize } from "path"
import { NewProject } from "./types";
import { Injectable } from "@nestjs/common";

const BASE_DIR = normalize(join(__dirname, '../../../../public'));
const BASE_PROJECTS_DIR = `${BASE_DIR}/projects`;
const BASE_REPOSITORIES_DIR = `${BASE_DIR}/repositories`;

@Injectable()
export class FsService {
  constructor() {}

  async cloneRepository(repoUrl, targetFolder) {
    try {
      await execSync(`git clone --depth 1 ${repoUrl} "${targetFolder}"`);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  generateRandomCode(length): string {
    const bytes = randomBytes(Math.ceil(length / 2));
    return bytes.toString('hex').slice(0, length);
  }

  generateProjectName(): string {
    const namePartLength = 6;
    return `${this.generateRandomCode(namePartLength)}-${this.generateRandomCode(namePartLength)}-${this.generateRandomCode(namePartLength)}`;
  }

  async generateProject(templateLink): Promise<NewProject> {
    let name: string = this.generateProjectName();
    let pathToProject: string = `${BASE_PROJECTS_DIR}/${name}`;

    while (existsSync(pathToProject)) {
      name = this.generateProjectName();
      pathToProject = `${BASE_PROJECTS_DIR}/${name}`;
    }

    mkdirSync(pathToProject);
    await this.cloneRepository(templateLink, pathToProject);

    return { path: pathToProject, name };
  }
}
