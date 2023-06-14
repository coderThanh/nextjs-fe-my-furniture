export interface UploadFileEntry {
  data: {
    id: number;
    attributes: {
      name?: string;
      url: string;
      alternativeText?: string;
      caption?: string;
      width?: number;
      height?: number;
      mime?: string;
      size?: number;
      createdAt?: string;
      updatedAt?: string;
    };
  };
}
