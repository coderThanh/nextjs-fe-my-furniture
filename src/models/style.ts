import { BlogEntity } from "./blog";

export interface StyleEntity {
  id: string;
  attributes: {
    title: string;
    slug: string;
    expect?: string;
    content?: string;
    createdAt: string;
    updatedAt: string;
    blogs: { data: BlogEntity[] };
  };
}
