var myDataTble;
$(document).ready(function(){
    bindCustomRow();
    bindData();
    $('#txtTransactionDate').val(todayDate())

    myDataTble = $('#myExpenseTable').dataTable({
        "bFilter": true,
        "responsive": true,
        "processing": true,
        "sPaginationType": "full_numbers",
        "rowReorder": {
            "selector": 'td:nth-child(2)'
        },
        "fnDrawCallback": function (oSettings) {            
            
        },

        /*False sort for following columns*/
        aoColumnDefs: [
            { 'bSortable': false, 'aTargets': [0] }
        ]
    });

    $('#btnAdd').on('click',function(){
        var tblBody = $('.tblBody').children();
        /* if ($('#txtTransactionDate').val() == '') {
            $('#txtTransactionDateError').text('Plese select date');
            return false;
        } */

        for (var i = 0; i < tblBody.length; i++) {            
            var amount = $($(tblBody[i]).children()[0]).children().val();
            var type = $($(tblBody[i]).children()[1]).children().val();
            var reason = $($(tblBody[i]).children()[2]).children().val();

            if (amount == ""){
                $('.error').text('Please enter amount');
                $('.error').fadeIn(1000);
                $('.error').delay(3000).fadeOut(1000);
                return false;
            }
            if (type == "") {
                $('.error').text('Please select transaction type');
                $('.error').fadeIn(1000);
                $('.error').delay(3000).fadeOut(1000);
                return false;
            }
            if (reason == "") {
                $('.error').text('Please enter reason');
                $('.error').fadeIn(1000);
                $('.error').delay(3000).fadeOut(1000);
                return false;
            }
        }
        bindCustomRow();
    });

    $('.tblBody').on('click','.faRemove',function(){
        debugger;
        var tblBody = $('.tblBody').children();
        if (tblBody.length > 1){
            $(this).parent().parent().remove();
        }        
    })

    
    $('#btnSave').on('click', function () {
        debugger;
        var tblBody = $('.tblBody').children();
        var dataArr = [];
        for (var i = 0; i < tblBody.length; i++) {
            var obj = {};
            obj.date = $('#txtTransactionDate').val();
            obj.amount = $($(tblBody[i]).children()[0]).children().val();
            obj.type = $($(tblBody[i]).children()[1]).children().val();
            obj.reason = $($(tblBody[i]).children()[2]).children().val();
            dataArr.push(obj);
        }

        console.log(dataArr);
        var postData = {};
        postData.dataArr = JSON.stringify(dataArr);
        //postData.dataArr = dataArr;

        $.ajax({
            type: "POST",
            data: postData,
            
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: baseUrl + 'saveDailyExpense',
            dataType: 'json',
            success: function (result) {
                debugger;
                if (result == true){
                    $('.spnAlertBox').text("Saved Successfully...!!!")
                    $("#alert-box").show();
                    clearDetails();
                }               
                
            }
        });

    })
    
});

function bindCustomRow(){
    var html = '<tr>'+
                    '<td width = "25%">'+
                        '<input type="number" class="form-control"> '+
                    '</td> '+
                    '<td> '+
                        '<select class="form-control" id="txtTransactionTypeSearch"> '+
                            '<option value="">--Select--</option> '+
                            '<option value="Cr">Credit (Cr.)</option> '+
                            '<option value="Db">Debit (Db.)</option> '+
                        '</select> '+
                    '</td> '+
                    '<td width="50%"> '+
                        '<input type="text" class="form-control"> '+
                    '</td> '+
                    '<td class="text-center"> '+
                        '<i class="fa fa-close faTableIcon faRemove"></i> '+
                   ' </td> '+
                '</tr>';
    $('.tblBody').append(html);
}

function bindData() {
    $.ajax({
        type: "GET",
        data: '',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: baseUrl + 'showDailyExpenses',
        dataType: 'json',
        success: function (result) {
            debugger;
            //var parseData = JSON.parse(result);
            var parseData = result;
            myDataTble.fnClearTable();
            var totalAmount = 0;
            var crAmount = 0;
            var dbAmount = 0;
            $.each(parseData, function (i, v) {
                var date = v.date;
                var amount = v.amount;
                var trans_type = v.trans_type;
                var reason = v.reason;                
                var dataId = v.id;                

                totalAmount += parseInt(amount);

                if (trans_type == 'Cr'){
                    crAmount += parseInt(amount);
                }
                else{
                    dbAmount += parseInt(amount);
                }
                
                var status = '<span data-id=' + dataId + ' class="center">' +
                    '<i class="fa fa-trash faTableIcon faDelete" onClick="deleteExpense(' + dataId + ')" aria-hidden="true" title="Delete"></i>' +
                    '</span>';
                

                myDataTble.fnAddData([i + 1, date, amount, trans_type, reason, status])
            })
            $('#txtTotalAmount').text('Rs. ' +totalAmount);
            $('#lblTotalCr').text('Rs. ' +crAmount);
            $('#lblTotalDb').text('Rs. ' +dbAmount);
        }
    });
}

function clearDetails() {
    $('.tblBody').html('');
    $('#txtTransactionDate').val(todayDate());
    bindCustomRow();
    setTimeout(function () {
        $("#alert-box").hide();
        $($('.nav-tabs a')[0]).click();
    }, 3000);
}