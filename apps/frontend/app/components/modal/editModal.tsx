import { Button } from "@/app/components/ui/button";
import { useEffect } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FeatureTaskSchema,
    TaskSchema,
} from "@/app/schemas/zoodSchema/featureSchema";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task, UpdateTaskType } from "@/app/types/task";
import { updateTask } from "@/app/(pages)/app/actions/tasks";
import { toast } from "react-toastify";

interface DialogEditProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    task: Task | null;
}

const columnToStatus: Record<string, "PENDING" | "IN_PROGRESS" | "DONE"> = {
    Planned: "PENDING",
    "In Progress": "IN_PROGRESS",
    Done: "DONE",
};

export function DialogEdit({ open, onOpenChange, task }: DialogEditProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<TaskSchema>({
        resolver: zodResolver(FeatureTaskSchema),
        defaultValues: {
            title: task?.title,
            description: task?.description,
            status: task?.completed,
        },
    });
    const queryClient = useQueryClient();

    const { mutate: editTodo, isPending } = useMutation({
        mutationFn: (data: UpdateTaskType) => updateTask(task?.id || "", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            reset();
            onOpenChange(false);
        },
    });

    useEffect(() => {
        if (task) {
            const mappedStatus =
                columnToStatus[task.completed as string] || task.completed;
            reset({
                title: task.title,
                description: task.description,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                status: mappedStatus as any,
            });
        }
    }, [task, reset]);

    if (!task) return null;
    if (isPending) {
        return (
            <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="ml-2">Aguarde ... </p>
            </div>
        );
    }

    const handleSubmitForm = (data: TaskSchema) => {
        const isUnchanged =
            task.title.trim() === data.title.trim() &&
            task.description.trim() === data.description.trim() &&
            task.completed.trim() === data.status?.trim();

        if (!data.title.trim()) {
            return;
        }

        if (isUnchanged) {
            onOpenChange(false);
            return;
        }
        try {
            editTodo({
                title:
                    data.title.trim().charAt(0).toUpperCase() +
                    data.title.trim().slice(1),
                description: data.description.trim(),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                completed: data.status as any,
            });
            toast.success("Tarefa editada com sucesso!", {
                autoClose: 2000,
                position: "bottom-center",
                hideProgressBar: true,
            });
        } catch (error) {
            console.log(error);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleErrors = (errors: any) => {
        console.log("Validation errors:", errors);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(handleSubmitForm, handleErrors)}>
                    <DialogHeader>
                        <DialogTitle>Edite a Tarefa</DialogTitle>
                        <DialogDescription>
                            Faça as alterações necessárias na tarefa aqui.
                            Clique em Salvar quando terminar.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Título</Label>
                            <Input {...register("title")} />
                            {errors.title && (
                                <span className="text-red-500 text-sm">
                                    {errors.title.message}
                                </span>
                            )}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea {...register("description")} />
                            {errors.description && (
                                <span className="text-red-500 text-sm">
                                    {errors.description.message}
                                </span>
                            )}
                        </div>
                        <Controller
                            control={control}
                            name="status"
                            render={({ field }) => {
                                return (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">
                                                Planejado
                                            </SelectItem>
                                            <SelectItem value="IN_PROGRESS">
                                                Em Progresso
                                            </SelectItem>
                                            <SelectItem value="DONE">
                                                Concluído
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                );
                            }}
                        />
                        {errors.status && (
                            <span className="text-red-500 text-sm">
                                {errors.status.message}
                            </span>
                        )}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isPending}
                            >
                                {isPending ? "Cancelando..." : "Cancelar"}
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Salvando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
