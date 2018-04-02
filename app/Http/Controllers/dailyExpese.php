<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Auth;
use Mail;   
use App\Mail\DemoMail;  

class dailyExpese extends Controller
{
    public function index()
    {                        
        return view('daily_expense');  
    }

    public function save(Request $request){
        $encodedDataArr = $request->input('dataArr');
        $dataArr = json_decode($encodedDataArr);
        //echo $dataArr[0];
        //dd($newData);
        foreach($dataArr as $data){          
            $date = $data -> date;  
            $amount = $data -> amount;  
            $type = $data -> type;  
            $reason = $data -> reason;  
            $userId = Auth::user()->id;
            $results = DB::insert('insert into daily_expenses(date, amount, trans_type, reason, user_id) values (?,?,?,?,?)',
        [$date , $amount ,$type , $reason , $userId]);        
        }
        return response()->json($results);
    }

    public function show(){
        $userId = Auth::user()->id;
        $results = DB::select('select * from daily_expenses where user_id = ?', [$userId] );
        return $results;
    }
}
