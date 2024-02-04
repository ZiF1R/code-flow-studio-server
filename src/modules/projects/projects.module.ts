import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { DockerService } from "./services/docker.service";
import { DockerfileService } from "./services/dockerfile.service";
import { FsService } from "./services/fs.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Project} from "../../models/project.model";
import {File} from "../../models/file.model";
import {FilesFolder} from "../../models/files-folder.model";
import {Folder} from "../../models/folder.model";
import {UserPermissions} from "../../models/user-permissions.model";
import {ProjectParticipant} from "../../models/project-participant.model";
import {VisitedProject} from "../../models/visited-project.model";
import {FavoriteProject} from "../../models/favorite-project.model";
import {Message} from "../../models/message.model";
import {MessageMedia} from "../../models/message-media.model";
import {MediaType} from "../../models/media-type.model";
import {TasksColumn} from "../../models/tasks-column.model";
import {TasksAssign} from "../../models/task-assign.model";
import {TasksPriority} from "../../models/tasks-priority.model";
import {Task} from "../../models/task.model";
import { ProjectsGateway } from './projects.gateway';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, DockerService, DockerfileService, FsService, ProjectsGateway],
  imports: [
    SequelizeModule.forFeature([UserPermissions, Project, File, FilesFolder, Folder, ProjectParticipant, VisitedProject, FavoriteProject, Message, MessageMedia, MediaType, TasksColumn, TasksAssign, TasksPriority, Task]),
  ]
})
export class ProjectsModule {}
