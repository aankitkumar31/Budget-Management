<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        // $email = Auth::user()->email;
        // Mail::to($email)->send(new DemoMail());
        return view('expense');
    }

    public function search()
    {
        echo "ankit";
    }

    public function daily_expense()
    {
        return view('daily_expense');
    }
}
