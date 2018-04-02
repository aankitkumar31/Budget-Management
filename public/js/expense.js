var myExpenseTable;

$(document).ready(function () {   

    bindExpenses('', '', '');  

    myExpenseTable = $('#myExpenseTable').dataTable({
        "bFilter": true,
        "responsive": true,
        "processing": true,
        "sPaginationType": "full_numbers",
        "rowReorder": {
            "selector": 'td:nth-child(2)'
        },
        "fnDrawCallback": function (oSettings) {
            $('.faUpdate').unbind();
            $('.faUpdate').on('click', function () {
                debugger;
                var dataId = $(this).parent().attr('data-id');
                var rowData = myExpenseTable.fnGetData($(this).parent().parent());

                $('#txtPayeeName').val(rowData[1]);
                $('#txtAmount').val(rowData[2]);
                $('#txtRemarks').val(rowData[5]);
                $('#txtTransactionType').val(rowData[3]);
                $('#txtTransactionDate').val(rowData[6]);
                $('#txtTransactionMode').val(rowData[4]);

                $($('.nav-tabs a')[1]).click();
                $('.updateBtn').show();
                $('.updateBtn').attr('data-id', dataId);
                $('.createBtn').hide();
                //updateExpense(dataId);
            })
        },

        /*False sort for following columns*/
        aoColumnDefs: [
            { 'bSortable': false, 'aTargets': [0, 3, 4, 5] }
        ]
    });

    $('.txtInput').keypress(function () {
        $(this).next().text('')
    })

    $('#btnSave').on('click', function () {
        var flag = false;
        var payeeName = $('#txtPayeeName').val();
        var amount = $('#txtAmount').val();
        var remarks = $('#txtRemarks').val();
        var transType = $('#txtTransactionType').val();
        var transDate = $('#txtTransactionDate').val();
        var transMode = $('#txtTransactionMode').val();        

        if (payeeName == "") {
            $('#txtPayeeNameError').text('Please enter payee name');
            flag = true;
        }
        if (amount == "") {
            $('#txtAmountError').text('Please enter amount');
            flag = true;
        }
        if (transDate == "") {
            $('#txtTransactionDateError').text('Please enter transaction date');
            flag = true;
        }
        if (transMode == "") {
            $('#txtTransactionModeError').text('Please enter mode of transaction');
            flag = true;
        }

        if (flag == true) {
            return false;
        }

        var postData = {};
        postData.payeeName = payeeName;
        postData.amount = amount;
        postData.remarks = remarks;
        postData.transType = transType;
        postData.transDate = transDate;
        postData.transMode = transMode;
        postData.operation = "save"
        $.ajax({
            type: "POST",
            data: postData,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: baseUrl + 'saveExpense',
            success: function (result) {
                debugger;
                clearDetails()
                $('.spnAlertBox').text("Saved Successfully...!!!")
                $("#alert-box").show();
                setTimeout(function () {
                    $("#alert-box").hide();
                    $($('.nav-tabs a')[0]).click();
                }, 3000);
            }
        });
    })

    $('#btnUpdate').on('click', function () {
        var flag = false;
        var payeeName = $('#txtPayeeName').val();
        var amount = $('#txtAmount').val();
        var remarks = $('#txtRemarks').val();
        var transType = $('#txtTransactionType').val();
        var transDate = $('#txtTransactionDate').val();
        var transMode = $('#txtTransactionMode').val();
        var dataId = $('.updateBtn').attr('data-id');

        if (payeeName == "") {
            $('#txtPayeeNameError').text('Please enter payee name');
            flag = true;
        }
        if (amount == "") {
            $('#txtAmountError').text('Please enter amount');
            flag = true;
        }
        if (transDate == "") {
            $('#txtTransactionDateError').text('Please enter transaction date');
            flag = true;
        }
        if (transMode == "") {
            $('#txtTransactionModeError').text('Please enter mode of transaction');
            flag = true;
        }

        if (flag == true) {
            return false;
        }

        var postData = {};
        postData.payeeName = payeeName;
        postData.amount = amount;
        postData.remarks = remarks;
        postData.transType = transType;
        postData.transDate = transDate;
        postData.transMode = transMode;
        postData.dataId = dataId;
        $.ajax({
            type: "POST",
            data: postData,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: baseUrl + 'updateExpense',
            success: function (result) {
                debugger;
                clearDetails()
                $('.spnAlertBox').text("Updated Successfully...!!!")
                $("#alert-box").show();
                setTimeout(function () { 
                    $("#alert-box").hide(); 
                    $($('.nav-tabs a')[0]).click();
                }, 3000);
            }
        });
    })

    $('#btnReset').click(function () {
        clearDetails()
    })

    $('#btnViewReset').click(function () {
        $('.txtInput').val('');
        bindExpenses('', '', '');
    })

    $('#btnSearch').on('click', function () {
        var fromDate = $('#txtFromDate').val();
        var toDate = $('#txtToDate').val();
        var transType = $('#txtTransactionType').val();
        bindExpenses(fromDate, toDate, transType);
    });

    $('#btnBack').click(function(){
        $($('.nav-tabs a')[0]).click();
        $('.updateBtn').hide();
        $('.createBtn').show();
    });
});

jQuery.fn.ankit = function (param) {
    debugger;
}

function test(params) {
    debugger;
}

function clearDetails() {
    $('.txtInput').val('');
    $('.txtInput').siblings().text('');
    $('#txtTransactionType').val('Cr');
    $('#txtTransactionDate').val(todayDate());
}

function saveMarkExpenses(dataId) {
    var postData = {
        dataId: dataId,
        operation: "saveCompletedExpenses"
    }

    $.ajax({
        type: "POST",
        data: postData,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: baseUrl + 'saveCompletedExpenses',
        success: function (result) {
            debugger;
            bindExpenses('', '', '');
            $('.spnAlertBox').text("Saved Successfully...!!!")
            $("#alert-box").show();
            setTimeout(function () { $("#alert-box").hide(); }, 3000);
        }
    });
}

function bindExpenses(fromDate, toDate, transType) {
    var postData = {
        operation: "search",
        fromDate: fromDate,
        toDate: toDate,
        transType: transType
    }
    $.ajax({
        type: "POST",
        data: postData,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: baseUrl + 'search',
        success: function (result) {
            debugger;
            //var parseData = JSON.parse(result);
            var parseData = result;
            myExpenseTable.fnClearTable();
            var totalAmount = 0;
            var crAmount = 0;
            var dbAmount = 0;
            $.each(parseData, function (i, v) {
                var payeeName = v.payee_name;
                var amount = v.amount;
                var createdDate = v.created_date;
                var remarks = v.remarks;
                var expenseStatus = v.expense_status;
                var dataId = v.id;
                var completedDate = v.completed_date;
                if (completedDate != null){
                    completedDate = completedDate.split(' ');
                    completedDate = completedDate[0];
                }
                var transType = v.trans_type;
                var transMode = v.trans_mode;
                var status = '';

                totalAmount += parseInt(amount);
                if (transType == 'Cr') {
                    crAmount += parseInt(amount);
                }
                else {
                    dbAmount += parseInt(amount);
                }

                if (expenseStatus == 'C') {
                    status = '<span>' + completedDate + '</span>'
                }
                else {
                    status = '<span data-id=' + dataId + ' class="center">'+
                        '<i class="fa fa-pencil faTableIcon faUpdate" aria-hidden="true" title="Update"></i>'+
                        '<i class="fa fa-trash faTableIcon faDelete" onClick="deleteExpense(' + dataId+')" aria-hidden="true" title="Delete"></i>'+
                        '<i class="fa fa-check faTableIcon faComplete" onClick="saveMarkExpenses(' + dataId +')" aria-hidden="true" title="Complete"></i>'+
                            '</span>';
                }

                myExpenseTable.fnAddData([i + 1, payeeName, amount, transType, transMode, remarks, createdDate, status])
            })
            $('#txtTotalAmount').text(totalAmount);
            $('#lblTotalCr').text('Rs. ' + crAmount);
            $('#lblTotalDb').text('Rs. ' + dbAmount);
        }
    });
}


function deleteExpense(id) {
    var postData = {
        dataId: id
    }

    $.ajax({
        type: "POST",
        data: postData,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: baseUrl + 'deleteExpense',
        success: function (result) {
            debugger;
            bindExpenses('', '', '');
            $('.spnAlertBox').text("Deleted Successfully...!!!")
            $("#alert-box").show();
            setTimeout(function () { $("#alert-box").hide(); }, 3000);
        }
    });
}


