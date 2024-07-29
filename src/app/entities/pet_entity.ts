import { Category } from "./category_entity";
import { Status } from "./status_entity";
import { Tag } from "./tag_entity";

export interface Pet {
  id: number;
  category: Category;
  name: string;
  photoUrls: string[] | XMLDocument;
  tags: Tag;
  status: Status;
}
