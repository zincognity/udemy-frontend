import type { Category } from "./category";

export interface Course {
    id: number;
    name: string;
    littleDescription: string;
    description: string;
    tags: string;
    price: number;
    createdAt: Date;
    category: Category;
}
