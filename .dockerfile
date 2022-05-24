ARG NODEJS_VERSION=16.15

FROM node:${NODEJS_VERSION}

# Set Environment Variables
ENV DEBIAN_FRONTEND noninteractive

COPY .bashrc /root/.bashrc

# always run apt update when start and after add new source list, then clean up at end.
RUN apt update -y \
    && apt upgrade -y \
    && apt install -y --no-install-recommends \
    apt-transport-https \
    apt-utils \
    bash-completion \
    ca-certificates \
    curl \
    git \
    locales \
    unzip

RUN npm install -g npm

RUN npm install -g postcss postcss-cli

ARG HUGO_VERSION
ENV HUGO_VERSION ${HUGO_VERSION}

ARG HUGO_CHECKSUM
ENV HUGO_CHECKSUM ${HUGO_CHECKSUM}

RUN curl -L -o hugo.tar.gz "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz" \
    && echo "$HUGO_CHECKSUM  hugo.tar.gz" | sha256sum -c \
    && tar xzvf hugo.tar.gz && cp ./hugo /usr/bin/hugo \
    && hugo version

COPY ./.locale /etc/locale.gen

# Clean up
RUN locale-gen && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/log/lastlog /var/log/faillog

VOLUME /var/www

WORKDIR /var/www

CMD ["hugo", "server"]