<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index(){
        $students=Student::all();
        sleep(1);
        return response()->json([
            'status'=>200,
            'students'=>$students
        ]);
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:100',
            'course'=>'required|max:50',
            'email'=>'required|email|max:100',
            'phone'=>'required|max:10|min:10',

        ]);

        if($validator->fails()){
            return response()->json([
                'validate_err'=>$validator->getMessageBag()->toArray()
            ]);
        }else{
            $student = new Student;
            $student->name=$request->input('name');
            $student->course=$request->input('course');
            $student->email=$request->input('email');
            $student->phone=$request->input('phone');
            $student->save();
    
            return response()->json([
                'status'=>200,
                'message'=>'Student Added Successfully'
            ]);
        }

    }

    public function edit($id){
        $student = Student::find($id);
        if($student){
            return response()->json([
                'status'=>200,
                'student'=>$student
            ]);    
        }else{
            return response()->json([
                'status'=>404,
                'message'=>"Student detail not found"
            ]);
        }
        
    }

    public function update(Request $request,$id){
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:100',
            'course'=>'required|max:50',
            'email'=>'required|email|max:100',
            'phone'=>'required|max:10|min:10',

        ]);
        if($validator->fails()){
            return response()->json([
                'validate_err'=>$validator->getMessageBag()->toArray()
            ]);
        }else{
            $student = Student::find($id);
            $student->name=$request->input('name');
            $student->course=$request->input('course');
            $student->email=$request->input('email');
            $student->phone=$request->input('phone');
            $student->update();
            sleep(3);
            return response()->json([
                'status'=>200,
                'message'=>'Student Updated Successfully'
            ]);
        }
    }

    public function destroy($id){
        $student = Student::find($id);
        if($student){
            $student->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Student Deleted Successfully'
            ]);  
        }else{
            return response()->json([
                'status'=>404,
                'student'=>"Student detail not found"
            ]);
        }

        
    }
}
