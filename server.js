import { createServer } from "http";
import { spawn } from "child_process";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Xray running on Cloudflare Pages\n");
});

// Jalankan Xray binary (pastikan file "xray" ada di root)
const xray = spawn("./xray", ["-config", "config.json"]);

xray.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});
xray.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});
xray.on("close", (code) => {
  console.log(`Xray process exited with code ${code}`);
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
