export interface ProjectResponse {
  project: {
    _id: string;
    name: string;
    description: string;
    category: string;
    year: number;
    langs: string;
    image: string | null;
    __v: number;
  };
}
