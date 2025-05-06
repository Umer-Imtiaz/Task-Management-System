import { Link } from "@inertiajs/react"

export default function Pagination({links}){
  return(
    <nav className="text-center mt-2">
      {links.map((link)=>(
        <Link
        preserveScroll 
        href={link.url || ""} 
        key={link.label} 
        className={"bg-gray-800 inline-block px-3 py-2 rounded text-sm " + (link.active ? " bg-gray-950" : " ") + (
          !link.url ? " !bg-gray-700 cursor-not-allowed" : " hover:bg-gray-950"
        )}  dangerouslySetInnerHTML={{__html:link.label}}></Link>
      ))}
    </nav>
  )
}