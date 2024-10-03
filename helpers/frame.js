import { Readable } from "stream";
import fs from "fs/promises";

export default class Frame {
  /**
   * constructor de la clase Frame
   * @param {string} folder
   * @param {number} fps
   */
  constructor(folder, fps = 10) {
    this.load(folder);
    this.fps = fps;
  }

  /**
   * Carga los frames de un directorio
   * @param {string} folder
   * @return {Promise<void>}
   */
  async load(folder) {
    const files = await fs.readdir(folder);

    const frames = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(`${folder}/${file}`, "utf-8");
        return content.toString();
      })
    );

    this.frames = frames;
  }

  /**
   * Inicia el streamer con los frames cargados
   * @param {Array<string>} frames
   * @return {number}
   */
  streamer() {
    let index = 0;
    let interval = 1000 / this.fps;

    return setInterval(() => {
      // clear the console
      this.stream.push("\x1b[2J\x1b[3J\x1b[H");

      // print the current frame
      this.stream.push(this.frames[index]);

      index = (index + 1) % this.frames.length;
    }, interval);
  }

  /**
   * Inicia el streamer y envía los frames al cliente
   * @param {import("http").IncomingMessage} req
   * @param {import("http").ServerResponse} res
   * @return {Promise<void>}
   */
  async run(req, res) {
    this.stream = new Readable();
    this.stream._read = () => {};
    const interval = await this.streamer();
    this.stream.pipe(res);

    req.on("close", () => {
      clearInterval(interval);
      this.stream.destroy();
    });
  }
}
