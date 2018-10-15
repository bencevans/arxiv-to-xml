# arxiv-to-xml

> Generate XML representation of an arXiv paper using `latexml`.

## Prerequisite

The following is required if running on a host machine. Instead you can use the Docker image - instructions below.

Install texlive

```
sudo apt update
sudo apt install -y texlive-full
```

Install latexml

```
mkdir -p /usr/src/latexml
cd /usr/src/latexml
export LATEXML_COMMIT=9bccfbf633855a2cf9a1c5f03c3ce85c46be4717
curl -L https://github.com/brucemiller/LaTeXML/tarball/$LATEXML_COMMIT | tar --strip-components 1 -zxf - \
    && perl Makefile.PL \
    && make \
    && make install
```

## Docker

### Prebuilt

```
# Pull image
docker pull bencevans/arxiv-to-xml
# Get your XML
docker run --rm bencevans/arxiv-to-xml [arxiv id]
```

### Build your own

```
# Clone repo
git clone https://github.com/bencevans/arxiv-to-xml.git
cd arxiv-to-xml

# Build image
docker build -t arxiv-to-xml .

# Get your XML
docker run arxiv-to-xml [arxiv id]
```

## Nodejs

### Command line interface

Ensure you've installed a latex suite and latexml.

```
# Install from npm
npm install --global arxiv-to-xml

# Get your XML
arxiv-to-xml [arxiv id]
```

### Library

Ensure you've installed a latex suite and latexml.

```
# Install from npm
npm install --save arxiv-to-xml
```

```js
const arxivToXML = require('arxiv-to-xml')

arxivToXML(arxivId)
  .then(xml => console.log(xml))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
```

## Licence

MIT © [Ben Evans](https://bencevans.io)
