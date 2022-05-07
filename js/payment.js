$(document).ready(function() {
    /*************************************************** Read Account ****************************************************************************** */

    $.fn.account = function() {

            fetch('../validation/validation.php', {
                    method: "POST"
                })
                .then(res => res.json())
                .then(returnData => {

                    var success, status, message;
                    success = returnData.success;
                    status = returnData.status;
                    message = returnData.message;

                    if (success == 0) {
                        sessionStorage.removeItem("users");
                        alert('Your session has expired')
                        location.href = "../admin/index.html"
                    }
                })




            paymentTable = `<div class="container-fluid col-12 containertable">
            <div class="table-responsive" style="box-shadow: 10px 10px 20px #2a2e33; padding: 2%;">
                <div class="" style="text-align: center;">
                </div>
                        
                <table class="tablemanager">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th class="disableFilterBy disableSort">Bank Logo</th>
                            <th>Bank Name</th>
                            <th>Account Number</th>
                            <th>Account Name</th>
                            <th>Contact Number</th>
                            <th>Date Created</th>
                            <th class="disableFilterBy disableSort">Actions</th>

                           
                        </tr>
                    </thead>
                    <tbody id="body">
                    </tbody>
                </table>

                <footer>
                    <button type="button" class="btn btn-danger btn-sm" id="close" title="Close Section"><i class="fa fa-times" aria-hidden="true"></i></button>  
                    <button type="button" class="btn btn-success btn-sm" id="addAcc" style="float:right" title="Add New Account"><i class="fa fa-plus" aria-hidden="true"></i></button>       
                                <i class="userid"></i>
                </footer>
              </div>
            </div>`;





            $('#allItems').html(paymentTable);
            $('#nameId').html('Payment');
            $('#titleItem').html('Payment');



            //close update
            $("#close").click(function() {
                $.fn.books();
                /* $('#allItems').html('');
                $('#nameId').html('');
                $('#titleItem').html(''); */
            });

            var paymentinfo;
            var Id;




            $.ajax({

                type: "GET",
                url: "../api/read_payment.php",
                //data: formData,
                dataType: "json",
                encode: true,
                Cache: false,
                // setTimeout();

            })

            .done(function(messages) {

                $.each(messages, function(i, messages) {

                    Id = messages.id;



                    paymentinfo = ` <tr>
                                    <td style="color: #0492C2;" class = "uid1">` + Id + `</td>
                                    <td> <img src="../upload/` + messages.bank_logo + `"alt="section image" class="img-responsive" style="height:50px; width:50px"></td>
                                    <td>` + messages.bank_name + `</td>
                                                
                                    
                                    <td>` + messages.acc_number + `</td>  
                                                    <td style="color: #FF8C00;">` + messages.acc_name + `</td>
                                                    
                                                    <td>` + messages.phone + `</td>
                                                    <td style="color: #0492C2;">` + messages.created + `</td>
                                                   
                                                
                                                    <td style="color: #FF0000;" class="mine">
                                                
                                                    <button type="button" class=" btn-primary btn-sm che btntb1" id="che"  value='` + Id + `' title="Update Account"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                    <button type="button" class=" btn-danger btn-sm delete1 btntb1" data-value='` + messages.acc_number + `' value='` + Id + `' title="Delete Account"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>`;
                    $('#body').append(paymentinfo)

                    $('.che').click(function() {
                        ID = $(this).val();
                        $.fn.updateAccount(ID);
                    });

                    $('.delete1').click(function() {
                        ID = $(this).val();
                        title1 = $(this).data('value');
                        $.fn.delete_Account(ID, title1);
                    });





                });


                //table manager.
                $(".tablemanager").tablemanager({
                    /* firstSort: [
                        [3, 0],
                        [2, 0],
                        [1, "asc"],
                    ],*/
                    disable: ["last"],
                    appendFilterby: true,
                    dateFormat: [
                        [4, "dd-mm-yyyy"]
                    ],
                    debug: true,
                    vocabulary: {
                        voc_filter_by: 'Search by',
                        voc_type_here_filter: 'Filter...',
                        voc_show_rows: 'Rows per page'
                    },
                    pagination: true,
                    showrows: [10, 15, 20, 37],
                    //disableFilterBy: [1]

                })


            }, "json");

            $("#addAcc").click(function() {
                $.fn.addAcc();
            })

        }
        /*************************************************** End Of Read Account ****************************************************************************** */




    $("#payment").click(function() {
        $.fn.account();
        var w = window.innerWidth;
        if (w < 1200) {
            $('#sidebar').removeClass('active')
        }
    })





    /************************** ***********************Create Account ****************************** ********************************** */
    $.fn.addAcc = function() {
        //$("#menutype").click(function() {


        var form1 = `<div class="wrapper">
                <div style="text-align:left; margin-bottom:30px">
                    <image id="preview" style="height: 75px; width: 100px; border-radius: 8px;"/>
                </div>
                            
                
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                    <div class="form-group">
                        <label>Upload Bank Logo </label>
                        <input  class="form-control" id="file" type="file" name="file" placeholder="Logo" accept="image/*" />                        
                        <span class="help-block" id="h_file"></span>
                    </div>

                        
                    <div class="form-group">
                        <label>Bank Name<span style="color: red;">*</span></label>
                        <input type="text" name="bank_name" class="form-control" placeholder="Bank Name" id="bank_name">
                        <span class="help-block" id="h_bank_name"></span>
                    </div> 

                    <div class="form-group">
                        <label>Account Number <span style="color: red;">*</span></label>
                        <input type="text" name="acc_number" class="form-control" placeholder="Account Number " id="acc_number">
                        <span class="help-block" id="h_acc_number"></span>
                    </div>
    
                                                        
                    <div class="form-group">
                        <label>Account Name <span style="color: red;">*</span></label>
                        <input type="text" name="acc_name" class="form-control" placeholder="Account Name " id="acc_name">
                        <span class="help-block" id="h_acc_name"></span>
                    </div>

                    <div class="form-group">
                        <label>Contact Number <span style="color: red;">*</span></label>
                        <input type="text" name="phone" class="form-control" placeholder="Phone Number" id="phone">
                        <span class="help-block" id="h_phone"></span>
                    </div>

                                                       
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                    </div>
    
                </form>
                          
            </div>`;




        $('#allItems').html(form1);
        $('#nameId').html('Add New Account Number');


        //$(".pagination").html('');

        //close update
        $(".cancel1").click(function() {
            $.fn.account();
        })

        //preview image
        function readImg(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#preview').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#file").change(function() {
            readImg(this);
        });

        //validating form
        $("form").submit(function(e) {

            /* validate image */
            var file = $("#file").val();
            if (file != '') {
                //Determine the file size.
                var file_size = $("#file")[0].files[0].size; //in MB
                // $("#h_file").html("");

                $("#file").css('border', '2px solid green');
                $("#h_file").html("");

            } else {
                $("#file").css('border', '1px solid red');
                $("#h_file").html("Please upload Bank Logo");
                $("#file").focus();
                return false;

            }

            /* else {
                           $("#file").css('border', '1px solid red');
                           $("#h_file").html("Please upload an image");
                           $("#file").focus();
                           return false;
                       } */

            /* validate inputs */
            if ($('#bank_name').val() == '') {
                $("#bank_name").css('border', '2px solid red');
                $("#h_bank_name").html('Please Enter Bank Name');
                return false;
            } else {
                $("#bank_name").css('border', '2px solid green');
                $("#h_bank_name").html('');
                //var postcategory = $('#category').val();
            };


            if ($('#acc_number').val() == '') {
                $("#acc_number").css('border', '2px solid red');
                $("#h_acc_number").html('Please Enter Account Number');
                return false;
            } else {
                $("#acc_number").css('border', '2px solid green');
                $("#h_acc_number").html('');
                //var postType = $('#book_type').val();
            };

            if ($("#acc_name").val() == '') {
                $("#acc_name").css('border', '1px solid red');
                $("#h_acc_name").html('Enter Account Name');
                return false;
            } else {
                $("#acc_name").css('border', '2px solid green');
                $("#h_acc_name").html('');
                //var postcost = $("#cost").val();
                //return true;
            };

            if ($("#phone").val() == '') {
                $("#phone").css('border', '1px solid red');
                $("#h_phone").html('Enter Contact Number');
                return false;
            } else {
                $("#phone").css('border', '2px solid green');
                $("#h_phone").html('');
                //var postcost = $("#cost").val();
                //return true;
            };


            e.preventDefault();
            $.ajax({
                    type: 'POST',
                    url: '../api/create_payment.php',
                    data: new FormData(this),
                    dataType: 'json',
                    contentType: false,
                    cache: false,
                    processData: false,
                })
                .done(function(returnData) {

                    var success, status, message;

                    success = returnData.success;
                    status = returnData.status;
                    message = returnData.message;


                    alert(message)
                    if (status == 201)
                        $.fn.account();
                    if (status == 403)
                        $.fn.logout();
                    console.log(returnData)
                });



        });

    }


    /************************** ***********************update Account ****************************** ********************************** */
    $.fn.updateAccount = function() {




        var bank_name;
        var acc_name;
        var acc_number;
        var phone;
        var logo;



        var sid = ID; //$(this).data();
        $.get("../api/read_singleacc.php?id=" + sid, function(messages) {
            bId = messages.id;
            bank_name = messages.bank_name;
            acc_name = messages.acc_name;
            acc_number = messages.acc_number;
            phone = messages.phone;
            logo = messages.bank_logo;







            var form1 = `<div class="wrapper">
            

            <div style="text-align:left; margin-bottom:30px">
                <image src="../upload/` + logo + `" id="preview" style="height: 75px; width: 100px; border-radius: 8px;"/>
            </div>
                            
                
            <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
            <form onsubmit="return false;">
                <div class="form-group">
                    <label>Upload Bank Logo </label>
                    <input  class="form-control" id="file" type="file" name="file" placeholder="Logo" accept="image/*" />                        
                    <span class="help-block" id="h_file"></span>
                </div>

                    
                <div class="form-group">
                    <label>Bank Name<span style="color: red;">*</span></label>
                    <input type="text" name="bank_name" class="form-control" placeholder="Bank Name" id="bank_name" value="` + bank_name + `">
                    <span class="help-block" id="h_bank_name"></span>
                </div> 

                <div class="form-group">
                    <label>Account Number <span style="color: red;">*</span></label>
                    <input type="text" name="acc_number" class="form-control" placeholder="Account Name " id="acc_number" value="` + acc_number + `">
                    <span class="help-block" id="h_acc_number"></span>
                </div>

                                                    
                <div class="form-group">
                    <label>Account Name <span style="color: red;">*</span></label>
                    <input type="text" name="acc_name" class="form-control" placeholder="Account Name " id="acc_name" value="` + acc_name + `">
                    <span class="help-block" id="h_acc_name"></span>
                </div>

                <div class="form-group">
                    <label>Contact Number <span style="color: red;">*</span></label>
                    <input type="text" name="phone" class="form-control" placeholder="Phone Number" id="phone" value="` + phone + `">
                    <span class="help-block" id="h_phone"></span>
                </div>
                <div class="form-group">
    
                            <input type="hidden" name="id" class="form-control" id="mtid" value="` + bId + `">
    
                            </div>    
                                                   
                <div class="form-group">
                    <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                    <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                </div>

            </form>
                      
                      
        </div>`;



            $('#allItems').html(form1);
            $('#nameId').html('Update Account');
            //close update
            $(".cancel1").click(function() {
                $.fn.account();
            })



            //preview image
            function readImg(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $('#preview').attr('src', e.target.result);
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            }



            //validating form
            $("form").submit(function(e) {



                /* validate inputs */
                if ($('#bank_name').val() == '') {
                    $("#bank_name").css('border', '2px solid red');
                    $("#h_bank_name").html('Please Enter Bank Name');
                    return false;
                } else {
                    $("#bank_name").css('border', '2px solid green');
                    $("#h_bank_name").html('');
                    //var postcategory = $('#category').val();
                };


                if ($('#acc_number').val() == '') {
                    $("#acc_number").css('border', '2px solid red');
                    $("#h_acc_number").html('Please Enter Account Number');
                    return false;
                } else {
                    $("#acc_number").css('border', '2px solid green');
                    $("#h_acc_number").html('');
                    //var postType = $('#book_type').val();
                };

                if ($("#acc_name").val() == '') {
                    $("#acc_name").css('border', '1px solid red');
                    $("#h_acc_name").html('Enter Account Name');
                    return false;
                } else {
                    $("#acc_name").css('border', '2px solid green');
                    $("#h_acc_name").html('');
                    //var postcost = $("#cost").val();
                    //return true;
                };

                if ($("#phone").val() == '') {
                    $("#phone").css('border', '1px solid red');
                    $("#h_phone").html('Enter Contact Number');
                    return false;
                } else {
                    $("#phone").css('border', '2px solid green');
                    $("#h_phone").html('');
                    //var postcost = $("#cost").val();
                    //return true;
                };



                e.preventDefault();
                $.ajax({
                        type: 'POST',
                        url: '../api/update_payment.php',
                        data: new FormData(this),
                        dataType: 'json',
                        contentType: false,
                        cache: false,
                        processData: false,
                    })
                    .done(function(returnData) {

                        var success, status, message;

                        success = returnData.success;
                        status = returnData.status;
                        message = returnData.message;


                        alert(message)
                        if (status == 201)
                            $.fn.account();
                        if (status == 403)
                            $.fn.logout();
                        console.log(returnData)
                    });



            });


        })



    }

    /* ************popup delete************* */
    $.fn.delete_Account = function() {
        var booktId = ID;
        var topic2 = title1;
        var modalPop = `<div class="popup-overlay active" id="delete21" style="height:40%; width:35%; border:red solid 1px;">
                    <div class="popup-link active" style="height:70%;">
                        <p style="height:60%;padding:3%;"><span style="color:red;">Are you sure you want to delete</span><br> <b><span class="del_acc">` + topic2 + `</span>?</b></p>
                        <div style="text-align:center; margin=10%;">
                        <form onsubmit="return false;">
                        
                        <div class="form-group">
                                    <input type="submit" class="btn btn-primary btn-sm" value="Delete" id="submit">
                                    <button type="button" class="btn btn-danger btn-sm cancel1">Cancel</button>                           
                        </div>
                        <div class="form-group">
        
                                <input type="hidden" name="id" class="form-control" id="sid" value="` + booktId + `">
        
                        </div>
                    
                        </form>
                        </div>
                    </div>
                    <button class="btn btn-dark btn-sm closePop button1">Close</button>
                    </div>`;

        $('#proS').html(modalPop);

        // $('.del_acc').html(title1);

        // });
        $(document).on('click', '.closePop', function() {
            $('#proS').html('');
        });
        $(".cancel1").click(function() {
            $('#proS').html('');
        })


        //validating form
        $("form").submit(function(e) {

            //var dis = $(this).val();
            var postId = $("#sid").val();
            var formData = {

                id: postId
            }
            e.preventDefault();
            $.ajax({
                    type: "POST",
                    url: "../api/delete_payment.php",
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


                    alert(message)
                    if (status == 201)

                        $.fn.account();
                    $('#proS').html('');
                    if (status == 403)
                        $.fn.logout();
                    console.log(returnData)
                });

        });


    };
    /* ************end of popup delete************* */











});