$(document).ready(function() {

    $( "#dob" ).datepicker({
        inline: true,
        dateFormat: "yy-mm-dd"
    });
    $( "#doj" ).datepicker({
        inline: true,
        dateFormat: "yy-mm-dd"
    });

    // parse a date in yyyy-mm-dd format
    function parseDate(input) {
        var parts = input.split('-');
        // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
    }

    var $dob = $("#dob")[0];
    var $doj = $("#doj")[0];

    /*$dob.value = parseDate($dob.value);
    $doj.value = parseDate($doj.value);*/

});
