import { Injectable } from "@nestjs/common";
import { mkdirSync, writeFileSync } from "fs";

const dockerfileTemplate = ({ from, run, port, cmd }) => (
`FROM ${from}
WORKDIR /app
COPY ../. /app
RUN npm install -g http-server
RUN ${run}
EXPOSE ${port}
CMD ${JSON.stringify(cmd)}`
);

@Injectable()
export class DockerfileService {
  constructor() {}

  generateDockerfile(projectPath) {
    const rootDir = `${projectPath}/.codeflowstudio`;
    const dockerfileOptions = {
      from: "node:18-bullseye",
      run: "npm install",
      port: 5173,
      cmd: ["http-server"]
    }
    const dockerfileContents = dockerfileTemplate(dockerfileOptions);

    mkdirSync(rootDir);
    writeFileSync(`${rootDir}/Dockerfile`, dockerfileContents);
  }
}
