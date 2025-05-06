import { TASK_COLOR_WRAP, TASK_TEXT_WRAP } from "@/Components/constants"
import Pagination from "@/Components/Pagination"
import SelectInput from "@/Components/SelectInput"

import TextInput from "@/Components/TextInput"
import { Link, router } from "@inertiajs/react"
import TableHeader from "@/Components/TableHead"

export default function TaskTable({queryParams =null,tasks,hiddenName=false,show=false,project=null}){
  queryParams = queryParams ||  {};

  const handleFormSelection = (name,value) =>{
    if(value){
      // queryParams = {};
      queryParams[name] = value;
    }else{
      delete queryParams[name];
    }
    if(show){
      router.get(route('project.show',project),queryParams)
    }else{
      router.get(route('task.index'),queryParams);
    }
   
  }
  const keyPress = (name,e) =>{
    if (e.key !== 'Enter') return;

    handleFormSelection(name,e.target.value);
  }
  const sort = (name)=>{
    if(name === queryParams.sort_field){
        if(queryParams.sort_direction === 'asc'){
          queryParams.sort_direction = 'desc';
        }else{
          queryParams.sort_direction = 'asc';
        }
    }else{
        queryParams.sort_field = name;
        queryParams.sort_direction = 'desc';
    }
    if(show){
      router.get(route('project.show',project),queryParams)
    }else{
          router.get(route('task.index'),queryParams)
    }

  }
  const handleDelete = (task) =>{
    if(!window.confirm('Are You Sure You Want To Delete This Task')){
       return;
    }
    router.delete(route('task.destroy',task));
  }
  return(
    <div className=" overflow-auto">
    <table className="w-full text-left rtl:text-right text-gray-300 dark:text-gray-400">
        <thead className="border-b-2 border-gray-500 uppercase text-sm shadow-sm bg-gray-300 dark:bg-gray-700 ">
          <tr className="text-nowrap">
            
            <TableHeader sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} name='id' sort={sort} sortable={true}>ID</TableHeader>
            <TableHeader name='image' sortable={false}>Image</TableHeader>
            {!hiddenName &&<TableHeader name='project_name' sortable={false}>Project Name</TableHeader>}
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
            {!hiddenName && <th className="px-2 py-3"></th>}
            <th className="px-2 py-3">
              <TextInput className="w-full "
              defaultValue={queryParams.name}
              onBlur={(e)=> handleFormSelection('name',e.target.value)}
              onKeyPress={(e) => keyPress('name',e)}
              placeholder="Task Name"/>
            </th>
            <th className="px-2 py-3">
              <SelectInput 
              defaultValue={queryParams.status}
              onChange={(e) => handleFormSelection('status',e.target.value)} >
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
          {tasks.data.map((task) => (
            <tr className="border-b-2 border-gray-700" key={task.id}>
              <td className="px-2 py-3">{task.id}</td>
              <td className="px-2 py-3"><img src={task.image_path} style={{width:60}}/></td>
              {!hiddenName &&<td className="px-2 py-3">{task.Project.name}</td>}
              <th className="px-2 py-3"><Link className="hover:underline" href={route('task.show',task.id)}>{task.name}</Link></th>
              <td className="px-2 py-3"><span className={"text-white px-2 py-1 rounded " + TASK_COLOR_WRAP[task.status]}>{TASK_TEXT_WRAP[task.status]}</span></td>
              <td className="px-2 py-3">{task.created_at}</td>
              <td className="px-2 py-3">{task.due_date}</td>
              <td className="px-2 py-3">{task.createdBy.name}</td>
              <td className="px-2 py-3 text-nowrap">
                <Link className="text-blue-600 hover:underline mx-1" href={route('task.edit',task.id)}>Edit
                </Link>
                <button className="text-red-600 hover:underline mx-1" onClick={(e)=>handleDelete(task.id)}>Delete
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      <Pagination links={tasks.meta.links}/>
    </div>
  )
}