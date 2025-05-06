import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel"
import SelectInput from "@/Components/SelectInput"
import TextAreaInput from "@/Components/TextAreaInput"
import TextInput from "@/Components/TextInput"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link, useForm } from "@inertiajs/react"
export default function Edit({user}) {
  const {data,setData,post,errors,reset} = useForm({
    image: '',
    name: user.name || '',
    email:user.email || '',
    password:'',
    password_confirmation:'',
    _method:'PUT'
  })
  const onSubmit = (e) =>{
    e.preventDefault();

    post(route('user.update',user.id))
  }
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between text-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit User "{user.name}"
          </h2>

        </div>

      }
    >
      <Head title="Create New User"></Head>
    
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form className="my-2 mx-1" onSubmit={onSubmit}>
                  <div className="mt-2">
                                <InputLabel htmlFor="name" value="user Name"></InputLabel>
                                <TextInput name="name" id="user_name" defaultValue={user.name} className="w-full block my-2" onChange={(e)=>setData('name',e.target.value)}/>
                                </div>
                                <InputError message={errors.name} className="my-2 text-red"/>
                                <div className="mt-2">
                                <InputLabel htmlFor="email" value="user email"></InputLabel>
                                <TextInput name="email" type="email" id="user_email" defaultValue={user.email} className="w-full block my-2" onChange={(e)=>setData('email',e.target.value)}/>
                                </div>
                                <InputError message={errors.email} className="my-2 text-red"/>
                
                                <div className="mt-2">
                                <InputLabel htmlFor="password" value="Password"></InputLabel>
                                <TextInput name="password" type="password" id="user_name" defaultValue={user.passsword} className="w-full block my-2" onChange={(e)=>setData('password',e.target.value)}/>
                                </div>
                                <InputError message={errors.password} className="my-2 text-red"/>
                                <div className="mt-2">
                                <InputLabel htmlFor="password_confirmation" value="Confirm password"></InputLabel>
                                <TextInput name="password_confirmation" type="password" id="user_name" defaultValue={user.password} className="w-full block my-2" onChange={(e)=>setData('password_confirmation',e.target.value)}/>
                                </div>
             
                <div className="mt-8 text-right">
                  <Link className="bg-red-800 text-white px-3 py-3 rounded shadow transition-all" href={route('user.index')}>Cancel</Link>
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