var baseUrl = window.location.protocol + "//" + window.location.host + "/";
$(document).ready(function () {

    $("#alert-box").hide();

    $('.datepicker').datepicker({
        autoclose: true
    });

    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });

    $(".navbar-right .dropdown").click(function () {
        $('.navbar-right .dropdown').toggleClass('open');
    });

});