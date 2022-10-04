# gatsby-remark-embed-video

Embed a Youtube Video in your Markdown

## Usage

```markdown
# Look at this Video:

`video: https://www.youtube.com/embed/2Xc9gXyf2G4`
`youtube: https://www.youtube.com/watch?v=2Xc9gXyf2G4`
`youtube: 2Xc9gXyf2G4`

`vimeo: https://vimeo.com/5299404`
`vimeo: 5299404`

`videoPress: https://videopress.com/v/kUJmAcSf`
`videoPress: kUJmAcSf`

`twitch: https://player.twitch.tv/?channel=dakotaz`
`twitch: https://player.twitch.tv/?autoplay=false&video=v273436948`
`twitch: 273436948`
`twitchLive: dakotaz`
```

## Additional Features

### Add Custom CSS Styling
You can style the videoIframe using `.embedVideo-container` or by specifying a custom class

1.  Restart gatsby.

### A11y support

`video: [VideoTitle](https://www.youtube.com/embed/2Xc9gXyf2G4)`
`youtube: [Cool Youtube Video](https://www.youtube.com/watch?v=2Xc9gXyf2G4)`


## Install

```bash
npm i gatsby-remark-embed-video

yarn add gatsby-remark-embed-video
```

## Configuration Markdown with MDX

Example Configuration

```ts
import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `My Gatsby Site`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              loadingStrategy: "lazy", //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: (videoId: string) =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
              sandbox: "'allow-same-origin allow-scripts allow-presentation'", // Optional: iframe sandbox options - Default: undefined
            },
          },
           "gatsby-remark-responsive-iframe", //Optional: Must be loaded after gatsby-remark-embed-video
        ],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};

export default config;
```

## Configuration Markdown (without MDX)

1.  Add following to your `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              loadingStrategy: 'lazy', //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: videoId =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
            },
             "gatsby-remark-responsive-iframe", //Optional: Must be loaded after gatsby-remark-embed-video
          },
        ],
      },
    },
  ],
};
```

## Make the iFrame Responsive

I would recommend the plugin [gatsby-remark-responsive-iframe](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-responsive-iframe)

Install it with `npm i gatsby-remark-responsive-iframe`

When using this plugin you must ensure that in the sequence of plugins `gatsby-remark-embed-video` runs before `gatsby-remark-responsive-iframe`.


## Troubleshooting

if you also rely on `gatsby-remark-responsive-iframe`, `gatsby-remark-images`, or `gatsby-remark-prismjs`, you have to define the embed-youtube plugin first:

```js
plugins: [
  "gatsby-remark-embed-video",
  "gatsby-remark-responsive-iframe",
  "gatsby-remark-prismjs",
  "gatsby-remark-images"
]
```




## Special Thanks
Inspired by [gatsby-remark-embed-youtube](https://github.com/ntwcklng/gatsby-remark-embed-youtube)

## License

MIT
