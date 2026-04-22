import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./sanity.client";
import type { SanityImage } from "./sanity.types";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
