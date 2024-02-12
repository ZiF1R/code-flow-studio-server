import {User} from "../../../models/user.model";
import {Project} from "../../../models/project.model";
import {Socket} from "socket.io";

export type ProjectRoomUser = {
  id: number;
  email: string;
  username?: string;
  name?: string;
  surname?: string;
  picture?: string;
  socket: string
};

export interface ProjectRoom {
  project: Project
  users: ProjectRoomUser[]
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
export type FileType = "file" | "folder";

export type ProjectFile = {
  name: string,
  extension: string | null,
  type: FileType | null,
  path: string,
}

export type NewFile = {
  file: ProjectFile
  projectName: string
}

export interface ServerToClientEvents {
  changes: (e: Changes) => void
  newFile: (e: NewFile) => void
  userJoin: (user: User) => void
  userLeave: (user: User) => void
}

export interface ClientToServerEvents {
  changes: (e: Changes) => void
  newFile: (e: NewFile) => void
  joinProject: (e: { user: User; projectName: string }) => void
}

export interface FileNode {
  id: number;
  type: FileType;
  content: string | FileMap;
}

export interface FileMap {
  [filename: string]: FileNode;
}
