import { CategoryEntry } from "./category";
import { StyleEntity } from "./style";
import { UploadFileEntry } from "./upload-file";

export interface BlogEntity {
  id: string;
  attributes: {
    title: string;
    slug: string;
    createdAt: string;
    updatedAt?: string;
    thumbnail?: UploadFileEntry;
    categories?: { data: CategoryEntry[] };
    styles?: { data: StyleEntity[] };
  };
}
