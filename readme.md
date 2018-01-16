# gatsby-remark-embed-video
Embed a Youtube Video in your Markdown

Inspired by [gatsby-remark-embed-youtube]()


## Install 
1. Install plugin to your site:

```bash
npm i gatsby-remark-embed-video

yarn add gatsby-remark-embed-video
```

2. Add following to your `gatsby-config.js`:
```js
    plugins: [      
      {
        resolve: "gatsby-transformer-remark",
        options: {
          plugins: [
          {
            resolve: "gatsby-remark-embed-youtube",
            options: {
              width: 800,
              ratio: 1.77 // Optional: Defaults to 16/9 = 1.77
              height: 400 // Optional: Overrides optional.ratio
            }
          }
          ]
        }
      },
```

Note: if you also rely on `gatsby-remark-responsive-iframe`, you have to define the embed-youtube plugin first:
``` js
plugins: [
  "gatsby-remark-embed-youtube",
  "gatsby-remark-responsive-iframe"
]
```

3. Restart gastby.

## Usage

```markdown
# Look at this Video:

`youtube:https://www.youtube.com/embed/2Xc9gXyf2G4`

```


## License

MIT