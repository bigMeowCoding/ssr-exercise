import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createViteServer } from "vite";
// import httpProxy from "http-proxy-middleware";
// import createMockMiddle from "./middleware/mock-api-middleware.js";

// const proxy = httpProxy.createProxyMiddleware;

// import mock from "express-mock-api-middleware";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === "development";
const resolve = (p) => path.resolve(__dirname, p);

const port = 5173;

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  let vite = null;
  if (isDev) {
    vite = await createViteServer({
      base:'/test/',
      server: { middlewareMode: true },
      appType: "custom",
    });
    // const mockMiddleWare = createMockMiddle(
    //   path.resolve(__dirname, "mock"),
    //   {}
    // );
    // use vite's connect instance as middleware
    // if you use your own express router (express.Router()), you should use router.use
    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      "/test/",
      (await import("serve-static")).default(resolve("dist/client"), {
        index: false,
      })
    );
  }

  // app.use(express.static("./dist"));
  // const mockApiMiddleware = mock(path.resolve(__dirname, "mock"), {
  //   ignore: ["asm.js"],
  // });
  // app.use("/", mockMiddleWare);
  // app.use(
  //   "/api3",
  //   proxy({
  //     target: "http://localhost:3333",
  //     changeOrigin: true,
  //     pathRewrite: {
  //       "^/api3": "/", // rewrite path
  //     },
  //   })
  // );

  app.use("*", async (req, res) => {
    const url = req.originalUrl.replace("/test/", "/");

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(
          __dirname,
          isDev ? "index.html" : "./dist/client/index.html"
        ),
        "utf-8"
      );

      let render;
      if (isDev) {
        template = await vite.transformIndexHtml(url, template);
        const ret = await vite.ssrLoadModule("/src/entry-server.js");
        render = ret.render;
      } else {
        const ret = await import("./dist/server/entry-server.js");
        render = ret.render;
      }

      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render(url);
      console.log(appHtml);
      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(port, () => {
    console.log(`http://localhost:${port}`)

  });
}

createServer();
