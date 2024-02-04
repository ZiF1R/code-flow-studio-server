import {User} from "../../models/user.model";
import {Project} from "../../models/project.model";

export interface ProjectRoom {
  project: Project
  users: User[]
}

export interface Changes {
  user: User
  timeSent: string
  projectCodeName: string
  fileName: string,
  content: typeof Blob
}

export interface JoinEvent {
  user: User
  projectName: string
}

export interface ServerToClientEvents {
  changes: (e: Changes) => void
}

export interface ClientToServerEvents {
  changes: (e: Changes) => void
  joinProject: (e: { user: User; projectName: string }) => void
}
