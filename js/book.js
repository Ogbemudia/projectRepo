$(document).ready(function() {
    /*************************************************** Read Books ****************************************************************************** */

    $.fn.books = function() {

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



            var Id;

            $.ajax({

                type: "GET",
                url: "../api/read_books.php",
                //data: formData,
                dataType: "json",
                encode: true,
                Cache: false,
                // setTimeout();

            })

            .done(function(messages) {



                var booksinfo = `<div class="bookall">`;

                $.each(messages, function(i, messages) {

                    Id = messages.id;


                    var category = messages.category;
                    var bType = messages.book_types;
                    var doc = messages.doc;
                    var topic = messages.topic;
                    var abstract = messages.abstract;
                    var introduction = messages.introduction;
                    var cost = messages.cost;
                    var downloads = messages.downloads;
                    var uploadedBy = messages.created_by;
                    var created = messages.created;
                    var docSize = messages.size;
                    var code = messages.code;
                    var bookId = messages.book_id;


                    docSize = messages.size;

                    var fSExt = new Array('Bytes', 'Kb', 'Mb', 'Gb'),
                        i = 0;
                    while (docSize > 900) {
                        docSize /= 1024;
                        i++;
                    }
                    var exactSize = (Math.round(docSize * 100) / 100) + ' ' + fSExt[i];

                    booksinfo += `<div style="margin-bottom:3%" class="book_item">
                    
                        <h5>Topic</h5>
                        <h6>` + topic + `</h6>
                        
                        <div style="overflow-x:auto;">
                        <table class="table table-striped"> 
                            <thead>
                                <tr style="border-style: hidden;">
                                    <th style="border-style: hidden;">Id</th>
                                    <th style="border-style: hidden;">Book Id</th>
                                    <th style="border-style: hidden;">Book Category</th>
                                    <th style="border-style: hidden;">Book Type</th>
                                    <th style="border-style: hidden;">Cost</th>
                                    <th style="border-style: hidden;">Document</th>
                                    <th style="border-style: hidden;">Download Code</th>
                                    <th style="border-style: hidden;">Date Created</th>
                                    <th style="border-style: hidden;">No. Downloads</th>
                                    
                                    
                                </tr>
                            </thead>
                            <tbody>
                            <tr style="border-style: hidden;">
                               <td style="border-style: hidden;">` + Id + `</td>
                               <td style="border-style: hidden;">` + bookId + `</td>
                                <td style="border-style: hidden;">` + category + `</td>
                                <td style="border-style: hidden;">` + bType + `</td>
                                <td style="border-style: hidden;"><span>&#8358;</span>` + cost + `</td>
                                <td style="border-style: hidden;">` + doc + `<br>` + exactSize + `</td>
                                <td style="border-style: hidden;">` + code + `</td>
                                <td style="border-style: hidden;">` + created + `</td>
                                <td style="border-style: hidden;">` + downloads + `</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        
                        <button type="button" class=" btn-primary btn-sm download btntb1" id="download" data-value='` + messages.topic + `' value='` + code + `' title="Download Book"><i class="fa fa-cloud-download" aria-hidden="true"></i></button>
                        <button type="button" class=" btn-primary btn-sm view btntb1" id="view" data-value='` + messages.topic + `' value='` + Id + `' title="View Book"><i class="fa fa-eye" aria-hidden="true"></i></button>
                        <button type="button" class=" btn-primary btn-sm che btntb1" id="che" data-value='` + messages.topic + `' value='` + Id + `' title="Update Book"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                        <button type="button" class=" btn-danger btn-sm delete1 btntb1" data-value='` + messages.topic + `' value='` + Id + `' title="Delete Book"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        <hr>
                        
                        </div>`;
                    // console.log(message);



                });

                booksinfo += `</div>`;



                $('#allItems').html(booksinfo);
                $('#nameId').html('Books');
                $('#titleItem').html('Books');


                $('.che').click(function() {
                    ID = $(this).val();
                    $.fn.updatebooks(ID);
                });

                $('.delete1').click(function() {
                    ID = $(this).val();
                    title1 = $(this).data('value');

                    $.fn.delete_book4(ID);
                });

                $('.view').click(function() {
                    ID = $(this).val();
                    $.fn.view_book(ID);
                });

                $('.download').click(function() {
                    ID = $(this).val();
                    //$('#nameId').html(ID);
                    $.fn.download_books(ID);
                });



            }, "json");

            $("#addBooks").click(function() {
                $.fn.addBook();
                var w = window.innerWidth;
                if (w < 1200) {
                    $('#sidebar').removeClass('active')
                }
            })

        }
        /*************************************************** End Of Read Books ****************************************************************************** */




    $("#books").click(function() {
        $.fn.books();
        var w = window.innerWidth;
        if (w < 1200) {
            $('#sidebar').removeClass('active')
        }
    })





    /************************** ***********************Create Books ****************************** ********************************** */
    $.fn.addBook = function() {
        //$("#menutype").click(function() {



        $.get("../api/read_allcategory.php", function(messages) {

            var message = `<label for="category">Category <span style="color: red;">*</span></label><select name="category" id="category1" class="form-select" class="cat"><option value="">Select Category</option>`;
            $.each(messages, function(i, messages) {
                var cate = messages.category;
                var id = messages.id;
                message += `<option value="` + cate + `">` + cate + `</option>`;

            });

            message += `<span class="help-block" id="h_category"></span></select>`;


            $('.category1').html(message);
        });



        $.get("../api/read_allbooktype.php", function(messages) {

            var message = `<label for="book_type1">Book Type <span style="color: red;">*</span></label><select name="book_type" id="book_type1" class="form-select book_type1" ><option value="">Select Book Type</option>`;
            $.each(messages, function(i, messages) {
                var bookType = messages.name;
                var id = messages.id;
                message += `<option value="` + bookType + `">` + bookType + `</option>`;

            });

            message += `<span class="help-block" id="h_book_type"></span></select>`;


            $('.booktype1').html(message);
        });





        var form1 = `<div class="wrapper">
                            
                
                <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
                
                <form onsubmit="return false;">
                    <div class="form-group">
                        <label>Upload Document </label>
                        <input  class="form-control" id="file" type="file" name="file" placeholder="File"/>                        
                        <span class="help-block" id="h_file"></span>
                    </div>

                    <div class="form-group category1">
                        
                    </div>
    
                    <div class="form-group booktype1">
                        
                    </div>
    
                    <div class="form-group">
                        <label>Cost of Book <span style="color: red;">*</span></label>
                        <input type="text" name="cost" class="form-control" placeholder="Cost of Book " id="cost">
                        <span class="help-cost" id="h_cost"></span>
                    </div> 

                    <div class="form-group">
                        <label>Topic <span style="color: red;">*</span></label>
                        <input type="text" name="topic" class="form-control" placeholder="Book Topic " id="topic">
                        <span class="help-block" id="h_topic"></span>
                    </div>
    
                                                        
                    <div class="form-group">
                        <label>Abstract <span style="color: red;">*</span></label>
                        <textarea class="form-control" id="abstract" rows="3" name="abstract"></textarea>    
                        <span class="help-block" id="h_abstract"></span>
                    </div>

                    <div class="form-group">
                        <label>Introduction <span style="color: red;">*</span></label>
                        <textarea class="form-control" id="introduction" rows="3" name="introduction"></textarea>    
                        <span class="help-block" id="h_introductiont"></span>
                    </div>
                                    
                                    
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit" id="submit">
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>                           
                    </div>
    
                </form>
                          
            </div>`;




        $('#allItems').html(form1);
        $('#nameId').html('Add New Book');


        //$(".pagination").html('');

        //close update
        $(".cancel1").click(function() {
            $.fn.books();
        })

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
                $("#h_file").html("Please upload document");
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
            if ($('#category1').val() == '') {
                $("#category1").css('border', '2px solid red');
                $("#h_category").html('Select The Book Category');
                return false;
            } else {
                $("#category1").css('border', '2px solid green');
                $("#h_category").html('');
                //var postcategory = $('#category').val();
            };


            if ($('#book_type1').val() == '') {
                $("#book_type1").css('border', '2px solid red');
                $("#h_booktype").html('Select The Book Type');
                return false;
            } else {
                $("#book_type1").css('border', '2px solid green');
                $("#h_book_type").html('');
                //var postType = $('#book_type').val();
            };

            if ($("#cost").val() == '') {
                $("#cost").css('border', '1px solid red');
                $("#h_cost").html('Enter Cost of Book');
                return false;
            } else {
                $("#cost").css('border', '2px solid green');
                $("#h_cost").html('');
                //var postcost = $("#cost").val();
                //return true;
            };

            if ($("#topic").val() == '') {
                $("#topic").css('border', '1px solid red');
                $("#h_topic").html('Enter Book Topic');
                return false;
            } else {
                $("#topic").css('border', '2px solid green');
                $("#h_topic").html('');
                //var posttopic = $("#topic").val();
                //return true;
            };



            if ($("#abstract").val() == '') {
                $("#abstract").css('border', '1px solid red');
                $("#h_abstract").html('Please enter Abstract');
                return false;
            } else {
                $("#abstract").css('border', '2px solid green');
                $("#h_abstract").html('');
                //var postabstract = $("#abstract").val();
                //return true;
            };

            if ($("#introduction").val() == '') {
                $("#introduction").css('border', '1px solid red');
                $("#h_introduction").html('Please enter Introduction');
                return false;
            } else {
                $("#introduction").css('border', '2px solid green');
                $("#h_introduction").html('');
                //var postintroduction = $("#introduction").val();
                //return true;
            };




            e.preventDefault();
            $.ajax({
                    type: 'POST',
                    url: '../api/create_books.php',
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
                        $.fn.books();
                    if (status == 403)
                        $.fn.logout();
                    console.log(returnData)
                });



        });

    }


    /************************** ***********************update Books ****************************** ********************************** */
    $.fn.updatebooks = function() {




        var category;
        var bType;
        var doc;
        var topic;
        var abstract;
        var introduction;
        var cost;


        var sid = ID; //$(this).data();
        $.get("../api/read_singlebook.php?id=" + sid, function(messages) {
            bId = messages.id;
            category = messages.category;
            bType = messages.book_types;
            doc = messages.doc;
            topic = messages.topic;
            abstract = messages.abstract;
            introduction = messages.introduction;
            cost = messages.cost;






            $.get("../api/read_allcategory.php", function(messages) {

                var message = `<label for="category">Book Category <span style="color: red;">*</span></label><select name="category" id="category1" class="form-select category1" ><option value="` + category + `">` + category + `</option>`;
                $.each(messages, function(i, messages) {
                    var category = messages.category;
                    var id = messages.id;
                    message += `<option value="` + category + `">` + category + `</option>`;

                });

                message += `<span class="help-block" id="h_category"></span></select>`;


                $('.category1').html(message);
            });



            $.get("../api/read_allbooktype.php", function(messages) {

                var message = `<label for="book_types">Book Type <span style="color: red;">*</span></label><select name="book_types" id="book_type1" class="form-select book_type1" ><option value="` + bType + `">` + bType + `</option>`;
                $.each(messages, function(i, messages) {
                    var bookType = messages.name;
                    var id = messages.id;
                    message += `<option value="` + bookType + `">` + bookType + `</option>`;

                });

                message += `<span class="help-block" id="h_booktype"></span></select>`;


                $('.booktype2').html(message);
            });




            var form1 = `<div class="wrapper">
                            
                
            <h5 style="text-align:center;">The fields marked with <span style="color: red;">*</span> are required.</h5>
            
            <form onsubmit="return false;">
                <div class="form-group">
                    <label>Upload Document </label>
                    <input  class="form-control" id="file" type="file" name="file" placeholder="File"/>                        
                    <span class="help-block" id="h_file"></span>
                </div>

                <div class="form-group category1">
                    
                </div>

                <div class="form-group booktype2">
                    
                </div>

                <div class="form-group">
                    <label>Cost of Book <span style="color: red;">*</span></label>
                    <input type="text" name="cost" class="form-control" placeholder="Cost of Book " id="topic" value="` + cost + `">
                    <span class="help-cost" id="h_cost"></span>
                </div> 

                <div class="form-group">
                    <label>Topic <span style="color: red;">*</span></label>
                    <input type="text" name="topic" class="form-control" placeholder="Book Topic " id="topic" value="` + topic + `">
                    <span class="help-block" id="h_topic"></span>
                </div>

                                                    
                <div class="form-group">
                    <label>Abstract <span style="color: red;">*</span></label>
                    <textarea class="form-control" id="abstract" rows="3" name="abstract">` + abstract + `</textarea>    
                    <span class="help-block" id="h_abstract"></span>
                </div>

                <div class="form-group">
                    <label>Introduction <span style="color: red;">*</span></label>
                    <textarea class="form-control" id="introduction" rows="3" name="introduction">` + introduction + `</textarea>    
                    <span class="help-block" id="h_introductiont"></span>
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
            $('#nameId').html('Update Books');
            //close update
            $(".cancel1").click(function() {
                $.fn.books();
            })






            //validating form
            $("form").submit(function(e) {

                /* validate file */
                /*  var file = $("#file").val();
                 if (file != '') {
                     //Determine the file size.
                     var file_size = $("#file")[0].files[0].size; //in MB
                     // $("#h_file").html("");

                     $("#file").css('border', '2px solid green');
                     $("#h_file").html("");

                 } else {
                     $("#file").css('border', '1px solid red');
                     $("#h_file").html("Please upload document");
                     $("#file").focus();
                     return false;

                 } */


                /* validate inputs */
                if ($('#category1').val() == '') {
                    $("#category1").css('border', '2px solid red');
                    $("#h_category").html('Select The Book Category');
                    return false;
                } else {
                    $("#category1").css('border', '2px solid green');
                    $("#h_category").html('');
                    //var postcategory = $('#category').val();
                };


                if ($('#book_type1').val() == '') {
                    $("#book_type1").css('border', '2px solid red');
                    $("#h_booktype").html('Select The Book Type');
                    return false;
                } else {
                    $("#book_type1").css('border', '2px solid green');
                    $("#h_booktype").html('');
                    //var postType = $('#book_type').val();
                };

                if ($("#cost").val() == '') {
                    $("#cost").css('border', '1px solid red');
                    $("#h_cost").html('Enter Cost of Book');
                    return false;
                } else {
                    $("#cost").css('border', '2px solid green');
                    $("#h_cost").html('');
                    //var postcost = $("#cost").val();
                    //return true;
                };

                if ($("#topic").val() == '') {
                    $("#topic").css('border', '1px solid red');
                    $("#h_topic").html('Enter Book Topic');
                    return false;
                } else {
                    $("#h_topic").css('border', '2px solid green');
                    $("#h_topic").html('');
                    //var posttopic = $("#topic").val();
                    //return true;
                };



                if ($("#abstract").val() == '') {
                    $("#abstract").css('border', '1px solid red');
                    $("#h_abstract").html('Please enter Abstract');
                    return false;
                } else {
                    $("#abstract").css('border', '2px solid green');
                    $("#h_abstract").html('');
                    //var postabstract = $("#abstract").val();
                    //return true;
                };

                if ($("#introduction").val() == '') {
                    $("#introduction").css('border', '1px solid red');
                    $("#h_introduction").html('Please enter Introduction');
                    return false;
                } else {
                    $("#introduction").css('border', '2px solid green');
                    $("#h_introduction").html('');
                    //var postintroduction = $("#introduction").val();
                    //return true;
                };




                e.preventDefault();
                $.ajax({
                        type: 'POST',
                        url: '../api/update_book.php',
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
                            $.fn.books();
                        if (status == 403)
                            $.fn.logout();
                        console.log(returnData)
                    });



            });


        })



    }


    /* ************popup delete************* */
    $.fn.delete_book4 = function() {
            var booktId = ID;
            var topic2 = title1;
            var modalPop = `<div class="popup-overlay active" id="delete21" style="height:40%; width:35%; border:red solid 1px;">
                      <div class="popup-link active" style="height:70%;">
                          <p style="height:60%;padding:3%;"><span style="color:red;">Are you sure you want to delete</span><br> <b><span class="del_acc">` + topic2 + `</span>?</b></p>
                          <div style="text-align:center; margin=10%;">
                          <form onsubmit="return false;">

                          <div class="form-group">
          
                                  <input type="hidden" name="id" class="form-control" id="bookid" value="` + booktId + `">
          
                          </div>
                          
                          <div class="form-group">
                                      <input type="submit" class="btn btn-primary btn-sm" value="Delete" id="submit">
                                      <button type="button" class="btn btn-danger btn-sm cancel1">Cancel</button>                           
                          </div>
                          
                      
                          </form>
                          </div>
                      </div>
                      <button class="btn btn-dark btn-sm closePop button1">Close</button>
                      </div>`;

            $('#proS').html(modalPop);


            $(document).on('click', '.closePop', function() {
                $('#proS').html('');
            });
            $(".cancel1").click(function() {
                $('#proS').html('');
            })


            //validating form
            $("form").submit(function(e) {
                //$('#proS').html('');

                //var dis = $(this).val();
                var postId = $("#bookid").val();
                var formData = {

                    id: postId
                }
                e.preventDefault();
                $.ajax({
                        type: "POST",
                        url: "../api/delete_books.php",
                        data: formData,
                        dataType: "json",
                        encode: true,
                        Cache: false,


                    })
                    .done(function(returnData) {

                        //var success, status, message;

                        var success = returnData.success;
                        var status = returnData.status;
                        var message = returnData.message;


                        alert(message)

                        if (status == 201)
                            $.fn.books();
                        $('#proS').html('');
                        if (status == 403)
                            $.fn.logout();
                        console.log(returnData)
                    });

            });


        }
        /* ************end of popup delete************* */



    /**************************************View Book**********************************************/

    $.fn.view_book = function() {
            var booktId = ID;

            $.get("../api/read_comsinglebook.php?id=" + booktId, function(messages) {
                var category = messages.category;
                var bType = messages.book_types;
                var doc = messages.doc;
                var topic = messages.topic;
                var abstract = messages.abstract;
                var introduction = messages.introduction;
                var cost = messages.cost;
                var downloads = messages.downloads;
                var uploadedBy = messages.created_by;
                var created = messages.created;
                var docSize = messages.size;
                var code = messages.code;
                var bookId = messages.book_id;


                docSize = messages.size;

                var fSExt = new Array('Bytes', 'Kb', 'Mb', 'Gb'),
                    i = 0;
                while (docSize > 900) {
                    docSize /= 1024;
                    i++;
                }
                var exactSize = (Math.round(docSize * 100) / 100) + ' ' + fSExt[i];

                var view = `<div class=" style="width:60%; border:red solid 1px; ">
                        
                        <div>
                        <h4>` + topic + `</h4><hr>
                        <h4>Abstract</h4>
                        <p style="margin-bottom:3%;">` + abstract + `</p>
                        <h4>Introduction</h4>
                        <p style="margin-bottom:3%;">` + introduction + `</p>
                        </div>
                        <div style="margin-bottom:3%;">
                        <p>Book category: ` + category + `</p>
                        <p>Book type: ` + bType + `</p>
                        <p>File Size: ` + exactSize + `Mb</p>
                        <p>File Cost: N` + cost + `</p>
                        <p>File Total downloads: ` + downloads + `</p>
                        <p>Book uploaded by: ` + uploadedBy + `</p>
                        <p>Download code: ` + code + `</p>
                        <p>Book Id: ` + bookId + `</p>
                        <p>Date uploaded: ` + created + `</p>

                        
                        </div>

                            
                        
                        <button type="button" class="btn btn-danger cancel1">Cancel</button>
                        </div>`;


                $('#allItems').html(view);
                $('#nameId').html('View Book');
                //close update
                $(".cancel1").click(function() {
                    $.fn.books();
                })

                // $('.del_acc').html(title1);

                // });

            });

        }
        /*************************************Downloads**********************************************/




    $.fn.download_books = function() {


            var postCode = ID;
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


                    //alert(message)
                    if (status == 201)
                    // $('#nameId').html(message);
                        window.location.replace("../upload/" + message);
                    if (status == 403)
                        $('#nameId').html('Wrong code');

                });



        }
        /* ************end of downloads************* */








});