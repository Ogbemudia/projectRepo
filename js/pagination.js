//Pagination

var numberOfItems = $(".bookall .book_item").length;

var limitPerPage = 8;
$(".bookall .book_item:gt(" + (limitPerPage - 1) + ")").hide();
var totalPages = Math.round((numberOfItems + 1) / limitPerPage);
$(".pagination").append("<li class='page-item'><a class='page-link' id='previous-page' href='javascrip:void(0)' aria-label='Previous'><span aria-hidden='true'>&laquo;</span></a></li>");


$(".pagination").append("<li class='page-item current-page active'><a class='page-link' href='javascrip:void(0)'>" + 1 + "</a></li>");
for (var i = 2; i <= totalPages; i++) {
    $(".pagination").append("<li class='page-item current-page'><a class='page-link' href='javascrip:void(0)'>" + i + "</a></li>");
}
$(".pagination").append("<li class='page-item'> <a class='page-link' id='next-page' href='javascrip:void(0)' aria-label='Next'><span aria-hidden='true'>&raquo;</span></a></li>");

$(".pagination li.current-page").on("click", function() {
    if ($(this).hasClass("active")) {
        return false;
    } else {
        var currentPage = $(this).index();

        $(".pagination li").removeClass("active");
        $(this).addClass("active");
        $(".bookall .book_item").hide();
        var grandTogtal = limitPerPage * currentPage;
        for (var i = grandTogtal - limitPerPage; i < grandTogtal; i++) {
            $(".bookall .book_item:eq(" + i + ")").show();
        }
    }


});
$("#next-page").on("click", function() {
    var currentPage = $(".pagination li.active").index();

    // alert(currentPage);
    if (currentPage === totalPages) {
        return false;
    } else {
        currentPage++;
        $(".pagination li").removeClass("active");

        $(".bookall .book_item").hide();
        var grandTogtal = limitPerPage * currentPage;
        for (var i = grandTogtal - limitPerPage; i < grandTogtal; i++) {
            $(".bookall .book_item:eq(" + i + ")").show();
        }
        $(".pagination li.current-page:eq(" + (currentPage - 1) + ")").addClass("active");
    }
});

$("#previous-page").on("click", function() {
    var currentPage = $(".pagination li.active").index();

    // alert(currentPage);
    if (currentPage === 1) {
        return false;
    } else {
        currentPage--;
        $(".pagination li").removeClass("active");

        $(".bookall .book_item").hide();
        var grandTogtal = limitPerPage * currentPage;
        for (var i = grandTogtal - limitPerPage; i < grandTogtal; i++) {
            $(".bookall .book_item:eq(" + i + ")").show();
        }
        $(".pagination li.current-page:eq(" + (currentPage - 1) + ")").addClass("active");
    }
});


//end of pagination