import {
  createSocialImageResponse,
  socialImageAlt,
  socialImageContentType,
  socialImageSize,
} from "./social-image";

// fallow-ignore-next-line unused-export
export const runtime = "edge";
export const alt = socialImageAlt;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default createSocialImageResponse;
