import { readTitle } from "./indexHelpers";

it("matches the old syntax", () => {
  const exampleString = "https://www.youtube.com/watch?v=5caCR76vlnU";
  const titleInfo = readTitle(exampleString);
  expect(titleInfo.id).toBe(exampleString);
  expect(titleInfo.title).toBe("");
});

it("matches the new syntax", () => {
  const title = "example"
  const url = "https://www.youtube.com/watch?v=5caCR76vlnU";
  const exampleString = `[${title}](${url})`;
  const titleInfo = readTitle(exampleString);
  expect(titleInfo.id).toBe(url);
  expect(titleInfo.title).toBe(title);
});
