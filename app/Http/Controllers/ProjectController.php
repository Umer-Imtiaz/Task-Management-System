<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Inertia\Inertia;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();
        
        $sortField = request('sort_field','created_at');
        $sortDirection = request('sort_direction','desc');

        if(request('name')){
            $query->where('name','like','%'.request('name').'%');
        }
        if(request('status')){
            $query->where('status',request('status'));
        }
    
        $Projects = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
    
        return Inertia::render('Project/Index',[
            "projects"=>ProjectResource::collection($Projects),
            'queryParams'=>request()->query()?:null,
            'success'=>session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create',[

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $image = $data['image'] ?? null;
        if($image){
           $data['image_path'] =  $image->store('Project-'.Str::random(10),'public');
        }
        // dd($data);
        $project = Project::create($data);
   
        return to_route('project.index')->with('success','Project Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {   
    
        $query = $project->tasks();
        
        $sortField = request('sort_field','created_at');
        $sortDirection = request('sort_direction','desc');

        if(request('name')){
            $query->where('name','like','%'.request('name').'%');
        }
        if(request('status')){
            $query->where('status',request('status'));
        }
      
        $Tasks = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
     
        return inertia('Project/Show',[
            'project'=>new ProjectResource($project),
            'tasks'=>TaskResource::collection($Tasks),
            'queryParams'=>request()->query()? : null
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {   
     
        return inertia('Project/Edit',[
            'project'=>new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data =$request->validated();
       
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $image = $data['image'] ?? null;
        if($image){
            if($project->image_path){
               Storage::disk('public')->deleteDirective(dirname($project->image_path));
            }
            $data['image_path'] = $image->store('Project-'.str::random(10),'public');
        }
        $project->update($data);
        return to_route('project.index')->with('success',"Project \"$project->name\" edited successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {   
        $name = $project->name;
        if($project->image_path){
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        
        $project->delete();
        return to_route('project.index')->with('success',"Project \"$name\" deleted successfully");
    }
}
