$.ajaxSetup({
    cache: false
});
$('#search').keyup(function() {
    $('#result').html('');
    $('#state').val('');
    var searchField = $('#search').val();
    var expression = new RegExp(searchField, "i");
    $.getJSON('api/read_books.php', function(data) {
        var message1 = `<div  class="row">`;
        $.each(data, function(key, value) {
            if (value.topic.search(expression) != -1 || value.book_id.search(expression) != -1 || value.category.search(expression) != -1 || value.book_types.search(expression) != -1) {


                docSize = value.size;

                var fSExt = new Array('Bytes', 'Kb', 'Mb', 'Gb'),
                    i = 0;
                while (docSize > 900) {
                    docSize /= 1024;
                    i++;
                }
                var exactSize = (Math.round(docSize * 100) / 100) + ' ' + fSExt[i];

                message1 += `<div style="margin-bottom:3%">
                    
                        <h5>Topic</h5>
                        <p class="margin-bottom-15"><b>` + value.topic + `</b></p>
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
                               <td style="border-style: hidden;">` + value.id + `</td>
                               <td style="border-style: hidden;">` + value.book_id + `</td>
                                <td style="border-style: hidden;">` + value.category + `</td>
                                <td style="border-style: hidden;">` + value.book_types + `</td>
                                <td style="border-style: hidden;"><span>&#8358;</span>` + value.cost + `</td>
                                <td style="border-style: hidden;">` + value.doc + `<br>` + exactSize + `</td>
                                <td style="border-style: hidden;">` + value.code + `</td>
                                <td style="border-style: hidden;">` + value.created + `</td>
                                <td style="border-style: hidden;">` + value.downloads + `</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        <button type="button" class=" btn-primary btn-sm download4 btntb1" id="view" data-value='` + value.topic + `' value='` + value.code + `' title="Download Book"><i class="fa fa-cloud-download" aria-hidden="true"></i></button>

                        <button type="button" class=" btn-primary btn-sm view btntb1" id="view" data-value='` + value.topic + `' value='` + value.id + `' title="View Book"><i class="fa fa-eye" aria-hidden="true"></i></button>
                        <button type="button" class=" btn-primary btn-sm che btntb1" id="che" data-value='` + value.topic + `' value='` + value.id + `' title="Update Book"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                        <button type="button" class=" btn-danger btn-sm delete1 btntb1" data-value='` + value.topic + `' value='` + value.id + `' title="Delete Book"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        <hr>
                        
                        </div>`;
            }
        });
        message1 += `</div>`;
        $('#allItems').html(message1);

        $('.download4').click(function() {
            ID = $(this).val();
            $.fn.download_books(ID);
            //$('#nameId').html(ID);
        });

        $('.che').click(function() {
            ID = $(this).val();
            $.fn.updatebooks(ID);
        });

        $('.delete1').click(function() {
            ID = $(this).val();
            title1 = $(this).data('value');
            $.fn.delete_book(ID, title1);
        });

        $('.view').click(function() {
            ID = $(this).val();
            $.fn.view_book(ID);
        });



        $(".pagination").html('');

        if (searchField == '') {
            $.fn.books();
            // $('#proAll').html(message);
        }
    });
})