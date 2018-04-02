<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/expense', 'expenseContoller@index')->name('expense');

Route::get('/daily_expense', 'dailyExpese@index')->name('daily_expense');

Route::get('/logout', 'HomeController@logout');

Route::post('/searchHome', 'HomeController@search');

Route::post('/search', 'expenseContoller@search');

Route::post('/saveExpense', 'expenseContoller@save');

Route::post('/saveDailyExpense', 'dailyExpese@save');

Route::get('/showDailyExpenses', 'dailyExpese@show');

Route::post('/saveCompletedExpenses', 'expenseContoller@saveCompletedExpenses');

Route::post('/deleteExpense', 'expenseContoller@deleteExpense');

Route::post('/updateExpense', 'expenseContoller@updateExpense');
