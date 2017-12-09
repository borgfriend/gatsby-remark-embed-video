# gatsby-remark-embed-youtube
Embed a Youtube Video in your Markdown


## Install 
1. Install plugin to your site:

```bash
yarn add gatsby-remark-embed-youtube
```

2. Add following to your `gatsby-config.js`:
```js
    plugins: [      
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
          {
            resolve: "gatsby-remark-embed-youtube"
          }
          ]
        }
      },
```

3. Restart gastby.

## Usage

```markdown
\# Look at this Video:

\`youtube:https://www.youtube.com/embed/2Xc9gXyf2G4\`

```


## License

MIT