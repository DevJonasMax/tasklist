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
    DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeatureTaskSchema, TaskSchema } from "@/app/schemas/zoodSchema/featureSchema";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select";

interface DialogEditProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    task: TaskSchema | null;
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
            status: task?.status,
        }
    });

    useEffect(() => {
        if (task) {
            const mappedStatus = columnToStatus[task.status as string] || task.status;
            reset({
                title: task.title,
                description: task.description,
                status: mappedStatus as any,
            });
        }
    }, [task, reset]);

    if (!task) return null;

    const handleSubmitForm = (data: TaskSchema) => {
        console.log("Valid data:", data);
    };

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
                            Faça as alterações necessárias na tarefa aqui. Clique em Salvar quando terminar.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Title</Label>
                            <Input {...register("title")} />
                            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Textarea {...register("description")} />
                            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                        </div>
                        <Controller
                            control={control}
                            name="status"
                            render={({ field }) => {

                                return (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">Planejado</SelectItem>
                                            <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
                                            <SelectItem value="DONE">Concluído</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )
                            }}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
