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
import { Textarea } from "../ui/textarea";
import { Button } from "@/app/components/ui/button";
import { useForm } from "react-hook-form";
import { FeatureTaskSchema, TaskSchema } from "@/app/schemas/zoodSchema/featureSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTask } from "@/app/(pages)/app/actions/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface createTaskModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateTaskModal({ open, onOpenChange, }: createTaskModalProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors } } = useForm<TaskSchema>(
            {
                resolver: zodResolver(FeatureTaskSchema),
            }
        );
    const queryClient = useQueryClient();
    const { mutate: createNewTask, isPending } = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const handleSubmitForm = (data: TaskSchema) => {
        if (!data) {
            return;
        }
        createNewTask({
            title: data.title,
            description: data.description,
            completed: data.status,
        });
        setValue("title", "");
        setValue("description", "");
        onOpenChange(false);
    };
    if (isPending) {
        return (
            <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="ml-2">Aguarde ... </p>
            </div>
        )
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <DialogHeader>
                        <DialogTitle>Criar nova Task</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo para criar uma nova Task.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input
                            {...register("title")}

                            placeholder="Title"
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                        <Textarea
                            {...register("description")}
                            placeholder="Description"
                        />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancelar</Button>
                        </DialogClose>

                        <Button type="submit">Salvar</Button>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
};