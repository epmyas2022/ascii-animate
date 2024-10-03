import Frame from "./helpers/frame.js";
import Server from "./helpers/server.js";

const frames = {
  banner: new Frame("./frames/banner", 3),
  moster: new Frame("./frames/moster", 15),
  car: new Frame("./frames/car", 5),
  pyramid: new Frame("./frames/pyramid", 5),
  parrot: new Frame("./frames/parrot", 20),
};

const paths = {
  "/healthcheck": async ({ res }) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok" }));
  },

  default: async ({ res, userAgent, req }) => {
    if (!userAgent?.includes("curl"))
      return Server.redirectTo("https://github.com/epmyas2022", res);

    const frame = frames[req.url.slice(1)] || frames.moster;

    await frame.run(req, res);
  },
};

const server = new Server(paths);

server.start();
