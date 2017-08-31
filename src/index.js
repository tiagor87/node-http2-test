const http2 = require('http2');
const {
  HTTP2_HEADER_METHOD,
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
  HTTP2_HEADER_CONTENT_TYPE
} = http2.constants;
const serverOptions = require('./server-options.js');

class Server {
  constructor(options) {
    this.server = http2.createSecureServer(options, this.request.bind(this));
  }

  request(request, response) {
    console.log(request);
    if (request.path === '/index.html') {
      this.push(response.stream, './bundle1.js');
      this.push(response.stream, './bundle2.js');
    }
  }

  push(stream, filePath) {
    const { file, headers } = getFile(filePath);
    stream.pushStream({ [HTTP2_HEADER_PATH]: filePath }, pushStream => {
      pushStream.respondWithFD(file, headers);
    });
    res.stream.respondWithFD(file.fileDescriptor, file.headers);
  }

  listen() {
    this.server.listen(3000, () => {
      console.log('Server running on localhost:3000');
    });
  }
}

const server = new Server(serverOptions);
server.listen();
