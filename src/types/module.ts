import type { Course } from "./course";

export interface Module {
    id: number;
    course: Course;
    title: string;
    description: string;
    duration: number;
    order: number;
}
