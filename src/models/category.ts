import { UploadFileEntry } from "./upload-file";

export interface CategoryEntry {
  id: string;
  attributes: {
    title: string;
    slug: string;
    thumbnail: UploadFileEntry;
    content: string;
    createdAt: string;
  };
}
