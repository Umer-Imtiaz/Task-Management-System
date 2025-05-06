import { PROJECT_COLOR_WRAP, PROJECT_TEXT_WRAP } from "@/Components/constants"
import Pagination from "@/Components/Pagination"
import SelectInput from "@/Components/SelectInput"

import TextInput from "@/Components/TextInput"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link, router } from "@inertiajs/react"
import TableHeader from "@/Components/TableHead"
export default function Index({ projects, queryParams = null,success }) {
  queryParams = queryParams || {};

  const handleFormSelection = (name, value) => {
    if (value) {
      // queryParams = {};
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route('project.index'), queryParams);
  }
  const keyPress = (name, e) => {
    if (e.key !== 'Enter') return;

    handleFormSelection(name, e.target.value);
  }
  const sort = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc';
      } else {
        queryParams.sort_direction = 'asc';
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'desc';
    }
    router.get(route('project.index'), queryParams)
  }
  const deleteProject = (project)=>{
   
     if(!window.confirm('Are you Sure You Want To Delete The Project')){
       return;
     }
     
     router.delete(route('project.destroy',project.id));
  }
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between text-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Projects
          </h2>
          <Link href={route('project.create')} className="bg-emerald-500 text-white px-3 py-2 font-bold rounded shadow transition-all hover:bg-emerald-600">Create</Link>
        </div>

      }
    >

      <Head title="Project"></Head>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {success  && <div className="bg-emerald-700 py-3 px-2 text-white rounded">{success}</div>}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
         
            <div className="p-6 text-gray-900 dark:text-gray-100">
             
              <table className="w-full text-left rtl:text-right text-gray-300 dark:text-gray-400 overflow-x-auto">
                <thead className="border-b-2 border-gray-500 uppercase text-sm shadow-sm bg-gray-300 dark:bg-gray-700 ">
                  <tr className="text-nowrap">
                    <TableHeader sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} name='id' sort={sort} sortable={true}>ID</TableHeader>
                    <TableHeader name='image' sortable={false}>Image</TableHeader>
                    <TableHeader sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} name='name' sort={sort} sortable={true}>Name</TableHeader>
                    <TableHeader sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} name='status' sort={sort} sortable={true}>Status</TableHeader>
                    <TableHeader sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} name='created_at' sort={sort} sortable={true}>Created Date</TableHeader>
                    <TableHeader sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} name='due_date' sort={sort} sortable={true}>Due Date</TableHeader>
                    <TableHeader name='created_by' sort={sort} sortable={false}>Created By</TableHeader>
                    <th className="px-2 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <thead className="border-b-2 border-gray-500 uppercase text-sm shadow-sm bg-gray-300 dark:bg-gray-700 ">
                  <tr className="text-nowrap">
                    <th className="px-2 py-3"></th>
                    <th className="px-2 py-3"></th>
                    <th className="px-2 py-3">
                      <TextInput className="w-full "
                        defaultValue={queryParams.name}
                        onBlur={(e) => handleFormSelection('name', e.target.value)}
                        onKeyPress={(e) => keyPress('name', e)}
                        placeholder="Project Name" />
                    </th>
                    <th className="px-2 py-3">
                      <SelectInput
                        defaultValue={queryParams.status}
                        onChange={(e) => handleFormSelection('status', e.target.value)} >
                        <option value="">Select Any Status</option>
                        <option value="pending">pending</option>
                        <option value="In_Progress">in progress</option>
                        <option value="completed">completed</option>
                      </SelectInput>
                    </th>
                    <th className="px-2 py-3"></th>
                    <th className="px-2 py-3"></th>
                    <th className="px-2 py-3"></th>
                    <th className="px-2 py-3 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {projects.data.map((project) => (
                    <tr className="border-b-2 border-gray-700" key={project.id}>
                      <td className="px-2 py-3">{project.id}</td>
                      <td className="px-2 py-3"><img src={project.image_path} style={{ width: 60 }} /></td>
                      <th className="px-2 py-3"><Link href={route('project.show', project.id)} className="font-medium text-white hover:underline cursor-pointer" >{project.name}</Link></th>
                      <td className="px-2 py-3"><span className={"text-white px-2 py-1 rounded " + PROJECT_COLOR_WRAP[project.status]}>{PROJECT_TEXT_WRAP[project.status]}</span></td>
                      <td className="px-2 py-3">{project.created_at}</td>
                      <td className="px-2 py-3">{project.due_date}</td>
                      <td className="px-2 py-3">{project.createdBy.name}</td>
                      <td className="px-2 py-3 text-nowrap">
                        <Link className="text-blue-600 hover:underline mx-1" href={route('project.edit',project.id)}>Edit
                        </Link>
                        <button className="text-red-600 hover:underline mx-1" onClick={(e)=>deleteProject(project)}>Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}