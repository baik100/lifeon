$(function () {
    lifeon.init();
});

const lifeon = {

    init : function () {

        lifeon.onSearch();
        lifeon.handleSideOpen();
        lifeon.loadImages();
        lifeon.fileLodaer();
        lifeon.navTab();
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
    },

    navTab : function () {
        const defaultIndex = 0;

        $('.tab-nav').on('click',function () {
            const self = $(this);
            const tabContent = $('.tab-content');

            self.addClass('on').siblings().removeClass('on');

            // const dataPanel = $this.attr('data-panel');
            const dataPanel = self.data('tab');

            tabContent.hide();
            $(dataPanel).show();
        }).eq(defaultIndex).trigger('click');
    },

    loadImages : function () {
        const $grid = $('.grid').masonry({
            itemSelector: '.grid-item',
            columnWidth: '.grid-item',
            percentPosition: true,
            horizontalOrder: true

        })

        $grid.imagesLoaded().progress( function() {
            $grid.masonry('layout');
        });
    },

    fileLodaer : function () {
        $('#fileLoader').on('change',function () {
            const value = $(this).val();
            const filename = value.split('\\').pop();

            $('.filename').text(filename);
        })
    },


};