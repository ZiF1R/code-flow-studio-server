import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { DockerService } from "./services/docker.service";
import { DockerfileService } from "./services/dockerfile.service";
import { FsService } from "./services/fs.service";

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, DockerService, DockerfileService, FsService]
})
export class ProjectsModule {}
