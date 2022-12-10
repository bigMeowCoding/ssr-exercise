import express from "express";
import { createSSRApp } from "vue";
// Vue's server-rendering API is exposed under `vue/server-renderer`.
import { renderToString } from "vue/server-renderer";
import { createApp } from "./app.js";
const server = express();

server.get("/", function (req, res) {
  renderToString(createApp()).then((html) => {
    res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
          }
        </script>
        <script type="module" src="/client.js"></script>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `);
  });
});

server.use(express.static('.'));

server.listen(8888, () => {
  console.log("listen8888");
});
