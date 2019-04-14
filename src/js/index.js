$(function () {
    lifeon.init();
});

const lifeon = {

    init : function () {

        lifeon.onSearch();
    },

    onSearch : function () {
        $('.search-group .search-box').on('click', function () {
            $('html,body').addClass('onSearch');
        })
        $('.search-group .btn-reset').on('click',function () {
            $('html,body').removeClass('onSearch');
        })
    },
};