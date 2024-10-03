import http from "http";
import logger from "./logger.js";

export default class Server {
  /**
   * Constructor de la clase Server
   * @param {Object} paths
   * @param {Function} paths.default
   */
  constructor(paths) {
    this.paths = paths;
    this.config = {
      host: process.env.HOST || "localhost",
      port: process.env.PORT || 3000,
    };
    this.server = http.createServer(this.serverFunction.bind(this));
  }

  /**
   * Redirecciona a una URL
   * @param {string} url
   * @param {import("http").ServerResponse} res
   */
  static redirectTo = (url, res) => {
    res.writeHead(302, { Location: url });
    return res.end();
  };

  /**
   * Función principal del servidor
   * @param {import("http").IncomingMessage} req
   * @param {import("http").ServerResponse} res
   * @return {Promise<void>}
   */
  async serverFunction(req, res) {
    const userAgent = req?.headers["user-agent"];

    if (!userAgent) {
      const ip = req?.headers["x-forwarded-for"] || req.socket.remoteAddress;
      logger.error(`No user-agent provided for IP: ${ip}`);

      res.writeHead(400, { "Content-Type": "application/text" });

      return res.end("Bad Request - No User-Agent provided");
    }

    if (this.paths[req.url])
      return await this.paths[req.url]({ req, res, userAgent });

    return await this.paths.default({ req, res, userAgent });
  }

  /**
   * Inicia el servidor
   * @return {void}
   */
  start() {
    this.server.listen(this.config.port, this.config.host, () => {
      logger.info(
        `🚀 Server running at http://${this.config.host}:${this.config.port}/`
      );
    });
  }
}
