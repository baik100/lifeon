$(function () {
    lifeon.init();
});

const lifeon = {

    init : function () {

        lifeon.onSearch();
        lifeon.handleSideOpen();
    },

    onSearch : function () {
        $('.search-group .search-box').on('click', function () {
            $('html,body').addClass('onSearch');
        })
        $('.search-group .btn-reset').on('click',function () {
            $('html,body').removeClass('onSearch');
        })
    },

    handleSideOpen : function () {
        $('.lon-btn-nav').on('click',function () {
            $('html,body').addClass('is-side-open');
        })
        $('.side-screen').on('click',function () {
            $('html,body').removeClass('is-side-open');
        })
    }
};