import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link } from '@inertiajs/react';
import { TASK_COLOR_WRAP, TASK_TEXT_WRAP } from "@/Components/constants"
export default function Dashboard({TotalPendingTasks,MyTotalPendingTasks,TotalCompletedTasks,MyTotalCompletedTasks,TotalInProgressTasks,MyTotalInProgressTasks,tasks}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                         <h3 className='text-red-600 text-2xl font-semibold'>Pending Tasks</h3>
                         <p className='mt-2 text-xl'><span className="me-1">{MyTotalPendingTasks}</span><span className='ms-1'>/  {TotalPendingTasks}</span></p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        <h3 className='text-blue-600 text-2xl font-semibold'>In Progress Tasks</h3>
                        <p className='mt-2 text-xl'><span className="me-1">{MyTotalInProgressTasks}</span><span className='ms-1'>/  {TotalInProgressTasks}</span></p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        <h3 className='text-emerald-600 text-2xl font-semibold'>Completed Tasks</h3>
                        <p className='mt-2 text-xl'><span className="me-1">{MyTotalCompletedTasks}</span><span className='ms-1'>/  {TotalCompletedTasks}</span></p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                          <table className='w-full text-left rtl:text-right text-gray-300 dark:text-gray-400 overflow-x-auto'>
                            <thead className='border-b-2 border-gray-500 uppercase text-sm shadow-sm bg-gray-300 dark:bg-gray-700'>
                           
                                <tr className='text-nowrap'>
                                    <th className='px-2 py-3'>ID</th>
                                    <th className='px-2 py-3'>Name</th>
                                    <th className='px-2 py-3'>Project Name</th>
                                    <th className='px-2 py-3'>Status</th>
                                    <th className='px-2 py-3'>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                              {tasks.data.map((task)=>(
                             <tr className='text-nowrap border-b-2 border-gray-700' key={task.id}>
                               <td className='px-2 py-3'>{task.id}</td>
                               <th className='px-2 py-3'><Link className='hover:underline text-white ' href={route('task.show',task.id)}>{task.name}</Link></th>
                               <th className='px-2 py-3'><Link className='hover:underline text-white ' href={route('project.show',task.Project.id)}>{task.Project.name}</Link></th>
                               <td className='px-2 py-3'><span className={' text-white rounded py-1 px-2 ' +TASK_COLOR_WRAP[task.status]} >{TASK_TEXT_WRAP[task.status]}</span></td>
                               <td className='px-2 py-3'>{task.due_date}</td>
                             </tr>
                              ))}
                                
                            </tbody>
                          </table>
                        </div>
                    </div>
                
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
