
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head,Link} from "@inertiajs/react"
import TaskTable from "./TaskTable"

export default function Index({ tasks,queryParams=null,success}) {
  queryParams = queryParams ||  {};

  return (
    <AuthenticatedLayout
    header={
      <div className="flex justify-between text-center">
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Task
        </h2>
        <Link href={route('task.create')} className="bg-emerald-500 text-white px-3 py-2 font-bold rounded shadow transition-all hover:bg-emerald-600">Create</Link>
      </div>

    }
    >

      <Head title="Task"></Head>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {success && <div className="bg-emerald-700 text-white rounded px-2 py-3">{success}</div>}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
             <TaskTable tasks={tasks} queryParams={queryParams}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}