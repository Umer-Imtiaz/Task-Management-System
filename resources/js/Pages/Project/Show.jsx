import { PROJECT_COLOR_WRAP, PROJECT_TEXT_WRAP } from "@/Components/constants"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link, router } from "@inertiajs/react"
import TaskTable from "../Task/TaskTable"
export default function Show({project,tasks,queryParams = null}){
   return(
    
    <AuthenticatedLayout
          header={
          
            <div className="flex justify-between text-center">
              <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
              {`Project "${project.name}"`}
            </h2>
             <Link href={route('project.create')} className="bg-emerald-500 text-white px-3 py-2 font-bold rounded shadow transition-all hover:bg-emerald-600">Create</Link>
           </div>
          }
        >
       
        
         <Head title={`Project "${project.name}"`}></Head> 
      
         <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
          <img className="w-full h-64" src={project.image_path}/>
            <div className="p-6 text-gray-900 dark:text-gray-100">
      
              <div className="overflow-auto">
                  <div className="grid grid-cols-2 gap-1">
                     <div>
                        <p className="mt-8 text-2xl font-bold">Project ID</p>
                        <p className="mt-3">{project.id}</p>
                        <p className="mt-8 text-2xl font-bold">Project Name</p>
                        <p className="mt-3">{project.name}</p>
                        <p className="mt-8 text-2xl font-bold">Project Status</p>
                        <p className="mt-3">
                          <span  className={"rounded px-2 py-2 w-32 text-white " + PROJECT_COLOR_WRAP[project.status]}>{PROJECT_TEXT_WRAP[project.status]}</span></p>
                        <p className="mt-8 text-2xl font-bold">Created by</p>
                        <p className="mt-3">{project.createdBy.name}</p>
                        
                     </div>
                     <div>
                        <p className="mt-8 text-2xl font-medium">
                             Due Date
                        </p>
                        <p className="mt-3">
                            {project.due_date}
                        </p>
                        <p className="mt-8 text-2xl font-medium">
                             Created Date
                        </p>
                        <p className="mt-3">
                            {project.created_at}
                        </p>
                        <p className="mt-8 text-2xl font-medium">
                             Updated By
                        </p>
                        <p className="mt-3">
                            {project.updatedBy.name}
                        </p>
                     </div>
                  </div>
                  <p className="mt-8 text-2xl font-bold">Product Description</p>
                        <p className="mt-3">{project.description}</p>
                </div>  
            </div>
              </div>
              </div>
              </div>
                 <div className="py-12">
                      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                          <div className="p-6 text-gray-900 dark:text-gray-100">
                       <TaskTable tasks={tasks} queryParams={queryParams}  hiddenName={true} show={true} project={project}/>
                             
                          </div>
                        </div>
                      </div>
                    </div>
        </AuthenticatedLayout>

   )
}