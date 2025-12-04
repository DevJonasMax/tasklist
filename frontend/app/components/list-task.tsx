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
import { FeatureTask } from "@/app/types/task";
import { dateFormatter, shortDateFormatter } from "@/app/lib/utils";


interface listProps {
  features: FeatureTask[];
  columns: Columns[];
  handleDragEnd: (event: DragEndEvent) => void;

}

type Columns = {
  id: string;
  name: string;
  color: string;
};

const ListTask = ({ features, columns, handleDragEnd }: listProps) => {


  return (
    <ListProvider onDragEnd={handleDragEnd}>
      {columns.map((status) => (
        <ListGroup id={status.name} key={status.name}>
          <ListHeader color={status.color} name={status.name} />
          <ListItems>
            {features
              .filter((feature: any) => feature.status.name === status.name)
              .map((feature: any, index: number) => (
                <ListItem
                  id={String(feature.id)}
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
                    className='w-full my-4'>

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
    </ListProvider>
  );
};
export default ListTask;
