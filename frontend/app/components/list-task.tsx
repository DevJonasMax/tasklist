'use client';

import { DragEndEvent } from '@/components/ui/shadcn-io/list';
import {
  ListGroup,
  ListHeader,
  ListItem,
  ListItems,
  ListProvider,
} from '@/components/ui/shadcn-io/list';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"
import { Status } from "@/app/types/task";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getAllTasks, { updateTask } from '../(pages)/app/actions/tasks';
import { FiLoader } from "react-icons/fi";
import { MdMoodBad } from "react-icons/md";


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

const dateFormatter = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
});

const ListTask = () => {
  
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
        <MdMoodBad className="text-4xl"/>
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

          <p className='flex items-center'>Loading... <FiLoader className='animate-spin text-2xl text-gray-500'/></p>
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
			id: statusToColumn[todo.completed ],
			name: statusToColumn[todo.completed ],
			color:
				columns.find((col) => col.name === statusToColumn[todo.completed ])
					?.color || "#6B7280",
		},
		description: todo.description,
		originalTodo: todo,
	}));
  function teste () {
    console.log(features);
    console.log(todos);
  }

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
    console.log(currentStatus?.id, newStatus);
    updateTaskStatus({ id: currentStatus?.id as string, completed: newStatus });
   
  };
  return (
    <ListProvider onDragEnd={handleDragEnd}>
      {columns.map((status) => (
        <ListGroup id={status.name} key={status.name}>
          <ListHeader color={status.color} name={status.name} />
          <ListItems>
            {features
              .filter((feature) => feature.status.name === status.name)
              .map((feature, index) => (
                <ListItem
                  id={feature.id}
                  index={index}
                  key={feature.id}
                  name={feature.name}
                  parent={feature.status.name}
                  className='relative'
                >
                  <div className='absolute top-0 left-0 w-full flex items-center justify-center bg-[#1F2937]/20 rounded-t-md'>
                    <p className=' text-gray-200 text-xs italic'>/ / /</p>
                  </div>
                  <div className='absolute bottom-0 left-0 w-full flex items-center justify-center bg-[#1F2937]/20 rounded-b-md'>
                    <span className=' text-gray-200/60 '>/ / /</span>
                  </div>
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: feature.status.color }}
                  />
                  <div 
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()} 
                    className='w-full border-b border-t border-gray-200/40 my-4'>

                    <Accordion type="single" collapsible>
                      <AccordionItem value={feature.id}>
                        <AccordionTrigger>
                          <div className='w-full flex items-center justify-between'>

                            <p className="m-0 flex-1 font-medium text-sm">
                              {feature.name}
                            </p>
                            <p className="m-0 text-muted-foreground text-xs">
                              {shortDateFormatter.format(feature.startAt)} -{" "}
                              {dateFormatter.format(feature.endAt)}
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-gray-500">
                            {feature.description}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                  </Accordion>
                  </div>
                </ListItem>
              ))}
          </ListItems>
        </ListGroup>
      ))}
      <button onClick={teste} className="bg-neutral-500/20 font-bold p-1 rounded-md text-white cursor-pointer hover:bg-blue-500/80">teste</button>
     
    </ListProvider>
  );
};
export default ListTask;
