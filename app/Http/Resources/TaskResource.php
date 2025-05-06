<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ProjectResource;
class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = false;
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'description'=>$this->description,
            'status'=>$this->status,
            'due_date'=>(new Carbon($this->due_date))->format('Y-m-d'),
            'priority'=>$this->priority,
            'image_path'=>$this->image_path ? Storage::url($this->image_path) : '',
            'assignedTo'=>new UserResource($this->assignedTo),
            'Project'=>new ProjectResource($this->Project),
            'created_at'=>(new Carbon($this->created_at))->format('Y-m-d'),
            'createdBy'=>new UserResource($this->createdBy),
            'updatedBy'=>new UserResource($this->updatedBy),
        ];
    }
}
