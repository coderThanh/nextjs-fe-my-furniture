import { BlogEntity } from "./blog";
import { UploadFileEntry } from "./upload-file";

export interface CategoryEntry {
  id: string;
  attributes: {
    title: string;
    slug: string;
    thumbnail: UploadFileEntry | undefined;
    content: string;
    createdAt: string;
    updatedAt: string;
    blogs: { data: BlogEntity[] | undefined };
  };
}
