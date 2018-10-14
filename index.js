const path = require('path')
const download = require('download')
const execa = require('execa')
const debug = require('debug')('arxiv-to-xml')
const pickLatexFile = require('./lib/pick-latex-file')

const downloadOpts = {
  extract: true
}

module.exports = async function arxivToXML(id, downloadDir) {
  downloadDir = downloadDir || path.resolve(process.cwd(), 'raw/', id)
  const ePrintUrl = `https://arxiv.org/e-print/${id}`
  
  debug(`downloading ${ePrintUrl}`)
  await download(ePrintUrl, `raw/${id}`, downloadOpts)
  debug(`download complete`)

  const texPath = await pickLatexFile(`raw/${id}`)
  debug(`texPath: ${texPath}`)

  const {stdout} = await execa.shell(`latexml ${texPath}`)

  return stdout
}
