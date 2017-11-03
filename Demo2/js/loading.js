(function () {

    /**
     * Handles the self-executing function of the progress bar
     */
    (function () {

        var loadPercent;  // Loaded Percent
        var all_img = $('img');  // Get all the image

        // Style of loading bar
        var loading = $('<div class="loading"></div>'),
            progress = $('<div class="progress"></div>'),
            barText = $('<p class="barText"></p>');

        var barContent = $('<p class="loadImg"><img src="img/loading.gif"><span class="show-title-text" style="display:block"></span></p>');

        progress.append(barContent).append(barText);
        loading.append(progress);

        $('body').append(loading);

        // Distance to the top
        var progressTop = ($(window).height() - progress.height() - 90) / 2;

        progress.css({'top': progressTop});

        $('.loadImg img').css({'display': 'inline-block', 'width': '40%'});
        $('.show-title-text img').css({'display': 'inline-block', 'height': '2rem'});
        $('.loadImg img.loadingPer').css({'display': 'none'});

        var loadResources = [];    // save the img
        var total = all_img.length;	// length img

         /**
         * A method to load the picture by index
         *
         * Calculate the actual degree of the progress bar is represented by calculating
         * the percentage of the current number and the total number
         *
         * @param index  index of current picture
         *
         */
        function loadPicture(index) {
            // Push picture index to the loadResources
            loadResources.push(index);

            // Calculate the percent by loaded pictures
            var percent = parseInt(loadResources.length / total * 100);

            loadPercent = percent;

            // Stitching picture location
            var imgStr,
                img_start = '<img src="img/',
                img_end = '.png" style="height: 1.4rem; display:inline-block">',
                img_end2 = '.png" style="margin-left:0.3rem; height: 1.4rem; display:inline-block">',
                img_per = '<img src="img/per.png" class="loadingper" style="margin-left:0.3rem;height:1rem;">';

            // According to the percentage stitching string
            if (percent < 10) {
                imgStr = img_start + percent + img_end + img_per;
            } else if (percent === 100) {
                imgStr = img_start + 1 + img_end + img_start + 0 + img_end + img_start + 0 + img_end2 + img_per;
            } else {
                var str = percent.toString();
                imgStr = img_start + str.substring(0, 1) + img_end + img_start + str.substring(1) + img_end2 + img_per;
                $('.loadImg img.loadingper').css({'display': 'inline-block'});
            }

            // add picture to the page
            if (percent <= 100) {
                $('.show-title-text').html(imgStr);
            }

        }

        // Load the img index
        for (var i = 0; i < all_img.length; i++) {
            all_img.eq(i).attr('src', all_img.eq(i).attr('data-src'));
            all_img.eq(i).load(function () {
                loadPicture($(this).index());
            })
        }

        // Load picture complete
        var clearSetInterval = setInterval(function () {
            if (loadPercent === 100 || document.readyState === "complete") {
                // Fade out first flash and jump to second
                $('.loading').fadeOut(800);

                // Clear the interval
                clearInterval(clearSetInterval);

                setTimeout(function () {
                    $('.index-text1').css({'opacity': '1'});
                    setTimeout(function () {
                        $('.index-text2').css({'opacity': '1', 'transform': 'rotateX(70deg) translateZ(20px)'});
                        setTimeout(function () {
                            $('.index-text3').css({'opacity': '1', 'transform': 'rotateX(70deg) translateZ(40px)'});
                            setTimeout(function () {
                                $('.index-tit').addClass('fadeInDown');
                                $('.index-text').addClass('fadeInDown');
                                setTimeout(function () {
                                    $('.index-btn').addClass('fadeInUp');
                                }, 200)
                            }, 200)
                        }, 400)
                    }, 400)
                }, 500)
            }
        }, 500);
    })();


    // Traveling
    function indexFun() {

        $('.index-tit').addClass('fadeOutUp');
        $('.index-text').addClass('fadeOutUp');
        $('.index-btn').addClass('fadeOutDown');
        $('.indextext img').css({'transform': 'rotateX(0deg) translateZ(0px)'});


        setTimeout(function () {
            $('.indextext img').css({'transform': 'rotateX(0deg) translateZ(0px) scale(3)'});
            $('.index').fadeOut(1000);
        }, 800);

        setTimeout(function () {

            numbers('.page1');

            $('.page1bg').css({'transform': 'scale(1.3)', 'opacity': '1'});

            setTimeout(function () {
                $('.page1text-top').addClass('fadeInUp');
                setTimeout(function () {
                    $('.pageheadpic').addClass('fadeInUp');
                    setTimeout(function () {
                        $('.page1text-bot').addClass('fadeInUp');
                        setTimeout(function () {
                            $('.page1-btn').addClass('fadeInUp');
                        }, 800)
                    }, 800)
                }, 800)
            }, 300)
        }, 1200)

    }

    // Click to traveling
    $('.index-btnbox a').on('click', function () {
        indexFun();
    })


    // Increment numbers
    function numbers(obj) {
        $(obj).find('.count').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 4000,
                step: function (Counter) {
                    $(this).text(Math.ceil(Counter));
                }
            });
        });
    }

    // Set music
    function music(isOpen) {
        if (isOpen === 0) {
            $('#music').trigger('pause');
            $('.music-on').hide();
            $('.music-off').show();
        } else {
            $('#music').trigger('play');
            $('.music-on').show();
            $('.music-off').hide();
        }
    }

    $('.music-on').on('click', function () {
        music(0);
    });
    $('.music-off').on('click', function () {
        music(1);
    });

})();
