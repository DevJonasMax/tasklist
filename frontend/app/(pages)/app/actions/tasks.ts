import { Api } from "@/app/lib/api";

import { CreateTask, Task, UpdateTask } from "@/app/types/task";

export default async function getAllTasks(): Promise<Task[]> {
    const response = await Api.get<Task[]>("/api/tasks", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    return response.data;
}

export async function createTask( task: CreateTask ) {
    const response = await Api.post<Task>(`create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
    
    return response.data;
}
 

export async function updateTask( id: string, taskUpdate: UpdateTask ) {
  
    const response = await Api.patch<Task>(`/api/tasks/update/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskUpdate),
    });
    
    
    return response.data;
}