<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;
    protected $fillable=['name','project_id','description','due_date','status','priority','assigned_user_id','created_by','updated_by','image_path'];
    function Project(){
        return $this->belongsTo(Project::class,'project_id');
    }
    function assignedTo(){
        return $this->belongsTo(User::class,'assigned_user_id');
    }
    function createdBy(){
        return $this->belongsTo(User::class,'created_by');
    }
    function updatedBy(){
        return $this->belongsTo(User::class,'updated_by');
    }
}
