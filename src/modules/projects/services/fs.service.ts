import { randomBytes } from "crypto";
import { existsSync, mkdirSync } from "fs";
import { execSync } from "child_process"
import { join, normalize } from "path"
import { NewProject } from "./types";
import {BadRequestException, Injectable} from "@nestjs/common";
import * as fs from "fs";
import {CreateProjectDataDto} from "../projects.dto";
import {FileMap, ProjectFile} from "../websockets/events.interface";

const BASE_DIR = normalize(join(__dirname, '../../../../public'));
const BASE_PROJECTS_DIR = `${BASE_DIR}/projects`;
const BASE_REPOSITORIES_DIR = `${BASE_DIR}/repositories`;

const BASE_TEMPLATES_DIR = normalize(join(__dirname, '../../../../../templates'));

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

  getTemplatePath(data: CreateProjectDataDto): string {
    if (data.defaultTemplate !== null) {
      return `${BASE_TEMPLATES_DIR}/${data.defaultTemplate.codeName}`;
    } else if (data.userTemplate !== null) {
      return `${BASE_PROJECTS_DIR}/${data.userTemplate.codeName}`;
    } else {
      throw new BadRequestException();
    }
  }

  async generateProject(data: CreateProjectDataDto): Promise<NewProject> {
    const src: string = this.getTemplatePath(data);
    let name: string = this.generateProjectName();
    let pathToProject: string = `${BASE_PROJECTS_DIR}/${name}`;

    while (existsSync(pathToProject)) {
      name = this.generateProjectName();
      pathToProject = `${BASE_PROJECTS_DIR}/${name}`;
    }

    mkdirSync(pathToProject);
    fs.cpSync(src, pathToProject, {recursive: true});
    // await this.cloneRepository(templateLink, pathToProject);

    return { path: pathToProject, name };
  }

  startId = 0;
  async getFilesTree(folder: string, tree = {}): Promise<FileMap> {
    const directoryPath = `${BASE_PROJECTS_DIR}/${folder}`;
    const files = fs.readdirSync(directoryPath, {withFileTypes: true});
    for (const file of files) {
      if (file.isFile()) {
        tree[file.name] = {
          id: this.startId++,
          type: 'file',
          content: '',
        }
      } else if (file.isDirectory()) {
        if (file.name === ".git") {
          continue;
        }
        tree[file.name] = {
          id: this.startId++,
          type: 'folder',
          content: {},
        }
        tree[file.name].content = await this.getFilesTree(join(folder, file.name), tree[file.name].content);
      }
    }

    return tree;
  }

  async createFile(projectName: string, data: ProjectFile): Promise<boolean> {
    const path = join(BASE_PROJECTS_DIR, projectName, data.path, data.name + (data.extension ? '.' + data.extension : ''));
    if (fs.existsSync(path)) {
      return false;
    }
    try {
      if (data.type === "file") {
        fs.writeFileSync(path, '');
      } else if (data.type === "folder") {
        if (!fs.existsSync(path)) {
          await fs.mkdirSync(path);
        }
      }
    } catch (err) {
      console.error(err);
      return false;
    }

    return true;
  }

  async getFileContent(projectName: string, path: string): Promise<string> {
    const fullPath = join(BASE_PROJECTS_DIR, projectName, path);
    if (!fs.existsSync(fullPath)) {
      throw new BadRequestException();
    }

    return fs.readFileSync(fullPath, "utf8");
  }
}
