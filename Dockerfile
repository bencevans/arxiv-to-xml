FROM node:8

RUN apt-get update -qq && apt-get install -qy texlive-full

RUN apt-get update -qq && apt-get install -y latexml

RUN apt-get install -yq libarchive-zip-perl libfile-which-perl libimage-size-perl  \
    libio-string-perl libjson-xs-perl libtext-unidecode-perl \
    libparse-recdescent-perl liburi-perl libuuid-tiny-perl libwww-perl \
    libxml2 libxml-libxml-perl libxslt1.1 libxml-libxslt-perl  \
    imagemagick libimage-magick-perl perl-doc build-essential \
&& rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/latexml
WORKDIR /usr/src/latexml
ENV LATEXML_COMMIT=9bccfbf633855a2cf9a1c5f03c3ce85c46be4717
RUN curl -L https://github.com/brucemiller/LaTeXML/tarball/$LATEXML_COMMIT | tar --strip-components 1 -zxf - \
    && perl Makefile.PL \
    && make \
&& make install

ADD . /src

WORKDIR /src

RUN [ "npm", "install" ]

ENTRYPOINT [ "node", "bin.js" ]