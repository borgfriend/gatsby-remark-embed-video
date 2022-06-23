import { readVideoId } from "../EmbedVideo";

it("works with a shortcode", () => {
  const type = "youtube";
  const id = "2Xc9gXyf2G4";

  const videoId = readVideoId(type, id)
  expect(videoId.id).toBe(id);
  expect(videoId.service).toBe(type)
  
});
