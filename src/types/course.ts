import type { Category } from "./category";

export interface Course {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    category: Category;
}
