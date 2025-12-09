'use client';
import { KanbanProvider, KanbanBoard, KanbanHeader, KanbanCards, KanbanCard } from "@/components/ui/shadcn-io/kanban";
import { dateFormatter, shortDateFormatter } from "@/app/lib/utils";
import { DragEndEvent } from '@/components/ui/shadcn-io/list';
import { FeatureTask } from "@/app/types/task";
import { MdEdit } from "react-icons/md"
import { MdDelete } from "react-icons/md"
import { TaskSchema } from "@/app/schemas/zoodSchema/featureSchema";


interface KanbanProps {
  features: FeatureTask[];
  columns: Columns[];
  handleDragEnd: (event: DragEndEvent) => void;
  editTask: (task: TaskSchema) => void;
}

type Columns = {
  id: string;
  name: string;
  color: string;
};

export default function KanbanComponent({ features, columns, handleDragEnd, editTask }: KanbanProps) {

  return (
    <>
      <KanbanProvider
        columns={columns} data={features.map((feature) => ({
          ...feature,
          id: feature.id.toString(),
        }))}
        onDragEnd={handleDragEnd}
      >
        {(column) => (
          <KanbanBoard id={column.id} key={column.id}>
            <KanbanHeader>
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: column.color }}
                />
                <span>{column.name}</span>
              </div>
            </KanbanHeader>
            <KanbanCards<FeatureTask> id={column.id}>
              {(feature) => (
                <KanbanCard
                  column={column.id}
                  id={feature.id}
                  key={feature.id}
                  name={feature.name}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <p className="m-0 flex-1 font-medium text-sm">
                        {feature.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          editTask({
                            title: feature.name,
                            description: feature.description || '',
                            status: feature?.status?.name as TaskSchema['status'],
                          })
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="border text-black px-2 p-1 rounded-full hover:border-green-500 cursor-pointer">
                        <MdEdit className="text-green-500 text-lg" />
                      </button>
                      <button
                        onPointerDown={(e) => e.stopPropagation()}
                        className="border text-black px-2 p-1 rounded-full hover:border-red-500 cursor-pointer">
                        <MdDelete className="text-red-500 text-lg" />
                      </button>
                    </div>
                  </div>
                  {feature.description && (
                    <p className="m-0 text-muted-foreground text-xs mb-2">
                      {feature.description}
                    </p>
                  )}
                  <p className="m-0 text-muted-foreground text-xs">
                    {shortDateFormatter.format(feature.startAt as Date)} -{' '}
                    {dateFormatter.format(feature.endAt as Date)}
                  </p>
                </KanbanCard>
              )}
            </KanbanCards>
          </KanbanBoard>
        )}
      </KanbanProvider>

    </>
  );
};
