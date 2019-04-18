$(function () {
    lifeon.init();
});

const lifeon = {

    init : function () {

        lifeon.onSearch();
        lifeon.handleSideOpen();
        lifeon.loadImages();
        lifeon.fileLodaer();
        lifeon.navActive();
        lifeon.historyBack();
        lifeon.handleFilter();
        lifeon.isScroll();
        lifeon.selectDatePicker();
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

    navActive : function () {
        const pathName = location.pathname;

        $('.mypage-link').each(function () {
            const self = $(this);
            const linkUrl = self.attr('href').split('/').pop();
            const pathInfo = pathName.split('/').pop();

            if (linkUrl === pathInfo) {
                console.log(this);
                self.addClass('currentPath');
            }
        })
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

    historyBack : function () {
        $('.btn-back').on('click',function () {
            window.history.back();
        })
    },

    handleFilter : function () {
        $('.lon-filter').on('click',function () {
            $('html,body').addClass('onFilter')
        })

        $('.btn-close, .lon-filter-screen').on('click',function () {
            $('html,body').removeClass('onFilter')
        })

        //filter lib
        $(".range-slider").ionRangeSlider({
            type: "double",
            min: 0,
            max: 100,
            from: 20,
            to: 40,
            grid: true,
            drag_interval: true,
        });


        //data reset
        let my_range = $(".range-slider").data("ionRangeSlider");

        $('.lon-btn-reset').on('click',function () {
            my_range.reset();
        })

    },

    isScroll : function () {
        $(window).on('scroll',function () {
            const sct = $(window).scrollTop();

            if(sct > 30) {
                $('html, body').addClass('is-scroll')
            }else {
                $('html, body').removeClass('is-scroll')
            }
        })
    },

    selectDatePicker : function () {
        var rangeYear = _.range(2017, 2030);
        var rangeMonth = _.range(12, 0);
        var rangeDay = _.range(31, 0);
        var rangeMeridian = ["오전", "오후"];
        var rangeHour = _.range(0, 13);
        var rangeMinute = _.range(0, 60, 10);

        $('.year select').html(rangeYear.map(function (year) {
            return "<option value=\"\">" + year + "년</option>";
        }));

        $('.month select').html(rangeMonth.map(function (month) {
            return "<option value=\"\">" + month + "월</option>";
        }));

        $('.date select').html(rangeDay.map(function (day) {
            return "<option value=\"\">" + day + "일</option>";
        }));

        $('.meridian select').html(rangeMeridian.map(function (meridian) {
            return "<option value=\"\">" + meridian + "</option>";
        }));

        $('.hour select').html(rangeHour.map(function (hour) {
            return "<option value=\"\">" + hour + "시</option>";
        }));

        $('.minute select').html(rangeMinute.map(function (minute) {
            return "<option value=\"\">" + minute + "분</option>";
        }));

    }
};