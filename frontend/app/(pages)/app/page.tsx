"use client";
import TabsComponent from "@/app/components/tabs";
import { DragEndEvent } from '@/components/ui/shadcn-io/list';
import { TabsContent, TabsList } from "@/app/components/ui/tabs";
import { TabsTrigger } from "@/app/components/ui/tabs";
import ListTask from "@/app/components/list-task";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getAllTasks, { updateTask } from '../app/actions/tasks';
import { FiLoader } from "react-icons/fi";
import { MdMoodBad } from "react-icons/md";
import { Status } from "@/app/types/task"


const statusToColumn = {
    PENDING: "Planned",
    IN_PROGRESS: "In Progress",
    DONE: "Done",
} as const;

const columnToStatus = {
    Planned: "PENDING",
    "In Progress": "IN_PROGRESS",
    Done: "DONE",
} as const;

const columns = [
    { id: "Planned", name: "Planned", color: "#6B7280" },
    { id: "In Progress", name: "In Progress", color: "#F59E0B" },
    { id: "Done", name: "Done", color: "#10B981" },
];


export default function HomePage() {

    const queryClient = useQueryClient();

    const { data: todos = [], isLoading, isError, error } = useQuery({
        queryKey: ["todos"],
        queryFn: getAllTasks
    });



    const { mutate: updateTaskStatus } = useMutation({
        mutationFn: ({ id, completed }: { id: string; completed: Status }) =>
            updateTask(id, { completed }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    if (isError) {

        return (
            <div className="text-red-500 p-3 w-full h-[500px] text-center text-lg font-bold flex flex-col justify-center items-center gap-4">
                {error.message === "Sem conexão com o servidor."
                    ? "Erro inesperado de conexão!"
                    : "Ocorreu um erro ao carregar os dados."}
                <MdMoodBad className="text-4xl" />
                <button className="bg-neutral-500/20 font-bold p-1 rounded-md text-white cursor-pointer hover:bg-blue-500/80" onClick={() => window.location.reload()}>Tentar novamente</button>
            </div>
        );
    }
    if (!todos) {
        return <p>Error loading tasks</p>;
    }

    if (isLoading) {
        return (
            <div className='w-full h-[500px] flex justify-center items-center'>

                <p className='flex items-center'>Loading... <FiLoader className='animate-spin text-2xl text-gray-500' /></p>
            </div>
        );
    }


    const features = todos.map((todo) => ({
        id: todo.id,
        name: todo.title,
        startAt: new Date(todo.createdAt),
        endAt: new Date(todo.updatedAt),
        column: statusToColumn[todo.completed],
        status: {
            id: statusToColumn[todo.completed],
            name: statusToColumn[todo.completed],
            color:
                columns.find((col) => col.name === statusToColumn[todo.completed])
                    ?.color || "#6B7280",
        },
        description: todo.description,
        originalTodo: todo,
    }));


    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) {
            return;
        }
        const columnName = over.id;
        const newStatus = columnToStatus[columnName as keyof typeof columnToStatus];
        if (!newStatus) {
            return;
        }
        const currentStatus = features.find((feature) => feature.id === active.id);

        const originalTask = currentStatus?.originalTodo?.completed;

        if (originalTask === newStatus) {
            return;
        }

        updateTaskStatus({ id: currentStatus?.id as string, completed: newStatus });

    };

    return (
        <div className="flex w-full flex-col gap-6">
            <TabsComponent defaultValue="list" className="">
                <TabsList className="flex w-full  mb-6  items-center rounded-b-lg  sticky top-17 left-0 right-0">
                    <div className="flex-1 flex  justify-start border-r-2 gap-4">

                        <TabsTrigger value="list" className="flex items-centers max-w-16">List</TabsTrigger>
                        <TabsTrigger value="canbam" className="flex items-centers max-w-16">Canbam</TabsTrigger>

                    </div>
                    <div className="flex-1 text-end ">
                        <button className="bg-neutral-500/20 font-bold p-1 rounded-md text-white cursor-pointer hover:bg-blue-500/80">nova tarefa</button>
                    </div>
                </TabsList>
                <TabsContent value="list">
                    <ListTask features={features} columns={columns} handleDragEnd={handleDragEnd} />
                </TabsContent>
                <TabsContent value="canbam">
                    <h1>Canbam</h1>
                </TabsContent>
            </TabsComponent>

        </div>
    );
}
