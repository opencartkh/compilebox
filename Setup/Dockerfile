############################################################
# Dockerfile to build sandbox for executing user code
# Based on Ubuntu
############################################################

FROM ubuntu:17.10
MAINTAINER ASAD MEMON, OSMAN ALI

ENV DEBIAN_FRONTEND noninteractive

# Update the repository sources list
# RUN echo "deb http://us-east-1.ec2.archive.ubuntu.com/ubuntu artful main universe" > /etc/apt/sources.list
RUN apt-get update
#RUN apt-get upgrade

RUN apt-get install time

# Install all the languages/compilers we are supporting.
RUN apt-get install -y gcc
RUN apt-get install -y g++
RUN apt-get install -y php7.1-cli
RUN apt-get install -y ruby
RUN apt-get install -y ruby-activesupport
RUN apt-get install -y python
RUN apt-get install -y mono-xsp4 mono-xsp4-base

RUN apt-get install -y mono-vbnc
RUN apt-get install -y npm
RUN apt-get install -y golang-go

###
### Begin install node (damn node)
###
### https://gist.github.com/RinatMullayanov/89687a102e696b1d4cab
###

RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_8.x | bash -

RUN apt-get install --yes nodejs

###
### End install node
###

RUN npm install -g underscore request express jade shelljs passport http sys jquery lodash async forever debug

# mocha moment connect validator restify ejs ws co when helmet wrench brain mustache should backbone    && export NODE_PATH=/usr/local/lib/node_modules/

RUN apt-get install -y clojure

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

# Swift

# 1. Install prerequisites
RUN apt-get install -y git cmake ninja-build clang python uuid-dev libicu-dev icu-devtools libbsd-dev libedit-dev libxml2-dev libsqlite3-dev swig libpython-dev libncurses5-dev pkg-config libblocksruntime-dev libcurl4-openssl-dev autoconf libtool systemtap-sdt-dev tzdata

# 2. Download source
RUN mkdir swift-source
WORKDIR /swift-source
RUN git clone https://github.com/apple/swift.git
RUN ./swift/utils/update-checkout --clone

# 3. Build source
WORKDIR /swift-source/swift
RUN utils/build-script --release-debuginfo

WORKDIR /

# Numerical libraries

RUN apt-get install -y python-numpy python-scipy python-pandas python-sklearn python-statsmodels python-sympy python-requests python-beautifulsoup
# RUN echo "deb http://cran.rstudio.com/bin/linux/ubuntu artful/" >> /etc/apt/sources.list
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

RUN apt-get install -y gnat # ada
RUN apt-get install -y algol68g
RUN apt-get install -y bf # brainfuck
RUN apt-get install -y open-cobol
RUN npm install -g coffeescript
RUN npm install -g naheui
RUN apt-get install -y clisp
RUN apt-get install -y gdc # d language, also installed below, just in case
RUN apt-get install -y emacs # emacs lisp
RUN apt-get install -y erlang
RUN apt-get install -y elixir
RUN apt-get install -y gfortran
RUN apt-get install -y fsharp
RUN apt-get install -y hhvm # hack
RUN apt-get install -y julia # also installed below, just in case
RUN apt-get install -y nim
RUN apt-get install -y ocaml
RUN apt-get install -y octave
RUN apt-get install -y plt-scheme
RUN apt-get install -y postgresql
RUN apt-get install -y gprolog # prolog
RUN apt-get install -y fp-compiler # pascal
RUN apt-get install -y pypy
RUN apt-get install -y pypy-lib
RUN apt-get install -y racket
RUN apt-get install -y gnu-smalltalk
RUN apt-get install -y sqlite3
RUN apt-get install -y tcl

# Many package names were taken from
# https://github.com/nacyot/docker-programming-languages

ENV DEBIAN_FRONTEND noninteractive

# "Long form" languages:

# Dart
# https://www.dartlang.org/install/linux

RUN apt-get update
RUN apt-get install apt-transport-https
RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN curl https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_stable.list > /etc/apt/sources.list.d/dart_stable.list
RUN apt-get update
RUN apt-get install dart

# Haskell

RUN apt-get install -y ghc
RUN apt-get install -y ghc-doc
RUN apt-get install -y ghc-prof
RUN apt-get install -y cabal-install
RUN cabal update

# Kotlin, Groovy
# https://hub.docker.com/r/rayyildiz/kotlin/~/dockerfile/

LABEL       KOTLIN_VERSION="1.2.10"

ENV         KOTLIN_VERSION=1.2.10 \
            KOTLIN_HOME=/usr/local/kotlin

# Added
RUN         curl "https://get.sdkman.io" | bash
RUN         bash -c 'source "/root/.sdkman/bin/sdkman-init.sh" && sdk install kotlin'
RUN         bash -c 'source "/root/.sdkman/bin/sdkman-init.sh" && sdk install groovy'

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
    tar zxpf luarocks-${luarocks_version}.tar.gz && \
    cd luarocks-${luarocks_version} && \
    ./configure --with-lua-include=/lua-${lua_verision}/src/ ; make bootstrap && \
    luarocks install luasocket

# Remove unneccessary packages (packages just needed for building image)

# RUN apt-get remove --purge -y \
#     wget \
#     make \
#     build-essential \
#     libreadline-dev \
#     ca-certificates \
#     mingw-w64 && \
# 
#     apt-get autoremove -y

# COPY ["./commands/*.sh", "/docker/bin/"]

# RUN chmod a+x /docker/bin/*.sh \
#     && ln -s /docker/bin/install-module.sh /usr/local/bin/install-module


# code which is running bellow
#
# if [ ! -z ${needed_modules} ] ;
#    then
#        for i in ${needed_modules}; do
#            luarocks install "$i";
#        done ;
#    else echo "no modules needed, so no module installed";
# fi

# RUN if[[ ! -z ${needed_modules} ]] ; then for i in ${needed_modules}; do luarocks install $i; done ; else echo "no modules needed, so no module installed" ; fi

# TypeScript

RUN npm install -g typescript

