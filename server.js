import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createViteServer } from "vite";
import httpProxy from "http-proxy-middleware";
const proxy = httpProxy.createProxyMiddleware;

// import mock from "express-mock-api-middleware";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === "development";
async function createServer() {
  const app = express();

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // use vite's connect instance as middleware
  // if you use your own express router (express.Router()), you should use router.use
  app.use(vite.middlewares);
  // app.use(express.static("./dist"));
  // const mockApiMiddleware = mock(path.resolve(__dirname, "mock"), {
  //   ignore: ["asm.js"],
  // });
  app.use("/", (req, res, next) => {
    if (req.path === "/api3/test") {
      res.send({ code: "412", msg: "mock" });
    }
    console.log("req", req.path);
    next();
  });
  app.use(
    "/api3",
    proxy({
      target: "http://localhost:3333",
      changeOrigin: true,
      pathRewrite: {
        "^/api3": "/", // rewrite path
      },
    })
  );

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(
          __dirname,
          isDev ? "index.html" : "./dist/client/index.html"
        ),
        "utf-8"
      );

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      let render = null;
      if (isDev) {
        const ret = await vite.ssrLoadModule("/src/entry-server.js");
        render = ret.render;
      } else {
        const ret = await import("./dist/server/entry-server.js");
        console.log("sdfdf", ret);
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
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173);
}

createServer();
