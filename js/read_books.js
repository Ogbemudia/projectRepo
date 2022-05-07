$(document).ready(function() {
    /*************************************************** Read Books ****************************************************************************** */

    $.fn.readBooks = function() {
        var Id;

        $.ajax({

            type: "GET",
            url: "../api/recentdownload.php",
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

                var topic = messages.topic;
                var abstract = messages.abstract;
                var introduction = messages.introduction;
                var cost = messages.cost;

                var bookId = messages.book_id;




                booksinfo += `<div style="margin-bottom:3%;" class="book_item">
                
                <a href="javascript:void(0)" class='view' data-value='` + Id + `'>
                    <h6 class="margin-bottom-15" style="padding:2%;" id="view1">` + topic + `</h6>
                    
                    </a>
                    <hr>
                    
                    </div>`;
                // console.log(message);
            });

            booksinfo += `</div>`;



            $('.homeT').html(booksinfo);
            /*  $('#nameId').html('Books');
             $('#titleItem').html('Books'); */



            $('.view').click(function() {
                ID = $(this).data('value');
                $.fn.view_book(ID);
            });





        }, "json");



    }

    $.fn.readMainBooks = function() {
        var Id;

        $.ajax({

            type: "GET",
            url: "../api/read_allbooks.php",
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

                var topic = messages.topic;
                var abstract = messages.abstract;
                var introduction = messages.introduction;
                var cost = messages.cost;

                var bookId = messages.book_id;

                //var str = abstract;
                if (abstract.length > 200) abstract = abstract.substring(0, 300);


                booksinfo += `<div style="margin-bottom:3%;" class="book_item">
                
                
                <a href="javascript:void(0)" class='view' data-value='` + Id + `'><h6 class="margin-bottom-15" style="text-align: left;" id="view1">` + topic + `</h6></a>
                    <h7>Abstract</h7>
                        <p data-max-characters="20" style="margin-bottom:3%;">` + abstract + `...<a href="javascript:void(0)" class='view' data-value='` + Id + `'>More</a></p> 
                        <span> <p><b>Cost: </b><span>&#8358;</span>` + cost + ` || <b>Bood Id : </b>` + bookId + `|| <b>Category: </b>` + category + ` || <b>Type: </b>` + bType + `</p></span>

                    <hr>
                    
                    </div>`;
                // console.log(message);
            });

            booksinfo += `</div>`;



            $('#proAll').html(booksinfo);
            /*  $('#nameId').html('Books');
             $('#titleItem').html('Books'); */



            $('.view').click(function() {
                ID = $(this).data('value');
                $.fn.view_book(ID);
            });

            /* $('.download').click(function() {
                ID = $(this).val();
                //$('#nameId').html(ID);
                $.fn.download_books(ID);
            }); */



        }, "json");



    }



    /**************************************Categories**********************************************/

    $.fn.category = function() {
        //var catg

        $.ajax({

            type: "GET",
            url: "../api/read_allcategory.php",
            //data: formData,
            dataType: "json",
            encode: true,
            Cache: false,
            // setTimeout();

        })

        .done(function(messages) {



            var booksCat = `<span>`;

            $.each(messages, function(i, messages) {

                Id = messages.id;


                var category = messages.category;




                booksCat += `<span">

                <li class="sidebar-item categ " data-value='` + category + `' >
                                <a href="javascript:void(0)" class='sidebar-link' id='catid'>

                                    <span class="categories">` + category + `</span>

                        </a>
                        </li>
                
               
                    
                    </span>`;
                // console.log(message);
            });

            booksCat += `</span>`;



            $('.cats').html(booksCat);





            $('.categ').click(function() {
                var w = window.innerWidth;
                if (w < 1200) {
                    $('#sidebar').removeClass('active');
                }

                var catg = $(this).data('value');
                $.fn.categ_book(catg);
                //$('.nameId').html(catg);

            });



        }, "json");



    };

    /*******************************Read book by category*************************************************/

    $.fn.categ_book = function(catg) {
            var catg3 = catg;
            // $('.nameId').html(catg3);


            $.get("api/bookbycat.php?category=" + catg3, function(messages) {

                var catinfo = `<span>Available Project Topics & Materials in `;


                var booksinfo = `<div class="bookall">`;
                $.each(messages, function(i, messages) {
                    var category = messages.category;
                    var bType = messages.book_types;

                    var topic = messages.topic;
                    var abstract = messages.abstract;
                    var introduction = messages.introduction;
                    var cost = messages.cost;

                    var bookId = messages.book_id;
                    var Id = messages.id;

                    catinfo += `<span>` + category + `<span>`;
                    if (abstract.length > 200) abstract = abstract.substring(0, 300);

                    booksinfo += `<div style="margin-bottom:3%;" class="book_item">
                
                <a href="javascript:void(0)" class='view' data-value='` + Id + `'><h6 class="margin-bottom-15" style="text-align: left;" id="view1">` + topic + `</h6></a>
                    <h7>Abstract</h7>
                        <p data-max-characters="20" style="margin-bottom:3%;">` + abstract + `...<a href="javascript:void(0)" class='view' data-value='` + Id + `'>More</a></p> 
                        <span> <p><b>Cost: </b><span>&#8358;</span>` + cost + ` || <b>Bood Id : </b>` + bookId + `|| <b>Category: </b>` + category + ` || <b>Type: </b>` + bType + `</p></span>

                    <hr>
                    
                    </div>`;
                    // console.log(message);
                });

                booksinfo += `</div>`;
                catinfo += `<span>`;



                $('.welcom').html('');
                $('.heads4').html(catinfo);
                $('#proAll').html(booksinfo);
                $('#proAllP').html(booksinfo);

                $('.view').click(function() {
                    ID = $(this).data('value');
                    $.fn.view_book(ID);
                });
            })



        }
        /*********************************end of read book by cat************************************************************ */

    /**************************************View Book**********************************************/

    $.fn.view_book = function() {
            var Id = ID;
            var payDiv

            $.get("../api/read_singlebook.php?id=" + Id, function(messages) {
                var category = messages.category;
                var bType = messages.book_types;

                var topic = messages.topic;
                var abstract = messages.abstract;
                var introduction = messages.introduction;
                var cost = messages.cost;
                var bookId = messages.book_id;
                var Id = messages.id;

                $.get("../api/read_payment.php", function(messages) {
                    var payDiv = `<div><p><b>
                    Make payment of the sum of <span>&#8358;</span>` + cost + ` to the bank account displayed bellow</b>
                    </p>`;
                    $.each(messages, function(i, messages) {

                        var bankLogo = messages.bank_logo;
                        var bankName = messages.bank_name;
                        var accNumber = messages.acc_number;
                        var accName = messages.acc_name;
                        var phone = messages.phone;

                        payDiv += `<div>
               

                    
                    <div style="overflow-x:auto;">
                    <table style="width:100%" class="table table-striped">
                        <tr>
                            <th>Bank:</th>
                            <td>` + bankName + `</td>
                        </tr>
                        <tr>
                            <th>Account Number:</th>
                            <td>` + accNumber + `</td>
                        </tr>
                        <tr>
                            <th>Account Name:</th>
                            <td>` + accName + `</td>
                        </tr>
                    </table>
                    </div>
                    <h4>INSTRUCTIONS AFTER PAYMENT</h4>
                    <p>After making payment, kindly send the following:</p>
                    <ol>
                    <li>Your Full name</li>
                    <li>Your Active Email Address</li>
                    <li>Your Phone Number</li>
                    <li>Amount Paid</li>
                    <li>Project Topic</li>
                    <li>Project ID: <span style="color:red;"><b>` + bookId + `</b></span></li>
                    <li>Bank name you made payment from</li>
                    </ol>
                    <p>SEND DETAILS  As Text Message To Any Of The Phone Numbers,<span style="color: blue"> ` + phone + `</span></p>
                    <p>The the download code for the project will be sent to your phone, enter the code in the download bar and click download.</p>
                    </div>`;
                    });
                    payDiv += `</div>`;
                    $('.bookPay').html(payDiv);
                });

                var category = messages.category;
                var bType = messages.book_types;

                var topic = messages.topic;
                var abstract = messages.abstract;
                var introduction = messages.introduction;
                var cost = messages.cost;
                var bookId = messages.book_id;
                var Id = messages.id;


                var viewBook = `<div class=" style="width:60%; border:red solid 1px; ">
                    
                    <div>
                    <h4>` + topic + `</h4><hr>
                    <h4>Abstract</h4>
                    <p style="margin-bottom:3%;">` + abstract + `</p>
                    <h4>Introduction</h4>
                    <p style="margin-bottom:3%;">` + introduction + `</p>
                    </div>
                    <div style="margin-bottom:3%;">
                    
                   <span style="margin-bottom:3%;"> <p><b>Cost: </b><span>&#8358;</span>` + cost + ` || <b>Bood Id : </b>` + bookId + `|| <b>Category: </b>` + category + ` || <b>Type: </b>` + bType + `. <br> Download This Book
                   <button type="button" class=" btn-primary btn-sm download btntb1" id="download" title="Download This Book" style="margin-bottom:3%;"><i class="fa fa-cloud-download" aria-hidden="true"></i></button>

                   </p></span>
                    
                    </div>
                    <div id="bookP" class="bookPay" style="display: none;" style="margin-bottom:3%;">
                    </div>

                        
                    
                    <button type="button" class="btn btn-danger cancel1" style="margin-bottom:3%;">Cancel</button>
                    </div>`;


                $('.welcom').html('');
                $('.heads4').html('');
                $('#proAll').html(viewBook);
                $('#proAllP').html(viewBook);
                //close update
                $(".cancel1").click(function() {
                    $.fn.readMainBooks();
                    $.fn.readBank();
                })

                $('.download').click(function() {
                    $('.bookPay').css('display', 'block');

                });


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





})