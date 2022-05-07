$('#submitC').click(function() {

        if ($('#downloadB').val() == '') {
            $("#downloadB").css('border', '2px solid red');
            // $("#h_downloadB").html('Enter Download Code');
            return false;
        } else {
            $("#downloadB").css('border', '2px solid green');
            $("#h_downloadB").html('');
            //var postcategory = $('#category').val();
        };
        var postCode = $("#downloadB").val();
        //$('#nameId').html(postCode);

        var formData = {

                code: postCode
            }
            // e.preventDefault();
        $.ajax({
                type: "POST",
                url: "../validation/download.php",
                data: formData,
                dataType: "json",
                encode: true,
                Cache: false,

            })
            .done(function(returnData) {

                var success, status, message;

                success = returnData.success;
                status = returnData.status;
                message = returnData.message;



                if (status == 201)
                // $('#nameId').html(message);
                    window.location.href("../upload/" + message);
                if (status == 403)
                    $("#downloadB").css('border', '2px solid red');
                alert(message)
                    //$('#nameId').html('Wrong code');

            });



    })
    /* ************end of downloads************* */