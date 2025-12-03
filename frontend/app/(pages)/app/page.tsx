"use client";

import { useQuery } from "@tanstack/react-query";
import getAllTasks from "./actions/tasks";
import TabsComponent from "@/app/components/tabs";

import { TabsContent, TabsList } from "@/app/components/ui/tabs";
import { TabsTrigger } from "@/app/components/ui/tabs";
import ListTask from "@/app/components/list-task";



export default function HomePage() {
    
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
                <ListTask />
            </TabsContent>
            <TabsContent value="canbam">
                <h1>Canbam</h1>
            </TabsContent>
        </TabsComponent>
       
        </div>
    );
}
