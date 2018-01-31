############################################################
# Dockerfile to build sandbox for executing user code
# Based on Ubuntu
############################################################

FROM chug/ubuntu14.04x64 
MAINTAINER ASAD MEMON, OSMAN ALI

# Update the repository sources list
RUN echo "deb http://us-east-1.ec2.archive.ubuntu.com/ubuntu trusty main universe" > /etc/apt/sources.list
RUN apt-get update
#RUN apt-get upgrade
#Install all the languages/compilers we are supporting.
RUN apt-get install -y gcc
RUN apt-get install -y g++
RUN apt-get install -y php5-cli
RUN apt-get install -y ruby2.0
RUN apt-get install -y ruby-activesupport-4.0
RUN apt-get install -y python
RUN apt-get install -y mono-xsp2 mono-xsp2-base

RUN apt-get install -y mono-vbnc
RUN apt-get install -y npm
RUN apt-get install -y golang-go	
RUN apt-get install -y nodejs

RUN npm install -g underscore request express jade shelljs passport http sys jquery lodash async mocha moment connect validator restify ejs ws co when helmet wrench brain mustache should backbone forever  debug && export NODE_PATH=/usr/local/lib/node_modules/

RUN apt-get install -y clojure1.4


#prepare for Java download
RUN apt-get install -y python-software-properties
RUN apt-get install -y software-properties-common

#grab oracle java (auto accept licence)
RUN add-apt-repository -y ppa:webupd8team/java
RUN apt-get update
RUN echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
RUN apt-get install -y oracle-java8-installer


RUN apt-get install -y gobjc
RUN apt-get install -y gnustep-devel &&  sed -i 's/#define BASE_NATIVE_OBJC_EXCEPTIONS     1/#define BASE_NATIVE_OBJC_EXCEPTIONS     0/g' /usr/include/GNUstep/GNUstepBase/GSConfig.h

RUN apt-get -y install libjansi-native-java  libhawtjni-runtime-java libjansi-java
RUN wget http://www.scala-lang.org/files/archive/scala-2.10.4.deb
RUN dpkg -i scala-2.10.4.deb

RUN apt-get install -y mysql-server
RUN apt-get install -y perl

RUN apt-get install -y sudo
RUN apt-get install -y bc

RUN apt-get install -y curl
RUN mkdir -p /opt/rust && \
    curl https://sh.rustup.rs -sSf | HOME=/opt/rust sh -s -- --no-modify-path -y && \
    chmod -R 777 /opt/rust

RUN apt-get install -y clang libicu-dev git cmake ninja-build python uuid-dev icu-devtools libbsd-dev libedit-dev libxml2-dev libsqlite3-dev swig libpython-dev libncurses5-dev pkg-config
RUN mkdir -p /opt/swift && chmod -R 777 /opt/swift
RUN cd /opt/swift && wget https://swift.org/builds/swift-4.0.3-release/ubuntu1404/swift-4.0.3-RELEASE/swift-4.0.3-RELEASE-ubuntu14.04.tar.gz && tar xzf swift-4.0.3-RELEASE-ubuntu14.04.tar.gz
RUN chmod -R 777 /opt/swift

RUN apt-get install -y python-numpy python-scipy python-pandas
RUN echo "deb http://cran.rstudio.com/bin/linux/ubuntu trusty/" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y --force-yes r-base

RUN apt-get install -y python3-numpy python3-scipy python3-pandas
RUN echo "mysql ALL = NOPASSWD: /usr/sbin/service mysql start" | cat >> /etc/sudoers

# Lots 'o langauges
#
# This is a lot of text
# to demarcate the start
# of a long sequence of
# commands to install
# many, many languages

RUN apt-get install -y gnat
RUN apt-get install -y open-cobol
RUN npm install -g coffee-script
RUN npm install -g naheui
RUN apt-get install -y algol68g
RUN apt-get install -y clisp
RUN apt-get install -y gdc
RUN apt-get install -y emacs
RUN apt-get install -y gfortran
RUN apt-get install -y fsharp
RUN apt-get install -y julia # also installed below, just in case
RUN apt-get install -y ocaml

# Many package names were taken from
# https://github.com/nacyot/docker-programming-languages

# "Long form" languages:

# D Language
# https://github.com/lega911/dlang-docker/blob/master/Dockerfile

RUN apt-get update && apt-get install -y wget
RUN wget http://netcologne.dl.sourceforge.net/project/d-apt/files/d-apt.list -O /etc/apt/sources.list.d/d-apt.list
RUN apt-get update && apt-get -y --allow-unauthenticated install --reinstall d-apt-keyring && apt-get update \
    && apt-get install -y dmd-bin dub libcurl3-gnutls libevent-dev libcrypto++-dev libssl-dev

# Erlang
# https://github.com/c0b/docker-erlang-otp/blob/f6606389b995d24dce8933e4ca4d6d46fce8612b/20/Dockerfile

ENV OTP_VERSION="20.2.2"

# We'll install the build dependencies for erlang-odbc along with the erlang
# build process:
RUN set -xe \
    && OTP_DOWNLOAD_URL="https://github.com/erlang/otp/archive/OTP-${OTP_VERSION}.tar.gz" \
    && OTP_DOWNLOAD_SHA256="7614a06964fc5022ea4922603ca4bf1d2cc241f9bd6b7321314f510fd74c7304" \
    && runtimeDeps='libodbc1 \
            libsctp1 \
            libwxgtk3.0' \
    && buildDeps='unixodbc-dev \
            libsctp-dev \
            libwxgtk3.0-dev' \
    && apt-get update \
    && apt-get install -y --no-install-recommends $runtimeDeps \
    && apt-get install -y --no-install-recommends $buildDeps \
    && curl -fSL -o otp-src.tar.gz "$OTP_DOWNLOAD_URL" \
    && echo "$OTP_DOWNLOAD_SHA256  otp-src.tar.gz" | sha256sum -c - \
    && export ERL_TOP="/usr/src/otp_src_${OTP_VERSION%%@*}" \
    && mkdir -vp $ERL_TOP \
    && tar -xzf otp-src.tar.gz -C $ERL_TOP --strip-components=1 \
    && rm otp-src.tar.gz \
    && ( cd $ERL_TOP \
      && ./otp_build autoconf \
      && gnuArch="$(dpkg-architecture --query DEB_BUILD_GNU_TYPE)" \
      && ./configure --build="$gnuArch" \
      && make -j$(nproc) \
      && make install ) \
    && find /usr/local -name examples | xargs rm -rf \
    && apt-get purge -y --auto-remove $buildDeps \
    && rm -rf $ERL_TOP /var/lib/apt/lists/*

# Remove "CMD" command:
# CMD ["erl"]

# extra useful tools here: rebar & rebar3

ENV REBAR_VERSION="2.6.4"

RUN set -xe \
    && REBAR_DOWNLOAD_URL="https://github.com/rebar/rebar/archive/${REBAR_VERSION}.tar.gz" \
    && REBAR_DOWNLOAD_SHA256="577246bafa2eb2b2c3f1d0c157408650446884555bf87901508ce71d5cc0bd07" \
    && mkdir -p /usr/src/rebar-src \
    && curl -fSL -o rebar-src.tar.gz "$REBAR_DOWNLOAD_URL" \
    && echo "$REBAR_DOWNLOAD_SHA256 rebar-src.tar.gz" | sha256sum -c - \
    && tar -xzf rebar-src.tar.gz -C /usr/src/rebar-src --strip-components=1 \
    && rm rebar-src.tar.gz \
    && cd /usr/src/rebar-src \
    && ./bootstrap \
    && install -v ./rebar /usr/local/bin/ \
    && rm -rf /usr/src/rebar-src

ENV REBAR3_VERSION="3.5.0"

RUN set -xe \
    && REBAR3_DOWNLOAD_URL="https://github.com/erlang/rebar3/archive/${REBAR3_VERSION}.tar.gz" \
    && REBAR3_DOWNLOAD_SHA256="e95e9d1f2ce219f548d4f49ad41409af02069190f19e2b6717585eef6ee77501" \
    && mkdir -p /usr/src/rebar3-src \
    && curl -fSL -o rebar3-src.tar.gz "$REBAR3_DOWNLOAD_URL" \
    && echo "$REBAR3_DOWNLOAD_SHA256 rebar3-src.tar.gz" | sha256sum -c - \
    && tar -xzf rebar3-src.tar.gz -C /usr/src/rebar3-src --strip-components=1 \
    && rm rebar3-src.tar.gz \
    && cd /usr/src/rebar3-src \
    && HOME=$PWD ./bootstrap \
    && install -v ./rebar3 /usr/local/bin/ \
    && rm -rf /usr/src/rebar3-src

# Elixir

# elixir expects utf8.
ENV ELIXIR_VERSION="v1.6.1" \
    LANG=C.UTF-8

RUN set -xe \
    && ELIXIR_DOWNLOAD_URL="https://github.com/elixir-lang/elixir/archive/${ELIXIR_VERSION}.tar.gz" \
    && ELIXIR_DOWNLOAD_SHA256="91109a1774e9040fb10c1692c146c3e5a102e621e9c48196bfea7b828d54544c" \
    && curl -fSL -o elixir-src.tar.gz $ELIXIR_DOWNLOAD_URL \
    && echo "$ELIXIR_DOWNLOAD_SHA256  elixir-src.tar.gz" | sha256sum -c - \
    && mkdir -p /usr/local/src/elixir \
    && tar -xzC /usr/local/src/elixir --strip-components=1 -f elixir-src.tar.gz \
    && rm elixir-src.tar.gz \
    && cd /usr/local/src/elixir \

# Groovy
# https://github.com/groovy/docker-groovy/blob/c13d906a07bf733c18c7607f1bf1a4b12601a26e/jdk7/Dockerfile

# Remove "CMD" command:
# CMD ["groovysh"]

ENV GROOVY_HOME /opt/groovy
ENV GROOVY_VERSION 2.4.13

RUN set -o errexit -o nounset \
    && echo "Downloading Groovy" \
    && wget --no-verbose --output-document=groovy.zip "https://dist.apache.org/repos/dist/release/groovy/${GROOVY_VERSION}/distribution/apache-groovy-binary-${GROOVY_VERSION}.zip" \
    \
    && echo "Importing keys listed in http://www.apache.org/dist/groovy/KEYS from key server" \
    && export GNUPGHOME="$(mktemp -d)" \
    && for key in \
        "7FAA0F2206DE228F0DB01AD741321490758AAD6F" \
        "331224E1D7BE883D16E8A685825C06C827AF6B66" \
        "34441E504A937F43EB0DAEF96A65176A0FB1CD0B" \
        "9A810E3B766E089FFB27C70F11B595CEDC4AEBB5" \
        "81CABC23EECA0790E8989B361FF96E10F0E13706" \
    ; do \
        for server in \
            "ha.pool.sks-keyservers.net" \
            "hkp://p80.pool.sks-keyservers.net:80" \
            "pgp.mit.edu" \
        ; do \
            echo "  Trying ${server}"; \
            if gpg --keyserver "${server}" --recv-keys "${key}"; then \
                break; \
            fi; \
        done; \
    done; \
    if [ $(gpg --list-keys | grep -c "pub ") -ne 5 ]; then \
        echo "ERROR: Failed to fetch GPG keys" >&2; \
        exit 1; \
    fi \
    \
    && echo "Checking download signature" \
    && wget --no-verbose --output-document=groovy.zip.asc "https://dist.apache.org/repos/dist/release/groovy/${GROOVY_VERSION}/distribution/apache-groovy-binary-${GROOVY_VERSION}.zip.asc" \
    && gpg --batch --verify groovy.zip.asc groovy.zip \
    && rm --recursive --force "${GNUPGHOME}" \
    && rm groovy.zip.asc \
    \
    && echo "Installing Groovy" \
    && unzip groovy.zip \
    && rm groovy.zip \
    && mv "groovy-${GROOVY_VERSION}" "${GROOVY_HOME}/" \
    && ln --symbolic "${GROOVY_HOME}/bin/grape" /usr/bin/grape \
    && ln --symbolic "${GROOVY_HOME}/bin/groovy" /usr/bin/groovy \
    && ln --symbolic "${GROOVY_HOME}/bin/groovyc" /usr/bin/groovyc \
    && ln --symbolic "${GROOVY_HOME}/bin/groovyConsole" /usr/bin/groovyConsole \
    && ln --symbolic "${GROOVY_HOME}/bin/groovydoc" /usr/bin/groovydoc \
    && ln --symbolic "${GROOVY_HOME}/bin/groovysh" /usr/bin/groovysh \
    && ln --symbolic "${GROOVY_HOME}/bin/java2groovy" /usr/bin/java2groovy \
    \
    && echo "Adding groovy user and group" \
    && groupadd --system --gid 1000 groovy \
    && useradd --system --gid groovy --uid 1000 --shell /bin/bash --create-home groovy \
    && mkdir --parents /home/groovy/.groovy/grapes \
    && chown --recursive groovy:groovy /home/groovy \
    \
    && echo "Symlinking root .groovy to groovy .groovy" \
    && ln -s /home/groovy/.groovy /root/.groovy

# Create Grapes volume
USER groovy
VOLUME "/home/groovy/.groovy/grapes"
WORKDIR /home/groovy

RUN set -o errexit -o nounset \
    && echo "Testing Groovy installation" \
    && groovy --version

# Hack (hhvm)

ARG HHVM_PACKAGE
ENV HHVM_DISABLE_NUMA true

RUN \
  apt-get update -y && apt-get install -y software-properties-common apt-transport-https \
  && apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0x5a16e7281be7a449 \
  && apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xB4112585D386EB94 \
  && add-apt-repository "deb https://s3-us-west-2.amazonaws.com/hhvm-downloads/ubuntu xenial main" \
  && apt-get update -y \
  && apt-get install -y ${HHVM_PACKAGE} git wget curl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  && sed -i 's,s3-us-west-2.amazonaws.com/hhvm-downloads/,dl2.hhvm.com/,' /etc/apt/sources.list

# Haskell
# https://github.com/freebroccolo/docker-haskell/blob/ea501abb24273d6dab3121bb6373f6903f1a3c71/8.2/Dockerfile

ENV LANG            C.UTF-8

RUN echo 'deb http://ppa.launchpad.net/hvr/ghc/ubuntu trusty main' > /etc/apt/sources.list.d/ghc.list && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys F6F88286 && \
    apt-get update && \
    apt-get install -y --no-install-recommends cabal-install-2.0 ghc-8.2.1 happy-1.19.5 alex-3.1.7 \
            zlib1g-dev libtinfo-dev libsqlite3-0 libsqlite3-dev ca-certificates g++ git curl && \
    curl -fSL https://github.com/commercialhaskell/stack/releases/download/v1.5.1/stack-1.5.1-linux-x86_64-static.tar.gz -o stack.tar.gz && \
    curl -fSL https://github.com/commercialhaskell/stack/releases/download/v1.5.1/stack-1.5.1-linux-x86_64-static.tar.gz.asc -o stack.tar.gz.asc && \
    apt-get purge -y --auto-remove curl && \
    export GNUPGHOME="$(mktemp -d)" && \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys C5705533DA4F78D8664B5DC0575159689BEFB442 && \
    gpg --batch --verify stack.tar.gz.asc stack.tar.gz && \
    tar -xf stack.tar.gz -C /usr/local/bin --strip-components=1 && \
    /usr/local/bin/stack config set system-ghc --global true && \
    rm -rf "$GNUPGHOME" /var/lib/apt/lists/* /stack.tar.gz.asc /stack.tar.gz

ENV PATH /root/.cabal/bin:/root/.local/bin:/opt/cabal/2.0/bin:/opt/ghc/8.2.1/bin:/opt/happy/1.19.5/bin:/opt/alex/3.1.7/bin:$PATH

# Julia

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
    && rm -rf /var/lib/apt/lists/*

ENV JULIA_PATH /usr/local/julia

# https://julialang.org/juliareleases.asc
# Julia (Binary signing key) <buildbot@julialang.org>
ENV JULIA_GPG 3673DF529D9049477F76B37566E3C7DC03D6E495

# https://julialang.org/downloads/
ENV JULIA_VERSION 0.6.2

RUN set -ex; \
    \
# https://julialang.org/downloads/#julia-command-line-version
# https://julialang-s3.julialang.org/bin/checksums/julia-0.6.2.sha256
# this "case" statement is generated via "update.sh"
    dpkgArch="$(dpkg --print-architecture)"; \
    case "${dpkgArch##*-}" in \
        amd64) tarArch='x86_64'; dirArch='x64'; sha256='dc6ec0b13551ce78083a5849268b20684421d46a7ec46b17ec1fab88a5078580' ;; \
        armhf) tarArch='armv7l'; dirArch='armv7l'; sha256='1c37aa7cba7372d949a91de53f53609b1b0c9cbeca436eb2fe7f5083d9f62c82' ;; \
        arm64) tarArch='aarch64'; dirArch='aarch64'; sha256='19a8945bdb3d35b7bf0432a9e066fb7831d11d1c1acfe56abd8fcabbf1ebddb4' ;; \
        i386) tarArch='i686'; dirArch='x86'; sha256='099e39ad958aff2ef63841a812f5df62f8553aafc6dd33abb0eb0c67142c5e49' ;; \
        *) echo >&2 "error: current architecture ($dpkgArch) does not have a corresponding Julia binary release"; exit 1 ;; \
    esac; \
    \
    curl -fL -o julia.tar.gz     "https://julialang-s3.julialang.org/bin/linux/${dirArch}/${JULIA_VERSION%[.-]*}/julia-${JULIA_VERSION}-linux-${tarArch}.tar.gz"; \
    curl -fL -o julia.tar.gz.asc "https://julialang-s3.julialang.org/bin/linux/${dirArch}/${JULIA_VERSION%[.-]*}/julia-${JULIA_VERSION}-linux-${tarArch}.tar.gz.asc"; \
    \
    echo "${sha256} *julia.tar.gz" | sha256sum -c -; \
    \
    export GNUPGHOME="$(mktemp -d)"; \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$JULIA_GPG"; \
    gpg --batch --verify julia.tar.gz.asc julia.tar.gz; \
    rm -rf "$GNUPGHOME" julia.tar.gz.asc; \
    \
    mkdir "$JULIA_PATH"; \
    tar -xzf julia.tar.gz -C "$JULIA_PATH" --strip-components 1; \
    rm julia.tar.gz

ENV PATH $JULIA_PATH/bin:$PATH

# Kotlin
# https://hub.docker.com/r/rayyildiz/kotlin/~/dockerfile/

LABEL       KOTLIN_VERSION="1.2.10"

ENV         KOTLIN_VERSION=1.2.10 \
            KOTLIN_HOME=/usr/local/kotlin

RUN         apk update && \
            apk add ca-certificates && \
            update-ca-certificates && \
            apk add openssl wget bash

RUN         cd  /tmp && \
            wget -k "https://github.com/JetBrains/kotlin/releases/download/v${KOTLIN_VERSION}/kotlin-compiler-${KOTLIN_VERSION}.zip"  && \
            unzip "kotlin-compiler-${KOTLIN_VERSION}.zip" && \
            mkdir -p "${KOTLIN_HOME}" && \
            mv "/tmp/kotlinc/bin" "/tmp/kotlinc/lib" "${KOTLIN_HOME}" && \
            rm ${KOTLIN_HOME}/bin/*.bat && \
            chmod +x ${KOTLIN_HOME}/bin/* && \
            ln -s "${KOTLIN_HOME}/bin/"* "/usr/bin/" && \
            apk del wget ca-certificates curl openssl && \
            rm -rf /tmp/* /var/cache/apk/*

# Logo

RUN apt-get install -y kturtle
RUN bash -c 'echo "kturtle -i /source/hello_world.logo" >> /root/.zshrc'

# Lua
# https://github.com/mhndev/docker-lua/blob/master/Dockerfile

ENV lua_verision  5.3.4
ENV luarocks_version 2.4.1
ENV needed_modules "kong lua-cjson"


# install essential packages for building other packages

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
        curl \
        wget \
        build-essential \
        make \
        gcc \
        mingw-w64 \
        libreadline-dev \
        ca-certificates \
        unzip \
        libssl-dev \
        git \
--no-install-recommends && rm -r /var/lib/apt/lists/*


# build lua

RUN \
wget http://www.lua.org/ftp/lua-${lua_verision}.tar.gz && \
tar xf lua-${lua_verision}.tar.gz && \
cd lua-${lua_verision} && \
#./configure --prefix=/opt/apps/lua/${lua_verision} && \
make linux && \

ln -s /lua-${lua_verision}/src/lua /usr/bin/lua


# build luarocks

RUN \
wget https://luarocks.org/releases/luarocks-${luarocks_version}.tar.gz && \
tar zxpf luarocks-${luarocks_version}.tar.gz  && \
cd luarocks-${luarocks_version}  && \
./configure --with-lua-include=/lua-${lua_verision}/src/ ; make bootstrap   && \
luarocks install luasocket

# Remove unneccessary packages (packages just needed for building image)

RUN apt-get remove --purge -y \
    wget \
    make \
    build-essential \
    libreadline-dev \
    ca-certificates \
    mingw-w64 && \

    apt-get autoremove -y

COPY ["./commands/*.sh", "/docker/bin/"]

RUN chmod a+x /docker/bin/*.sh \
    && ln -s /docker/bin/install-module.sh /usr/local/bin/install-module


# code which is running bellow
#
# if [ ! -z ${needed_modules} ] ;
#    then
#        for i in ${needed_modules}; do
#            luarocks install "$i";
#        done ;
#    else echo "no modules needed, so no module installed";
# fi

RUN if[[ ! -z ${needed_modules} ]] ; then for i in ${needed_modules}; do luarocks install $i; done ; else echo "no modules needed, so no module installed" ; fi

# Luna

RUN apt-get install -y clang

# Install luna
RUN git clone https://github.com/luna/luna.git /opt/luna
WORKDIR /opt/luna
RUN git checkout 7ae49600ee486bd68
RUN make

# Create symbolic link
RUN bash -c "ln -s /opt/luna/luna /usr/local/bin/"

# Octave

ENV DEBIAN_FRONTEND noninteractive

apt-get install -y software-properties-common
apt-get install -y octave
apt-get remove -y software-properties-common

# cleanup package manager
apt-get autoclean && apt-get clean
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Opal

RUN apt-get update
RUN apt-get install -y nodejs npm 
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN apt-get install -y libssl-dev libfontconfig1-dev
RUN npm install -g phantomjs

RUN gem install opal

# Pascal
# https://github.com/nacyot/docker-programming-languages/blob/master/pascal-fp_compiler-apt/Dockerfile

RUN apt-get install -y fp-compiler

# Prolog
# https://github.com/nacyot/docker-programming-languages/blob/master/prolog-gnu-apt/Dockerfile

# Racket

RUN apt-get update && \
    apt-get install -y wget sqlite3 ca-certificates openssl && \
    rm -rf /var/lib/apt/lists/*

ARG RACKET_INSTALLER_URL
ARG RACKET_VERSION

RUN wget --output-document=racket-install.sh -q $RACKET_INSTALLER_URL && \
    echo "yes\n1\n" | /bin/bash racket-install.sh && \
    rm racket-install.sh

RUN raco setup
RUN raco pkg config --set catalogs "https://download.racket-lang.org/releases/$RACKET_VERSION/catalog/" "https://pkg-build.racket-lang.org/server/built/catalog/" "https://pkgs.racket-lang.org" "https://planet-compats.racket-lang.org"

RUN apt-get install -y gprolog

# Smalltalk
# https://github.com/nacyot/docker-programming-languages/blob/master/smalltalk-gnu-apt/Dockerfile#L5

RUN apt-get install -y gnu-smalltalk

# Tcl

ENV DEBIAN_FRONTEND noninteractive

# Update underlying ubuntu image and all necessary packages.
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y tcl8.6 \
            tcllib \
            tcl-thread \
            tcl-tclreadline \
            tcl-tls \
            tcl-trf \
            tcl-udp \
            tcl-vfs \
            tclcurl \
            tclgeoip \
            tclodbc \
            tclxml \
            tdom \
            tcl-tclex \
            tcl-memchan \
            tcl-combat \
            tcl-signal \
            tcl-sugar \
            libpgtcl \
            libsqlite-tcl \
            mysqltcl \
            tcl8.6-tdbc \
            tcl8.6-tdbc-mysql \
            tcl8.6-tdbc-odbc \
            tcl8.6-tdbc-postgres \
            tcl8.6-tdbc-sqlite3 \
            itcl3 \
            critcl \
            xotcl \
            tclxapian \
            libtcl-chiark-1 && \
    apt-get clean
           
# Arrange for a decent tclreadline prompt in interactive mode
COPY tclshrc /root/.tclshrc

# Export two volumes, one for tcl code and one for data, just in case.
VOLUME /opt/tcl
VOLUME /opt/data

# Make sure code put into the special tcl volume can lazily be filled
# with packages 
ENV TCLLIBPATH /opt/tcl /opt/tcl/lib
