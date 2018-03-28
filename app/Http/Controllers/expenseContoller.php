<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Auth;
use Mail;   
use App\Mail\DemoMail;  
class expenseContoller extends Controller
{
    public function index()
    {                        
        return view('expense');  
    }

    public function search(){
        $userId = Auth::user()->id;
        $results = DB::select('select * from expenses where user_id = ?', [$userId] );
        return $results;
    }

    public function save(Request $request){
        //echo 'search';
        $payeeName = $request->input('payeeName');
        $amount = $request->input('amount');
        $remarks = $request->input('remarks');
        $transType = $request->input('transType');
        $transDate = $request->input('transDate');
        $transMode = $request->input('transMode');
        $current_timestamp = Carbon::now()->timestamp;
        $userId = Auth::user()->id;

        $results = DB::insert('insert into expenses(payee_name, amount, remarks, trans_type, trans_mode, created_date, created_on,user_id) values (?,?,?,?,?,?,?,?)',
        [$payeeName , $amount ,$remarks , $transType , $transMode, $transDate, $current_timestamp,$userId]);
        return response()->json($results);
    }

    public function saveCompletedExpenses(Request $request){
        $dataId = $request->input('dataId');        
        $current_timestamp = Carbon::now()->timestamp;
        $current_time = Carbon::now();

        $results = DB::update('update expenses set completed_date = "'.$current_time.'",expense_status = "C" where id = ?', [$dataId]);
        return response()->json($results);
    }

    public function deleteExpense(Request $request){
        $dataId = $request->input('dataId');        
        $current_timestamp = Carbon::now()->timestamp;
        $current_time = Carbon::now();
        
        $results = DB::delete('delete from expenses where id = ?', [$dataId]);
        return response()->json($results);
    }

    public function updateExpense(Request $request){
        $dataId = $request->input('dataId');      
        $payeeName = $request->input('payeeName');
        $amount = $request->input('amount');
        $remarks = $request->input('remarks');
        $transType = $request->input('transType');
        $transDate = $request->input('transDate');
        $transMode = $request->input('transMode');
        $current_timestamp = Carbon::now()->timestamp;  
        $current_time = Carbon::now();
        
        $results = DB::update('update expenses set payee_name = "'.$payeeName.'",amount = "'.$amount.'",remarks = "'.$remarks.'", trans_type = "'.$transType.'", trans_mode = "'.$transMode.'",created_date = "'.$transDate.'",created_on = "'.$current_timestamp.'" where id = ?', [$dataId]);
        return response()->json($results);
    }
}
