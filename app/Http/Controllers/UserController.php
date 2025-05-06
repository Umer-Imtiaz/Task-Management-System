<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Inertia\Inertia;
use App\Http\Resources\UserCrudResource;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sort_field = request('sort_field','created_by');
        $sort_direction = request('sort_direction','desc');
        if(request('name')){
          $query = $query->where('name','like','%'.request('name').'%');
        }
        if(request('email')){
          $query = $query->where('email','like','%'.request('email').'%');
        }
        $users = $query->orderBy($sort_field,$sort_direction)->paginate(10)->onEachSide(1);

        return Inertia::render('User/Index',[
            'users'=>UserCrudResource::collection($users),
            'queryParams'=>request()->query() ? : null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] =time();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        return to_route('user.index')->with('success','User Created Successfully');
        
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
       
        return inertia('User/Edit',[
            'user'=>new UserCrudResource($user)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if($password){
            $data['password'] = bcrypt($data['password']);
        }else{
            unset($data['password']);
        }
        $user->update($data);
        return to_route('user.index')->with('success',"User \"$data->name\" Updated Successfully");
 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();

        return to_route('user.index')->with('success',"User \"$name\" deleted Successfully");
 
    }
}
