$(document).ready(function() {
    $('.link').click(function () {
        $(this).toggleClass('active')
    })
    $('.menu-item').on('click', function (e) {
        e.preventDefault();
        if ($('.add-nav').hasClass('hide')) {
          $('.add-nav').removeClass('hide')
          $('.add-nav').addClass('show')
        } else {
          $('.add-nav').addClass('hide')
          $('.add-nav').removeClass('show')
        }
    })
});
