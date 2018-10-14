const fs = require('fs-extra')
const path = require('path')

/**
 * Pick Latex File
 * https://github.com/arxiv-vanity/engrafo
 */
module.exports = async function pickLatexFile(dir) {
  if (dir.endsWith(".tex")) {
    return dir;
  }
  const files = await fs.readdir(dir);
  if (files.includes("ms.tex")) {
    return path.join(dir, "ms.tex");
  }
  if (files.includes("main.tex")) {
    return path.join(dir, "main.tex");
  }
  const texPaths = files.filter(f => f.endsWith(".tex"));
  if (texPaths.length === 0) {
    throw new Error("No .tex files found");
  }
  if (texPaths.length === 1) {
    return path.join(dir, texPaths[0]);
  }
  let docCandidates = [];
  for (let p of texPaths) {
    let data = await fs.readFile(path.join(dir, p));
    if (data && data.includes("\\documentclass")) {
      docCandidates.push(p);
    }
  }
  if (docCandidates.length === 0) {
    throw new Error("No .tex files with \\documentclass found");
  }
  
  if (docCandidates.length === 1) {
    return path.join(dir, docCandidates[0]);
  }
  
  let bblCandidates = [];
  for (let p of docCandidates) {
    let bbl = p.replace(".tex", ".bbl");
    if (await fs.pathExists(path.join(dir, bbl))) {
      bblCandidates.push(p);
    }
  }
  
  if (bblCandidates.length > 1) {
    throw new Error(`Ambiguous LaTeX path (${bblCandidates.length} candidates)`);
  }
  return bblCandidates[0];
}
