FROM node:9

MAINTAINER David Dooling <david@atomist.com>

ENV DUMB_INIT_VERSION=1.2.1

RUN curl -s -L -O https://github.com/Yelp/dumb-init/releases/download/v$DUMB_INIT_VERSION/dumb-init_${DUMB_INIT_VERSION}_amd64.deb \
    && dpkg -i dumb-init_${DUMB_INIT_VERSION}_amd64.deb \
    && rm -f dumb-init_${DUMB_INIT_VERSION}_amd64.deb

RUN apt-get -y update && apt-get install -y \
    graphviz

RUN mkdir -p /opt/app

WORKDIR /opt/app

EXPOSE 3000

ENV NPM_CONFIG_LOGLEVEL warn

ENV SUPPRESS_NO_CONFIG_WARNING true

ENTRYPOINT ["dumb-init", "node", "--trace-warnings", "--expose_gc", "--optimize_for_size", "--always_compact", "--max_old_space_size=768"]

CMD ["./bin/www"]

RUN  git config --global user.email "bot@atomist.com" && git config --global user.name "Atomist Bot"

COPY . .

RUN npm install --only=production
