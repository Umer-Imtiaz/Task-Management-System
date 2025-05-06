<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Inertia\Inertia;
use App\Http\Resources\TaskResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();
        
        $sortField = request('sort_field','created_at');
        $sortDirection = request('sort_direction','desc');
 
        if(request('name')){
            $query->where('name','like','%'.request('name').'%');
        }
        if(request('status')){
            $query->where('status',request('status'));
        }
    
        $Tasks = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
    
        return Inertia::render('Task/Index',[
            "tasks"=>TaskResource::collection($Tasks),
            'queryParams'=>request()->query()?:null,
            'success'=>session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {   
        $project = Project::query()->orderBy('name','asc')->get();
        $user = User::query()->orderBy('name','asc')->get();
      
        return inertia('Task/Create',[
            'projects'=>ProjectResource::collection($project),
            'users'=>UserResource::collection($user)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $image = $data['image'] ?? null;
        if($image){
            $data['image_path'] = $image->store('Task-'.Str::random(10),'public');
        }

        $task = Task::create($data);
      
        return to_route('task.index')->with('success','Task Created Successfully');

    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show',[
            'task'=>new TaskResource($task)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $project = Project::query()->orderBy('name','asc')->get();
        $user = User::query()->orderBy('name','asc')->get();
      
        return inertia('Task/Edit',[
            'projects'=>ProjectResource::collection($project),
            'users'=>UserResource::collection($user),
            'task'=>new TaskResource($task)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $task->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $image = $data['image'] ?? null;
        if($image){
           if($task->image_path){
              Storage::disk('public')->deleteDirective(dirname($task->image));
           }
           $data['image_path'] = $image->store('Task-'.str::random(10),'public');
        }
        $task->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name= $task->name;
        if($task->image_path){
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        $task->delete();
        return to_route('task.index')->with('success',"Task \"$name\" Deleted Successfully");
    }
    public function myTask(){
        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id',$user->id);
       
        $sortField = request('sort_field','created_at');
        $sortDirection = request('sort_direction','desc');
        if(request('name')){
            $query->where('name','like','%'.request('name').'%');
        }
        if(request('status')){
            $query->where('status',request('name'));
        }
      
        $tasks = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        return Inertia::render('Task/Index',[
            'tasks'=>TaskResource::collection($tasks),
            'queryParams'=>request()->query() ? : null,
            'success'=>session('success')
        ]);
    }
}
