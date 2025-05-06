import { TASK_COLOR_WRAP, TASK_TEXT_WRAP,TASK_PRIORITY_COLOR } from "@/Components/constants"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link, router } from "@inertiajs/react"
import TaskTable from "../Task/TaskTable"
export default function Show({task}){
   return(
    
    <AuthenticatedLayout
          header={
            
            <div className="flex justify-between text-center">
           <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
              {`Task "${task.name}"`}
            </h2>
            <Link href={route('task.create')} className="bg-emerald-500 text-white px-3 py-2 font-bold rounded shadow transition-all hover:bg-emerald-600">Create</Link>
          </div>
          }
        >
       
        
         <Head title={`task "${task.name}"`}></Head> 
      
         <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
          <img className="w-full h-64" src={task.image_path}/>
            <div className="p-6 text-gray-900 dark:text-gray-100">
      
              <div className="overflow-auto">
                  <div className="grid grid-cols-2 gap-1">
                     <div>
                        <p className="mt-8 text-2xl font-bold">Task ID</p>
                        <p className="mt-3">{task.id}</p>
                        <p className="mt-8 text-2xl font-bold">Task Name</p>
                        <p className="mt-3">{task.name}</p>
                        <p className="mt-8 text-2xl font-bold">Task Status</p>
                        <p className="mt-3">
                          <span  className={"rounded px-2 py-2 w-32 text-white " + TASK_COLOR_WRAP[task.status]}>{TASK_TEXT_WRAP[task.status]}</span></p>
                          <p className="mt-8 text-2xl font-bold">Task Priority</p>
                        <p className="mt-3">
                          <span  className={"rounded px-2 py-2 w-32 text-white " + TASK_PRIORITY_COLOR[task.priority]}>{task.priority}</span></p>
                        <p className="mt-8 text-2xl font-bold">Created by</p>
                        <p className="mt-3">{task.createdBy.name}</p>
                        
                     </div>
                     <div>
                        <p className="mt-8 text-2xl font-medium">
                             Due Date
                        </p>
                        <p className="mt-3">
                            {task.due_date}
                        </p>
                        <p className="mt-8 text-2xl font-medium">
                             Created Date
                        </p>
                        <p className="mt-3">
                            {task.created_at}
                        </p>
                        <p className="mt-8 text-2xl font-medium">
                             Updated By
                        </p>
                        <p className="mt-3">
                            {task.updatedBy.name}
                        </p>
                        <p className="mt-8 text-2xl font-medium">
                             Project
                        </p>
                        <p className="mt-3">
                            {task.Project.name}
                        </p>
                        <p className="mt-8 text-2xl font-medium">
                             Assigned User
                        </p>
                        <p className="mt-3">
                            {task.assignedTo.name}
                        </p>
                     </div>
                  </div>
                  <p className="mt-8 text-2xl font-bold">Task Description</p>
                        <p className="mt-3">{task.description}</p>
                </div>  
            </div>
              </div>
              </div>
              </div>
               
        </AuthenticatedLayout>

   )
}