@extends('layouts.user')
@section('content')
<div class="row">
    <div class="col-xs-12">
        <div class="page-title-box">
            <h4 class="page-title">Expenses</h4>
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
            <li class="active" onclick="bindExpenses('', '', '');"><a href="#view">View Expenses</a></li>
            <li><a href="#add">Add Expenses</a></li>
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
                    <th width="15%">Payee Name</th>
                    <th width="10%">Amount</th>
                    <th width="10%">Transaction Type</th>
                    <th width="10%">Mode Of Transaction</th>
                    <th width="15%">Remarks</th>
                    <th width="15%">Date</th>
                    <th width="15%">Status</th>
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
                    <td></td>
                    <td></td>
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
                    <label class="col-md-3 control-label" for="txtPayeeName">Payee Name</label>
                    <div class="col-md-9">
                    <input type="text" class="form-control txtInput" id="txtPayeeName" placeholder="Enter the payee name..." parsley-trigger="change" required>
                    <span class="txtError" id="txtPayeeNameError"></span>
                    </div>
                </div>
                </div>                                      
                <div class="col-md-6">
                <div class="form-group">
                    <label class="col-md-3 control-label" for="txtAmount">Amount</label>
                    <div class="col-md-9">
                    <input type="number" class="form-control txtInput" id="txtAmount" placeholder="Enter the amount..." parsley-trigger="change" required>
                    <span class="txtError" id="txtAmountError"></span>
                    </div>
                </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                <div class="form-group">
                    <label class="col-md-3 control-label" for="txtTransactionType">Transaction Type</label>
                    <div class="col-md-9">
                    <select class="form-control txtInput" id="txtTransactionType">
                        <option value="Cr">Credit (Cr.)</option>
                        <option value="Db">Debit (Db.)</option>
                    </select>                                            
                    <span class="txtError" id="txtTransactionTypeError"></span>
                    </div>
                </div>
                </div>                                      
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
            <div class="row">
                <div class="col-md-6">
                <div class="form-group">
                    <label class="col-md-3 control-label" for="txtTransactionMode">Mode Of Transaction</label>
                    <div class="col-md-9">
                    <input type="text" class="form-control txtInput" id="txtTransactionMode" placeholder="Enter the mode of transaction..." parsley-trigger="change">
                    <span class="txtError" id="txtTransactionModeError"></span>
                    </div>
                </div>
                </div>
                <div class="col-md-6">
                <div class="form-group">
                    <label class="col-md-3 control-label" for="txtRemarks">Remarks</label>
                    <div class="col-md-9">
                    <textarea class="form-control txtInput" id="txtRemarks" placeholder="Enter the remarks..." parsley-trigger="change"></textarea>
                    </div>
                </div>
                </div>
            </div>
            <div class="row createBtn">
                <div class="col-md-12 m-t-10 text-center"> 
                    <button type="button" id="btnSave" class="update-button btn btn-success btn-rounded w-lg waves-effect waves-light m-b-5">Save</button>
                    <button type="button" id="btnReset" class="update-button btn btn-success btn-rounded w-lg waves-effect waves-light m-b-5">Reset</button>
                </div>
            </div>
            <div class="row updateBtn">
                <div class="col-md-12 m-t-10 text-center"> 
                    <button type="button" id="btnUpdate" class="update-button btn btn-success btn-rounded w-lg waves-effect waves-light m-b-5">Update</button>
                    <button type="button" id="btnBack" class="update-button btn btn-success btn-rounded w-lg waves-effect waves-light m-b-5">Back</button>
                </div>
            </div>
            </form>
        </div>

        </div>
        
        
    </div>
    </div>
</div>
@endsection
<script src="{{ asset('js/jquery.min.js') }}"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/bootstrap-datepicker.js') }}"></script>
<script src="{{ asset('js/expense.js') }}"></script>