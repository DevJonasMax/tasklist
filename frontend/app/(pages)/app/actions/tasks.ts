import { Api } from "@/app/lib/api";
import { CreateTask, Task, UpdateTask } from "@/app/types/task";

export default async function getAllTasks(): Promise<Task[]> {
    const response = await Api.get<Task[]>("/api/tasks");
    return response.data;
}

export async function createTask(task: CreateTask) {
    const response = await Api.post<Task>("/api/tasks/create", task);
    return response.data;
}
// Update a task by ID
export async function updateTask(id: string, taskUpdate: UpdateTask) {
    const response = await Api.patch<Task>(`/api/tasks/update/${id}`, taskUpdate);
    return response.data;
}
