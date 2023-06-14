import { CategoryEntry } from "./category";
import { UploadFileEntry } from "./upload-file";

export interface BlogEntity {
  id: string;
  attributes: {
    title: string;
    slug: string;
    createdAt: string;
    thumbnail?: UploadFileEntry;
    categories?: CategoryEntry[];
  };
}
