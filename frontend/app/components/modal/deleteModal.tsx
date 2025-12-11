import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Task } from "@/app/types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/app/(pages)/app/actions/tasks";


interface DeleteModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    TaskForDelete: Task | null;
}

export default function DeleteModal({ open, onOpenChange, TaskForDelete }: DeleteModalProps) {

    const queryClient = useQueryClient();
    const { mutate: deleteTaskMutate, isPending } = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const handleDelete = (task: Task | null) => {
        if (!task) {
            return;
        }
        deleteTaskMutate(task.id);
        onOpenChange(false);
    }

    if (isPending) {
        return (
            <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="ml-2">Aguarde ... </p>
            </div>
        )
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Confirmação de Exclusão</DialogTitle>
                    <DialogDescription>
                        Tem certeza de que deseja excluir a tarefa "<strong>{TaskForDelete?.title}</strong>"? Esta ação é irreversível.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={() => handleDelete(TaskForDelete)} disabled={isPending}>
                        {isPending ? "Excluindo..." : "Excluir"}
                    </Button>
                    <Button onClick={() => onOpenChange(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}