$(document).ready(function () {

    $('.header-nav_menu-button').click(function () {
        $(this).toggleClass('open');
        $('.header-nav ul').toggleClass('open_nav')
    });

    $('.featured-items').owlCarousel({
        nav: true,
        navText: '',
        responsive: {
            320: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });
    $('.client-items').owlCarousel({
        nav: true,
        navText: '',
        items: 6,
        loop: true,
        responsive: {
            320: {
                items: 3
            },
            768: {
                items: 5
            },
            992: {
                items: 6
            }

        }
    });

    var mixer = mixitup('.portfolio-block', {
        selectors: {
            target: '.mix'
        }
    });

    $('.article-slider').owlCarousel({
        nav: true,
        navText: '',
        items: 3,
        responsive: {
            320: {
                items: 2
            },
            768: {
                items: 3
            }
        }
    });



});