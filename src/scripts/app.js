$(document).ready(function() {

    // JQUERY NAV TOGGLE
    $('#menu').bind('click', function(event) {
        $('#menu').toggleClass('js_open')
        $('#mainnav ul').slideToggle();
        console.log('g')
    });

    $(window).resize(function() {
        var w = $(window).width();
        if (w > 768) {
            $('#mainnav ul').removeAttr('style');
        }
    });
    // FIXED HEADER
    $(window).resize(function() {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
            $(this).trigger('windowResize');
        }, 500);
    });

    var distance = 0;
    var widthV = $(window).width()
    $(window).resize(function() {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
            $(this).trigger('windowResize');
        }, 500);
    });


    function calcDistance() {
        distance = $('.l_header').height() - $('.b_navigation').height() + 20;
        var navHeight = $('.b_navigation').outerHeight();
        // $('.js_nav_wrapper').css("height", navHeight)
    }

    calcDistance()
    console.log(distance)

    $(window).on('windowResize', function() {
        calcDistance()
        widthV = $(window).width()

    });
    console.log(widthV)
    $(window).scroll(function() {
        // calcSize()
        if ($(window).scrollTop() >= distance) {
            if (widthV >= 767) {
                $('#mainnav').addClass('js_fixed_header');

            }
        } else {
            $('#mainnav').removeClass('js_fixed_header');
        }

        if ($(this).scrollTop() >= 100) { // If page is scrolled more than 50px
            $('#to_top_button').fadeIn("fast"); // Fade in the arrow
        } else {
            $('#to_top_button').fadeOut("fast"); // Else fade out the arrow
        }
    });

    $('#to_top_button').click(function() { // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0 // Scroll to top of body
        }, 500);
    });

});

$( document ).ready(function() {
    var $icon = $('.js_svg_response');
    $icon.append('<div class="svg_ratio"></div>')
    var $ratio = $icon.find(".svg_ratio");
    // get symbol id for this sprite
    var id = $icon.find('use').attr('xlink:href');
    // find matching svg symbol
    var $svg = $(id);

    var str = $svg.attr('viewBox');
    var strArray = str.match(/\d+\.\d+|\d+/g);
    var i = 0;
    // get width and height stored in data attributes, like viewBox
    var height = strArray[3];
    var width = strArray[2];

    // calculate aspect ratio (ar) and convert to percentage
    var arRaw = height/width;
    var ar = arRaw * 100;
    ar = ar + '%';
    // Set the bottom padding on the element
    // used to set aspect ratio
    $ratio.css('padding-bottom', ar);
});


$( document ).ready(function() {
    $('.js_phone_trigger').click(function() {
        $('.l_modal, .b_popup_phone').toggleClass('js_open');
        $('.wrapper-parallax').toggleClass('blur');
        return false;
    });

});

$('#phone_holder').click(function () {
    $(this).removeClass('js_error')

});


$('.b_slider').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 599,
            settings: {
                autoplaySpeed: 1500,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false

            }
        },
        {
            breakpoint: 480,
            settings: {
                autoplaySpeed: 1500,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false

            }
        }
    ]
});
$('#thumbnails').simpleGal({
    mainImage: '#gallery'
});
function background() {
    var img = $("[data-background]");
    img.css('background-image', function () {
        var bg = ('url(' + $(this).data('background') + ')');
        return bg;
    });
}
background()

$( ".b_hero_catalog" ).click(function() {
    var main = $(this)
    var content = $(this).find('.content')
    if (window.matchMedia('(max-width: 992px)').matches) {
        $( ".b_hero_catalog" ).removeClass('js_active_block')
        if(!$(content).hasClass('js_active')){
            console.log('123')
            $(main).addClass('js_active_block')
        }
        $('.js_active').stop().slideUp( "slow", function() {
            $(this).removeClass('js_active')})

        $( content ).addClass('js_active')


        $( content ).stop().slideToggle( "slow", function() {
        });
    }


});
$( ".b_table .spoiler" ).click(function() {
    $('.b_table table').toggleClass('hide')
        $('.b_table .content_table').stop().slideToggle( "slow", function() {
        });


});
// $(window).resize(function() {
//     if (window.matchMedia('(min-width: 992px)').matches) {
//         $( ".b_hero_catalog" ).removeClass('js_active_block')
//         $('.content').removeClass('js_active')
//
//         $('.content').stop().slideDown( 0, function() {
//
//         });
//     }
// });
function initMap() {
    var uluru = {lat: 49.58848614 , lng: 34.55811739};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: uluru,
        gestureHandling: 'cooperative',
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}
$( ".b_catalog_list .item" ).hover(function() {
    $( ".b_catalog_list .img" ).addClass('active')
});
//
// $(document).ready(function(){
//     $("#filter").keyup(function(){
//
//         // Retrieve the input field text and reset the count to zero
//         var filter = $(this).val(), count = 0;
// console.log(filter)
//         // Loop through the comment list
//         $(".b_catalog_list .item").each(function(){
//
//             // If the list item does not contain the text phrase fade it out
//             if ($(this).text().search(new RegExp(filter, "i")) < 0) {
//                 $(this).fadeOut();
//                 console.log($(this).find($('.title')))
//                 // Show the list item if the phrase matches and increase the count by 1
//             } else {
//                 $(this).find($('.title')).html( $(this).find($('.title')).html().replace( new RegExp( filter+'(?!([^<]+)?>)', 'gi' ), '<span class="highlight">$&</span>' ) );
//
//                 $(this).show();
//                 count++;
//             }
//             if($('.b_catalog_list .item')){console.log($('.b_catalog_list .item'))}else {$('.b_catalog_list').fadeOut()}
//             if($('.b_catalog_list .item').length === $('.b_catalog_list .item').prop('style').length){
//                 //return true
//                 console.log('true');
//             }
//             else{
//                 //return false
//                 console.log('false');
//             }
//         });
//
//         // Update the count
//         var numberItems = count;
//         $("#filter-count").text("Number of Filter = "+count);
//     });
// });

;( function( $, window, document, undefined )
{
    var $container = $( '.b_catalog_list' );
    if( !$container.length ) return true;

    var $input			= $('input'),
        $notfound		= $( '.b_no_matches' ),
        $items			= $container.find( '.item' ),
        $item			= $(),
        itemsIndexed	= [];

    $items.each( function()
    {
        itemsIndexed.push( $( this ).find('.title').text().replace( /\s{2,}/g, ' ' ).toLowerCase() );
    });

    $input.on( 'keyup', function( e )
    {
        if( e.keyCode == 13 ) // enter
        {
            $input.trigger( 'blur' );
            return true;
        }

        $items.each( function()
        {
            $item = $( this );
            $item.find('.title').html( $item.find('.title').html().replace( /<span class="highlight">([^<]+)<\/span>/gi, '$1' ) );
        });

        var searchVal = $.trim( $input.val() ).toLowerCase();
        if( searchVal.length )
        {
            for( var i in itemsIndexed )
            {
                $item = $items.eq( i );


                if( itemsIndexed[ i ].indexOf( searchVal ) != -1 ) {
                    $item.removeClass('is-hidden')
                    $item.find('.title').html($item.find('.title').html().replace(new RegExp(searchVal + '(?!([^<]+)?>)', 'gi'), '<span class="highlight">$&</span>'));

                }else {
                    $item.addClass('is-hidden');
                }
                // $('.b_catalog_list').eq(i).removeClass('is-hidden')

            }

        }


        else $items.removeClass( 'is-hidden' );

        for (var b = 0; b < 4; b++) {

            if($('.b_catalog_list').eq(b).children('.item').length === $('.b_catalog_list').eq(b).children('.is-hidden').length){
                console.log('скрыто все: '+ $('.b_catalog_list').eq(b).children('.item').length === $('.b_catalog_list').eq(b).children('.is-hidden').length)
                console.log('номер- '+ b + ' ' + $('.b_catalog_list').eq(b).children('.is-hidden').length)
                console.log($('.b_catalog_list').eq(b).children('.item').length)
                $('.b_catalog_list').eq(b).addClass('is-hidden')

            } else {
                console.log('скрыто все: '+ ' ' + $('.b_catalog_list').eq(b).children('.item').length === $('.b_catalog_list').eq(b).children('.is-hidden').length)

                $('.b_catalog_list').eq(b).removeClass('is-hidden')


            }
        }
        $notfound.toggleClass( 'is-visible', $items.not( '.is-hidden' ).length == 0 );
        console.log($items)
    });
})( jQuery, window, document );


// toggling items on title press

$.fn.extend({
    animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});


    // hide our element on page load


// var waypoint = new Waypoint({
//     element: document.getElementById('l_advantages'),
//     handler: function() {
//         // $('.b_single_plus').animateCss('animated bounceInLeft');
// console.log(ekfneferfnrjefn)
//     }
// })



// var flag = true;
//     var waypoint = new Waypoint({
//         element: document.getElementsByClassName('l_advantages'),
//         handler: function() {
//             if(flag){
//
//                 console.log(flag)
//             $('.b_single_plus:nth-child(2n)').animateCss('animated fadeInRightBig').removeClass('no_visible');
//             flag = false;
//             console.log($('this'))
//             }else {
//                 console.log('dedede')
//             }
//         },
//         offset: '70%'
//     });
$('.b_block_title, .b_step, .b_single_plus').css('opacity','0')

$('.l_advantages').waypoint({
    handler: function() {
        $('.b_single_plus:nth-child(2n+1)').animateCss('animated fadeInLeftBig').css('opacity','1');
        $('.b_single_plus:nth-child(2n)').animateCss('animated fadeInRightBig').css('opacity','1');
        this.destroy()
    },
    offset: '50%'
})
$('.b_block_title').waypoint({
    handler: function() {
        console.log('efeferf')
        $(this.element).animateCss('animated slideInUp').css('opacity','1');
        this.destroy()
    },
    offset: '90%'
})
$('.l_steps').waypoint({
    handler: function() {
        $('.b_step:nth-child(2n+1)').animateCss('animated fadeInLeftBig').css('opacity','1');
        $('.b_step:nth-child(2n)').animateCss('animated fadeInRightBig').css('opacity','1');
        this.destroy()
    },
    offset: '50%'
})
