import { ChevronUpIcon,ChevronDownIcon } from '@heroicons/react/16/solid'
export default function TableHeader({
  name,
  sort_field =null,
  sort_direction = null,
  sortable = true,
  sort = () => {},
  children
}){
  return(
    <th  
    onClick={(e)=>sort(name)}>
    <div className="px-2 py-3 flex items-center gap-1 cursor-pointer">
    {children}
    {sortable && (
      <div className="">
      <ChevronUpIcon className={'w-4 ' + (sort_direction === 'asc' && sort_field === name ? 'text-white' : '') }/>
      <ChevronDownIcon className={'w-4 -mt-2 ' + (sort_direction === 'desc' && sort_field === name ? 'text-white' : '') }/>
    </div>
  )}    
    
    </div>
    </th>   
  )
}