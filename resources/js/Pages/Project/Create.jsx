import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel"
import SelectInput from "@/Components/SelectInput"
import TextAreaInput from "@/Components/TextAreaInput"
import TextInput from "@/Components/TextInput"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link, useForm } from "@inertiajs/react"
export default function Create() {
  const {data,setData,post,errors,reset} = useForm({
    image:'',
    name:'',
    description:'',
    due_date:'',
    status:'',

  })
  const onSubmit = (e) =>{
    e.preventDefault();

    post(route('project.store'))
  }
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between text-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Create New project
          </h2>

        </div>

      }
    >
      <Head title="Create New Project"></Head>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form className="my-2 mx-1" onSubmit={onSubmit}>
                
                <div className="mt-2">
                <InputLabel htmlFor="image" value="Project Image"></InputLabel>
                <TextInput type="file" name="image" id="project_image" className="w-full block my-2" onChange={(e)=>setData('image',e.target.files[0])}/>
                </div>
                <InputError message={errors.image} className="my-2 text-red"/>
                <div className="mt-2">
                <InputLabel htmlFor="name" value="Project Name"></InputLabel>
                <TextInput name="name" id="project_name" className="w-full block my-2" onChange={(e)=>setData('name',e.target.value)}/>
                </div>
                <InputError message={errors.name} className="my-2 text-red"/>
                <div className="mt-2">
                <InputLabel htmlFor="description" value="Project Description"></InputLabel>
                <TextAreaInput name="description" id="project_description" className="w-full block my-2" onChange={(e)=>setData('description',e.target.value)}></TextAreaInput>
                </div>
                <InputError message={errors.description} className="my-2 text-red"/>
                <div className="mt-2">
                <InputLabel htmlFor="due_date" value="Project Due Date"></InputLabel>
                <TextInput type="date" name="due_date"  id="project_due_date" className="w-full block my-2" onChange={(e)=>setData('due_date',e.target.value)}/>
                </div>
                <InputError message={errors.due_date} className="my-2 text-red"/>
                <div className="mt-2">
                <InputLabel htmlFor="project_status" value="Project Status"></InputLabel>
                <SelectInput name="status" className="w-full block my-2" id="project_status" onChange={(e)=>setData('status',e.target.value)}>
                    <option value="">Please Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </SelectInput>

                </div>
                <InputError message={errors.status} className="my-2 text-red"/>
                <div className="mt-8 text-right">
                  <Link className="bg-red-800 text-white px-3 py-3 rounded shadow transition-all" href={route('project.index')}>Cancel</Link>
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