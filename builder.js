import fs from "fs";
import path from "path";

const componentsDir = "./components";
const outDir = "./dist";
const outFile = path.join(outDir, "nova-ui.js");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
  console.log("✔ Dist/ folder created automatically");
}

const files = fs.readdirSync(componentsDir).filter(f => f.endsWith(".js"));

let content = "// AUTO-GENERATED NOVAUI\n\n";

files.forEach(f => {
  const code = fs.readFileSync(path.join(componentsDir, f), "utf-8");
  content += `\n// --- ${f} ---\n${code}\n`;
});

fs.writeFileSync(outFile, content);
console.log("✔ NovaUI build finished!");
