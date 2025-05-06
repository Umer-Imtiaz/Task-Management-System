import Pagination from "@/Components/Pagination"
import TextInput from "@/Components/TextInput"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link, router } from "@inertiajs/react"
import TableHeader from "@/Components/TableHead"
export default function Index({ users, queryParams = null,success }) {
  queryParams = queryParams || {};

  const handleFormSelection = (name, value) => {
    if (value) {
      // queryParams = {};
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route('user.index'), queryParams);
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
    router.get(route('user.index'), queryParams)
  }
  const deleteUser = (user)=>{
   
     if(!window.confirm('Are you Sure You Want To Delete The User')){
       return;
     }
     
     router.delete(route('user.destroy',user.id));
  }
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between text-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Users
          </h2>
          <Link href={route('user.create')} className="bg-emerald-500 text-white px-3 py-2 font-bold rounded shadow transition-all hover:bg-emerald-600">Create</Link>
        </div>

      }
    >

      <Head title="user"></Head>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {success && <div className="bg-emerald-700 py-3 px-2 text-white rounded">{success}</div>}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
         
            <div className="p-6 text-gray-900 dark:text-gray-100">
             
              <table className="w-full text-left rtl:text-right text-gray-300 dark:text-gray-400 overflow-x-auto">
                <thead className="border-b-2 border-gray-500 uppercase text-sm shadow-sm bg-gray-300 dark:bg-gray-700 ">
                  <tr className="text-nowrap">
                    <TableHeader sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} name='id' sort={sort} sortable={true}>ID</TableHeader>
                   
                    <TableHeader sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} name='name' sort={sort} sortable={true}>Name</TableHeader>
           
                    <TableHeader sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} name='email' sort={sort} sortable={true}>Email</TableHeader>
                    <TableHeader sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} name='created_at' sort={sort} sortable={true}>Created Date</TableHeader>
                    
                    <th className="px-2 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <thead className="border-b-2 border-gray-500 uppercase text-sm shadow-sm bg-gray-300 dark:bg-gray-700 ">
                  <tr className="text-nowrap">
                    <th className="px-2 py-3"></th>
             
                    <th className="px-2 py-3">
                      <TextInput className="w-full "
                        defaultValue={queryParams.name}
                        onBlur={(e) => handleFormSelection('name', e.target.value)}
                        onKeyPress={(e) => keyPress('name', e)}
                        placeholder="User Name" />
                    </th>
                    <th className="px-2 py-3">
                    <TextInput className="w-full "
                        defaultValue={queryParams.email}
                        onBlur={(e) => handleFormSelection('email', e.target.value)}
                        onKeyPress={(e) => keyPress('email', e)}
                        placeholder="User Name" />
                    </th>
                    <th className="px-2 py-3"></th>
                    <th className="px-2 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.data.map((user) => (
                    <tr className="border-b-2 border-gray-700" key={user.id}>
                      <td className="px-2 py-3">{user.id}</td>
                     
                      <th className="px-2 py-3">{user.name}</th>
                      <td className="px-2 py-3">{user.email}</td>
                      <td className="px-2 py-3">{user.created_at}</td>
                      <td className="px-2 py-3 text-nowrap">
                        <Link className="text-blue-600 hover:underline mx-1" href={route('user.edit',user.id)}>Edit
                        </Link>
                        <button className="text-red-600 hover:underline mx-1" onClick={(e)=>deleteUser(user)}>Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}