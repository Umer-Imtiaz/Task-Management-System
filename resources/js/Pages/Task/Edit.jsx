import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel"
import SelectInput from "@/Components/SelectInput"
import TextAreaInput from "@/Components/TextAreaInput"
import TextInput from "@/Components/TextInput"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link, useForm } from "@inertiajs/react"
export default function Edit({projects,users,task}) {
  const {data,setData,post,errors,reset} = useForm({
    project_id:task.Project.id || '',
    image:'',
    name:task.name ||'',
    description:task.description ||'',
    due_date:task.due_date ||'',
    status:task.status ||'',
    priority:task.priority ||'',
    assigned_user_id:task.assignedTo.id ||'',

  })
  const onSubmit = (e) =>{
    e.preventDefault();

    post(route('task.store'))
  }
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between text-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit task
          </h2>

        </div>

      }
    >
  
      <Head title="Create New Task"></Head>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form className="my-2 mx-1" onSubmit={onSubmit}>
                <div className="mt-2">
                <InputLabel htmlFor="Project" value="Project"></InputLabel>
                <SelectInput name="project_id" defaultValue={task.Project.id} className="w-full block my-2" id="project_id" onChange={(e)=>setData('project_id',e.target.value)}>   
                    <option value="">Please Select Project</option>
                    {projects.data.map((project)=>(
                       <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                </SelectInput>
                </div>
                <InputError message={errors.project_id} className="my-2 text-red"/>
                {task.image_path && <div className="my-2">
                   <img className="w-64 block" src={task.image_path}/>
                </div>}
                <div className="mt-2">
                <InputLabel htmlFor="image" value="Task Image"></InputLabel>
                <TextInput type="file" name="image" id="task_image" className="w-full block my-2" onChange={(e)=>setData('image',e.target.files[0])}/>
                </div>
                <InputError message={errors.image} className="my-2 text-red"/>
                <div className="mt-2">
                <InputLabel htmlFor="name" value="Task Name"></InputLabel>
                <TextInput name="name" id="task_name" defaultValue={task.name} className="w-full block my-2" onChange={(e)=>setData('name',e.target.value)}/>
                </div>
                <InputError message={errors.name} className="my-2 text-red"/>
                <div className="mt-2">
                <InputLabel htmlFor="description" value="Task Description"></InputLabel>
                <TextAreaInput name="description" defaultValue={task.description} id="task_description" className="w-full block my-2" onChange={(e)=>setData('description',e.target.value)}></TextAreaInput>
                </div>
                <InputError message={errors.description} className="my-2 text-red"/>
                <div className="mt-2">
                <InputLabel htmlFor="due_date" value="Task Deadline"></InputLabel>
                <TextInput type="date" name="due_date" defaultValue={task.due_date} id="task_due_date" className="w-full block my-2" onChange={(e)=>setData('due_date',e.target.value)}/>
                </div>
                <InputError message={errors.due_date} className="my-2 text-red"/>
                <div className="mt-2">
                <InputLabel htmlFor="task_status" value="Task Status"></InputLabel>
                <SelectInput name="status" defaultValue={task.status} className="w-full block my-2" id="task_status" onChange={(e)=>setData('status',e.target.value)}>
                    <option value="">Please Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </SelectInput>

                </div>
                <InputError message={errors.status} className="my-2 text-red"/>
                <div className="mt-2">
                <InputLabel htmlFor="task_priority" value="Task Priority"></InputLabel>
                <SelectInput name="priority" defaultValue={task.priority} className="w-full block my-2" id="priority" onChange={(e)=>setData('priority',e.target.value)}>
                    <option value="">Please Select Task Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
              
                   
                </SelectInput>

                </div>
                <InputError message={errors.priority} className="my-2 text-red"/>
                <div className="mt-2">
                <InputLabel htmlFor="assigned_user" value="Assigned User"></InputLabel>
                <SelectInput name="assigned_user_id" defaultValue={task.assignedTo.id} className="w-full block my-2" id="assigned_user_id" onChange={(e)=>setData('assigned_user_id',e.target.value)}>   
                    <option value="">Please Select User</option>
                    {users.data.map((user)=>(
                       <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </SelectInput>
                </div>
                <InputError message={errors.assigned_user_id} className="my-2 text-red"/>
                <div className="mt-8 text-right">
                  <Link className="bg-red-800 text-white px-3 py-3 rounded shadow transition-all" href={route('task.index')}>Cancel</Link>
                  <button className="ms-3 bg-emerald-500 px-3 py-3 rounded shadow transition-all">Submit</button>
                </div>
              </form>
            </div> 
            </div>
        </div>
        </div>
    </AuthenticatedLayout>
  )
}