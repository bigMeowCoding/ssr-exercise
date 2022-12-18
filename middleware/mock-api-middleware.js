import glob from "glob";
import path from "path";

import { fileURLToPath } from "url";
import { pathToRegexp } from "path-to-regexp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function createMockMiddle(mockDir, options) {
  const mockAbsolutePath = mockDir;

  return function mockMiddle(req, res, next) {
    mathMock(req).then((math) => {
      if (math) {
        return math.handler(req, res, next);
      } else {
        next();
      }
    });
  };
  async function mathMock(req) {
    const mockData = await makeConfig();
    const targetMethod = req.method.toLowerCase();
    const targetPath = req.path;
    for (const mock of mockData) {
      const { method, re, keys } = mock;
      if (method === targetMethod) {
        const match = re.exec(targetPath);
        if (match) {
          return mock;
        }
      }
    }
  }
  async function makeConfig() {
    const mockFiles = glob
      .sync("**/*.js", {
        cwd: mockAbsolutePath,
      })
      .map((d) => path.join(mockDir, d));
    let ret = {};
    console.log(mockFiles);

    for (const f of mockFiles) {
      const r = await import(f);
      ret = Object.assign({}, ret, r.default || r);
    }
    return normalizeConfig(ret);
  }

  function normalizeConfig(config) {
    console.log(config);
    return Object.keys(config).reduce((memo, key) => {
      const { method, path } = parseKey(key);
      const keys = [];
      const pathOptions = {
        whitelist: ["%"], // treat %3A as regular chars
      };
      const re = pathToRegexp(path, keys, pathOptions);

      memo.push({
        method,
        path,
        re,
        handler: (req, res, handle) => {
          return res.json(config[key]);
        },
      });
      return memo;
    }, []);
    function parseKey(key) {
      let method = "get",
        path = key;
      if (key.indexOf(" ") > -1) {
        const splited = key.split(/\s+/);
        if (splited[0]) {
          method = splited[0].toLowerCase();
        }
        if (splited[1]) {
          path = splited[1];
        }
      }
      return {
        method,
        path,
      };
    }
  }
}
console.log(path.resolve(__dirname, "mock"));
