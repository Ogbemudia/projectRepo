$.ajaxSetup({
    cache: false
});
$('#search').keyup(function() {
    $('#result').html('');
    $('#state').val('');
    var searchField = $('#search').val();
    var expression = new RegExp(searchField, "i");
    $.getJSON('../api/read_allbooks.php', function(data) {
        var booksinfo2 = `<div class="bookall">`;
        $.each(data, function(key, value) {
            if (value.topic.search(expression) != -1 || value.abstract.search(expression) != -1 || value.book_id.search(expression) != -1 || value.category.search(expression) != -1 || value.book_types.search(expression) != -1) {

                Id = value.id;


                var category = value.category;
                var bType = value.book_types;

                var topic = value.topic;
                var abstract = value.abstract;
                var introduction = value.introduction;
                var cost = value.cost;

                var bookId = value.book_id;

                //var str = abstract;
                if (abstract.length > 200) abstract = abstract.substring(0, 300);


                booksinfo2 += `<div style="margin-bottom:3%;" class="book_item">
                
                
                <a href="javascript:void(0)" class='view' data-value='` + Id + `'><h6 class="margin-bottom-15" style="text-align: left;" id="view1">` + topic + `</h6></a>
                    <h7>Abstract</h7>
                        <p data-max-characters="20" style="margin-bottom:3%;">` + abstract + `...<a href="javascript:void(0)" class='view' data-value='` + Id + `'>More</a></p> 
                        <span> <p><b>Cost: </b><span>&#8358;</span>` + cost + ` || <b>Bood Id : </b>` + bookId + `|| <b>Category: </b>` + category + ` || <b>Type: </b>` + bType + `</p></span>

                    <hr>
                    
                    </div>`;

            }
        });
        booksinfo2 += `</div>`;
        $('.welcom').css('display', 'none');

        $('.heads4').css('display', 'none');
        $('#proAll').html(booksinfo2);
        $('#proAllP').html(booksinfo2);

        $('.view').click(function() {
            ID = $(this).data('value');
            $.fn.view_book(ID);
        });



        $(".pagination").html('');

        if (searchField == '') {
            $('.welcom').css('display', 'block');

            $('.heads4').css('display', 'block');
            $.fn.readBank();
            $.fn.readMainBooks();
            // $('#proAll').html(message);
        }
    });
})