import {
  MessageBody,
  OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import {
  Changes,
  ClientToServerEvents, JoinEvent,
  ServerToClientEvents
} from "./events.interface";
import {Logger} from "@nestjs/common";
import {Server, Socket} from "socket.io";
import {ProjectsService} from "./projects.service";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ProjectsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private projectsService: ProjectsService
  ) {}

  @WebSocketServer() server: Server = new Server<ServerToClientEvents, ClientToServerEvents>()

  private logger = new Logger('ProjectsGateway')

  @SubscribeMessage('changes')
  async handleChangesEvent(
    @MessageBody()
    payload: Changes
  ): Promise<Changes> {
    this.logger.log(payload);
    this.server.to(payload.projectCodeName).emit('changes', payload);

    return payload;
  }

  @SubscribeMessage('joinProject')
  async handleSetClientDataEvent(
    @MessageBody()
    payload: JoinEvent
  ) {
    this.logger.log(`${payload.user.email} is joining ${payload.projectName}`);
    await this.server.in(payload.user.email).socketsJoin(payload.projectName);
    await this.projectsService.addUserToProject(payload.projectName, payload.user);
  }

  handleConnection(socket: Socket): void {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    await this.projectsService.removeUserFromRoom(socket.id);
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
