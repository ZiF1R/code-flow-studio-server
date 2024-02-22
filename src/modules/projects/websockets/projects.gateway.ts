import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import {
  Changes,
  ClientToServerEvents, JoinEvent, NewFile,
  ServerToClientEvents
} from "./events.interface";
import {BadRequestException, Logger} from "@nestjs/common";
import {Server, Socket} from "socket.io";
import {ProjectsService} from "../projects.service";
import {platform} from "os";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ProjectsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private projectsService: ProjectsService,
  ) {}

  @WebSocketServer() server: Server = new Server<ServerToClientEvents, ClientToServerEvents>()

  private logger = new Logger('ProjectsGateway')

  @SubscribeMessage('changes')
  async handleChangesEvent(
    @MessageBody()
    payload: Changes,
    @ConnectedSocket()
    socket: Socket,
  ) {
    try {
      await this.projectsService.executeFileChanges(payload);
      this.broadcastEvent("changes", payload.projectCodeName, socket, payload);
      return payload;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @SubscribeMessage('newFile')
  async handleNewFileEvent(
    @MessageBody()
    payload: NewFile,
    @ConnectedSocket()
    socket: Socket,
  ): Promise<NewFile> {
    const created = await this.projectsService.createProjectFile(payload.projectName, payload.file);

    if (created) {
      this.broadcastEvent("newFile", payload.projectName, socket, payload.file);
    }

    return payload;
  }

  @SubscribeMessage('joinProject')
  async handleSetClientDataEvent(
    @MessageBody()
    payload: JoinEvent,
    @ConnectedSocket()
    socket: Socket,
  ) {
    this.logger.log(`${payload.user.email} is joining ${payload.projectName}`);
    await this.projectsService.addUserToProject(payload.projectName, payload.user, socket.id);

    this.broadcastEvent("userJoin", payload.projectName, socket, payload.user)
  }

  handleConnection(socket: Socket): void {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    const data = await this.projectsService.removeUserFromRoom(socket.id);
    this.logger.log(`Socket disconnected: ${socket.id}`);

    if (data) {
      const {projectName, user} = data;
      this.broadcastEvent("userLeave", projectName, socket, user);
    }
  }

  broadcastEvent(event: string, projectName: string, targetSocket: Socket, data: any = null) {
    const room = this.projectsService.getProjectRoom(projectName);
    if (room) {
      for (const user of room?.users) {
        if (targetSocket.id !== user.socket) {
          this.server.sockets.to(user.socket).emit(event, data);
        }
      }
    }
  }
}
