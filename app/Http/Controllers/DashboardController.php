<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Task;
use App\Http\Resources\TaskResource;
class DashboardController extends Controller
{
    public function index(){
        $TotalPendingTasks = Task::where('status','pending')->count();
        $MyTotalPendingTasks = Task::where('assigned_user_id',auth()->user()->id)->where('status','pending')->count();

        $TotalCompletedTasks = Task::where('status','completed')->count();
        $MyTotalCompletedTasks = Task::where('assigned_user_id',auth()->user()->id)->where('status','completed')->count();

        $TotalInProgressTasks = Task::where('status','in_progress')->count();
        $MyTotalInProgressTasks = Task::where('assigned_user_id',auth()->user()->id)->where('status','in_progress')->count();
      
        $task = Task::where('assigned_user_id',auth()->user()->id)->whereIn('status',['pending','in_progress'])->limit(10)->get();
        $tasks = TaskResource::collection($task);
        return inertia('Dashboard',compact('TotalPendingTasks','MyTotalPendingTasks','TotalCompletedTasks','MyTotalCompletedTasks','TotalInProgressTasks','MyTotalInProgressTasks','tasks'));
    }
}
