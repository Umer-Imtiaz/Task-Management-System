<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;
    protected $fillable = ['name','image_path','description','due_date','status','created_by','updated_by'];
   
    function tasks(){
        return $this->hasMany(Task::class);
    }
    function updatedBy(){
        return $this->belongsTo(User::class,'created_by');
    }
    function createdBy(){
        return $this->belongsTo(User::class,'updated_by');
    }
}
