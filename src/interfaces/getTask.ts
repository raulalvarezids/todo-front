import { Tasks } from "./task";

export interface GetTasks{
    error : boolean,
    data : Tasks[]
}