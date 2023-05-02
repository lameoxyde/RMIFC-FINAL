import { getStrapiURL } from "./api2";

export function getStrapiMedia(media, quality) {
  let url = "";
  if (media.data.attributes.formats.hasOwnProperty("large")) {
    switch (quality) {
      case "small":
        url += media.data.attributes.formats.small.url;
        break;
      case "medium":
        url += media.data.attributes.formats.medium.url;
        break;
      case "large":
        url += media.data.attributes.formats.large.url;
        break;
      case "thumbnail":
        url += media.data.attributes.formats.thumbnail.url;
        break;
      default:
        url += media.data.attributes.formats.medium.url;
        break;
    }

    const imageUrl = getStrapiURL(url);
    return imageUrl;
  }
  // const { url } = media.data.attributes;
  //   const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  //   return imageUrl;
}
