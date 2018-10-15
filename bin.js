const latexToXML = require('.')

const main = async (argv) => {
  const id = argv[2]

  if (!id) {
    throw new Error('missing id')
  }

  const xml = await latexToXML(id)

  console.log(xml)
}

main(process.argv)
  .then(code => process.exit(code))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
