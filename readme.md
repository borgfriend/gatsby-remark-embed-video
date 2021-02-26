# gatsby-remark-embed-video

Embed a Youtube Video in your Markdown

Inspired by [gatsby-remark-embed-youtube](https://github.com/ntwcklng/gatsby-remark-embed-youtube)



## Install

1.  Install plugin to your site:

```bash
npm i gatsby-remark-embed-video

yarn add gatsby-remark-embed-video
```

2.  Add following to your `gatsby-config.js`:

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
          },
        ],
      },
    },
  ],
};
```

Note: if you also rely on `gatsby-remark-responsive-iframe`, `gatsby-remark-images`, or `gatsby-remark-prismjs`, you have to define the embed-youtube plugin first:

```js
plugins: [
  "gatsby-remark-embed-video",
  "gatsby-remark-responsive-iframe",
  "gatsby-remark-prismjs",
  "gatsby-remark-images"
]
```

Note: you can style the videoIframe using `.embedVideo-container` or by specifying a custom class

1.  Restart gatsby.

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

**Version 3**
Added A11y support

`video: [VideoTitle](https://www.youtube.com/embed/2Xc9gXyf2G4)`
`youtube: [Cool Youtube Video](https://www.youtube.com/watch?v=2Xc9gXyf2G4)`


## License

MIT
