#!/usr/bin/env zx
await $`npm run build`
await $`cp -R ./dist ../my-gatsby-site/node_modules/gatsby-remark-embed-video`
await $`cp -R ./src ../my-gatsby-site/node_modules/gatsby-remark-embed-video`