import {FsService} from "./fs.service";
import {execSync, spawnSync} from "child_process";
import {NewProject} from "./types";
import {Injectable} from "@nestjs/common";
import {DockerfileService} from "./dockerfile.service";
import {Template} from "../../../models/template.model";
import {CreateProjectDataDto} from "../projects.dto";

@Injectable()
export class DockerService {
  constructor(
    private dockerfileService: DockerfileService,
    private fsService: FsService,
  ) {}

  createImage({ path, name }) {
    const dockerfilePath = `${path}/.codeflowstudio/Dockerfile`;

    const buildResult = spawnSync('docker', ['build', '-t', name, '-f', dockerfilePath, '.']);
    if (buildResult.error) {
      console.error('Error building Docker image:', buildResult.error);
    } else {
      console.log('Docker image built successfully');
    }
  }

  createContainer(name, image) {
    execSync(`docker container create --name ${name} ${image}`)
  }

  runImage(container, image) {
    const hostPort = 8080; // Порт на хосте
    const containerPort = 5000; // Порт внутри контейнера

    execSync(`docker run -d -p ${hostPort}:${containerPort} --name ${container} -v "%cd%\\\\public\\\\projects\\\\${container}:/app" ${image}`);
  }

  execContainerCommand(container, command) {
    execSync(`docker exec -t ${container} ${command}`);
  }

  startContainer(container) {
    execSync(`docker start ${container}`);
  }

  stopContainer(container) {
    execSync(`docker stop ${container}`);
  }

  removeContainer(container) {
    execSync(`docker rm ${container}`);
  }

  async initProject(data: CreateProjectDataDto): Promise<NewProject> {
    // this.dockerfileService.generateDockerfile(newProject.path);
    // this.createContainer(newProject.name, "static-template");

    // this.runImage(newProject.name, "static-template");

    return await this.fsService.generateProject(data);
  }
}
