@extends('layouts.user')
@section('content')
<div class="row">
    <div class="col-xs-12">
        <div class="page-title-box">
            <h4 class="page-title">Daily Expenses</h4>
            <!-- <ol class="breadcrumb p-0 m-0">
            <li>
                <a href="#">Dashboard</a>
            </li>
            <li class="active">
                <a href="#">Profile</a>
            </li>
            </ol> -->
            <div class="clearfix"></div>
        </div>
    </div>
</div>
<!-- end row -->
<div class="row">
    <div class="col-xs-12">
        <div class="card-box update-profile-box">
            <div class="row">
                <ul class="nav nav-tabs navExpense">
                    <li class="active" onclick="bindData('', '', '');"><a href="#view">View Daily Expenses</a></li>
                    <li><a href="#add">Add Daily Expenses</a></li>
                </ul>
            </div>
            <div class="tab-content">
                <div class="row tab-pane fade in active" id="view">
                    <div class="row form-horizontal">
                    <div class="col-md-6">
                    <div class="form-group">
                        <label class="col-md-3 control-label" for="txtFromDate">From Date</label>
                        <div class="col-md-9">
                        <input type="text" class="form-control txtInput datepicker" id="txtFromDate" placeholder="YYYY-MM-DD" data-date-format="yyyy-mm-dd" readonly="">
                        </div>
                    </div>
                    </div>                                      
                    <div class="col-md-6">
                    <div class="form-group">
                        <label class="col-md-3 control-label" for="txtToDate">To Date</label>
                        <div class="col-md-9">
                        <input type="text" class="form-control datepicker" id="txtToDate" placeholder="YYYY-MM-DD" data-date-format="yyyy-mm-dd" readonly="">
                        </div>
                    </div>
                    </div>
                </div>
                <div class="row form-horizontal">
                    <div class="col-md-6">
                    <div class="form-group">
                        <label class="col-md-3 control-label" for="txtTransactionTypeSearch">Transaction Type</label>
                        <div class="col-md-9">
                        <select class="form-control" id="txtTransactionTypeSearch">
                            <option value="">All</option>
                            <option value="Cr">Credit (Cr.)</option>
                            <option value="Db">Debit (Db.)</option>
                        </select> 
                        </div>
                    </div>
                    </div>   
                </div>
                <div class="row">
                    <div class="col-md-12 m-t-10 text-center"> 
                    <button type="button" id="btnSearch" class="update-button btn btn-success btn-rounded w-lg waves-effect waves-light m-b-5">Search</button>
                    <button type="button" id="btnViewReset" class="update-button btn btn-success btn-rounded w-lg waves-effect waves-light m-b-5">Reset</button>
                    </div>
                </div>
                <div class="col-md-12 table-responsive">
                    <table id="myExpenseTable" class="display nowrap" cellspacing="0" width="100%">
                        <thead>
                        <tr>
                            <th width="10%">Sr. No.</th>
                            <th width="20%">Date</th>
                            <th width="20%">Amount</th>
                            <th width="10%">Transaction Type</th>
                            <th width="30%">Reason</th>
                            <th width="10%">Action</th>
                        </tr>
                        </thead>
                        <tfoot>
                        <tr>
                            <td><label>Total : </label></td>
                            <td id="txtTotalAmount">0</td>
                            <td><label>Total Credit : </label></td>
                            <td id="lblTotalCr"></td>
                            <td><label>Total Debit : </label></td>
                            <td id="lblTotalDb"></td>
                        </tr>
                        </tfoot>
                    </table>
                </div>                
            </div>

            <div class="row tab-pane fade in" id="add">
                <form class="form-horizontal" role="form" data-parsley-validate novalidate>
                
                    <div class="row">                          
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="txtTransactionDate">Transaction Date</label>
                                <div class="col-md-9">
                                <input type="text" class="form-control txtInput datepicker" id="txtTransactionDate" placeholder="YYYY-MM-DD" data-date-format="yyyy-mm-dd" readonly="">
                                <span class="txtError" id="txtTransactionDateError"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row createBtn">
                        <div class="col-md-12 m-t-10"> 
                            <button type="button" id="btnAdd" class="update-button btn btn-success btn-rounded w-lg waves-effect waves-light m-b-5">Add</button>
                        </div>
                    </div>
                    <div class="row text-center">
                        <span class="error"></span>
                    </div>
                    <div class="row">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Transaction Type</th>
                                    <th>Reason</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody class="tblBody">
                                
                            </tbody>
                        </table>
                    </div>
                    <div class="row createBtn">
                        <div class="col-md-12 m-t-10 text-center"> 
                            <button type="button" id="btnSave" class="update-button btn btn-success btn-rounded w-lg waves-effect waves-light m-b-5">Save</button>
                            <button type="button" id="btnReset" class="update-button btn btn-success btn-rounded w-lg waves-effect waves-light m-b-5">Reset</button>
                        </div>
                    </div>
                </form>
            </div>

            </div>
            
            
        </div>
    </div>
</div>
<script src="{{ asset('js/jquery.min.js') }}"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/bootstrap-datepicker.js') }}"></script>
<script src="{{ asset('js/daily_expense.js') }}"></script>
@endsection
