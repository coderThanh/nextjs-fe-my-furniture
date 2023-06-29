import { BlogEntity } from "./blog";
import { CategoryEntry } from "./category";
import { StyleEntity } from "./style";
import { UploadFileEntry } from "./upload-file";

export interface PageHomeRes {
  pageHome: {
    data: {
      attributes: {
        hot_blogs: { data: BlogEntity[] };
        hot_banner: UploadFileEntry;
        categories: { data: CategoryEntry[] };
        styles: { data: StyleEntity[] };
      };
    };
  };
}
