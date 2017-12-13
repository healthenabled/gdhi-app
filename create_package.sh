#!/usr/bin/env bash

build_number=${BUILD_NUMBER-1}
echo ${build_number}
npm run build && tar -zvcf gdhi-${build_number}.tar.gz --exclude=*.map --exclude=.DS_Store dist/
