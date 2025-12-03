export interface Task {
    id: string;
    title: string;
    description: string;
    completed: Status;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export type Status = 
    "PENDING" |
    "IN_PROGRESS" |
    "DONE"

export interface CreateTask {
    title: string;
    description: string;
    completed?: Status;
}


export interface UpdateTask {
    title?: string;
    description?: string;
    completed?: Status;
}

