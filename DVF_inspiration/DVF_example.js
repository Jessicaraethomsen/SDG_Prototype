/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can 
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

// Use this variable to set up the common and page specific functions. If you 
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages

      $( document ).ready(function() {
        var window_width = $( window ).width(),
            scroll_box = $( '.scroll-box .scroll-content' ),
            scroll_width = window_width * 2 + 'px';

        scroll_box.css('width', scroll_width);
      });

      $(window).load(function(){
        if ( $('.KW_progressContainer').length ) {
          $(window).scroll(function() {
            var wintop = $(window).scrollTop(), docheight = $('body').height(), winheight = $(window).height();
            var totalScroll = (wintop/(docheight-winheight))*100;
            $(".KW_progressBar").css("width",totalScroll+"%");
          });
        }
      });

      /////////////////////////////////////////////////////////////////////
      // Create student user
      /////////////////////////////////////////////////////////////////////

      $('select.choose-school').on('change', function() {
        var selected_school = this.value,
            choose_class = $('.user-box').find("select[data-target='" + selected_school + "']"),
            school_input = $('#acf-field_5b13f3e5490ee'),
            class_input = $('#acf-field_5b13f41c490ef');

        if ( !selected_school ) {
          input_html = '';
        } else {
          input_html = selected_school;
        }

        school_input.val( input_html );

        if ($('.choose-class.active').length) {
          $('.choose-class.active').addClass('inactive');
          $('.choose-class.active').removeClass('active');
        }

        choose_class.removeClass('inactive');
        choose_class.addClass('active');

        choose_class.val($(".choose-class.active option:first").val());
        class_input.val('');
      });

      $('.choose-class').on('change', function() {
        var selected_class = this.value,
            class_input = $('#acf-field_5b13f41c490ef');

        if ( !selected_class ) {
          input_html = '';
        } else {
          input_html = selected_class;
        }

        class_input.val( input_html );
      });

      /////////////////////////////////////////////////////////////////////
      // Class overview
      /////////////////////////////////////////////////////////////////////

      $('select.teacher-choose-school').on('change', function() {
        var selected_school = this.value,
            choose_class = $('.teacher-select').find("select[data-target='" + selected_school + "']"),
            url = window.location.href,
            path = window.location.pathname;

        if ($('.teacher-choose-class.active').length) {
          $('.teacher-choose-class.active').addClass('inactive');
          $('.teacher-choose-class.active').removeClass('active');
        }

        choose_class.removeClass('inactive');
        choose_class.addClass('active');

        choose_class.val($(".teacher-choose-class.active option:first").val());

        setCookie('selected_school', selected_school, 365);
        setCookie('selected_class', '', 365);

        window.location.replace( path + '?school=' + selected_school);

        function setCookie(name,value,days) {
          var expires = "";
          if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
          }
          document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        }
        function getCookie(name) {
          var nameEQ = name + "=";
          var ca = document.cookie.split(';');
          for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
          }
          return null;
        }
        function eraseCookie(name) {   
          document.cookie = name+'=; Max-Age=-99999999;';  
        }
      });

      $('.teacher-choose-class').on('change', function() {
        var selected_class = this.value,
            url = window.location.href,
            path = window.location.pathname;

        if (url.indexOf("school") > 0) {
          var selected_school = $('.teacher-select').find("select.teacher-choose-school").val();

          if( selected_school !== undefined ) {
            setCookie('selected_class', selected_class, 365);
            window.location.replace( path + '?school=' + selected_school + '&class=' + selected_class);
          } else {
            setCookie('selected_class', selected_class, 365);
            window.location.replace( path + '?class=' + selected_class);
          }
        } else {
          setCookie('selected_class', selected_class, 365);
          window.location.replace( path + '?class=' + selected_class);
        }

        function setCookie(name,value,days) {
          var expires = "";
          if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
          }
          document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        }
        function getCookie(name) {
          var nameEQ = name + "=";
          var ca = document.cookie.split(';');
          for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
          }
          return null;
        }
        function eraseCookie(name) {   
          document.cookie = name+'=; Max-Age=-99999999;';  
        }
      });

      $(".create-school-link").click(function(){
        $('.create-new-school').slideToggle();
      });

      $(".create-class-link").click(function(){
        $('.create-new-class').slideToggle();
      });


      /////////////////////////////////////////////////////////////////////
      // Topic overview
      /////////////////////////////////////////////////////////////////////

      $(".topic-overview .topic-item").click(function(){
        var target = $(this).attr( "data-target" ),
            target_container = $('.' + target);

        if ($('.topic-sidebar.open').length) {
          if ( target_container.hasClass('open') ) {
            target_container.removeClass('open');
            target_container.toggle();
            $('.topic-overlay').toggle();
          } else {
            $('.topic-sidebar.open').toggle();
            $('.topic-sidebar.open').removeClass('open');

            target_container.addClass('open');
            target_container.toggle();
            $('.topic-overlay').toggle();
          }
        } else {
          target_container.addClass('open');
          target_container.toggle();
          $('.topic-overlay').toggle();
        }
      });

      $(".topic-overlay").click(function(){
        $('.topic-sidebar.open').toggle();
        $('.topic-sidebar.open').removeClass('open');
        $('.topic-overlay').toggle();
      });

      $(".topic-close").click(function(){
        $('.topic-sidebar.open').toggle();
        $('.topic-sidebar.open').removeClass('open');
        $('.topic-overlay').toggle();
      });

      /////////////////////////////////////////////////////////////////////
      // General & Intro
      /////////////////////////////////////////////////////////////////////

      $(".change-slide-link").click(function(){
        var target_value = $(this).attr( "data-target" ),
            current_container = $(this).closest( "section" ),
            next_slide = $(".main").find("section[data-slide='" + target_value + "']");

        current_container.toggle();
        next_slide.toggle();
      });

      $(".start-intro").click(function(){
        var target_value = $(this).attr( "data-target" ),
            current_container = $(this).closest( "section" ),
            next_slide = $(".main").find("section[data-slide='" + target_value + "']");

        current_container.toggle();
        next_slide.css({'height' : '100vh', 'min-height' : '100vh', 'visibility' : 'normal', 'overflow' : 'normal'});
      });

      /////////////////////////////////////////////////////////////////////
      // Intro
      /////////////////////////////////////////////////////////////////////

      // slide 2
      if ( $('.intro-slide-one').length ) {
        function checkScroll() {
          if ( $('.second-slide.flex-active-slide').length ) {
            var scrolled = $('.intro-slide-one .mCSB_dragger').offset(),
                cur = scrolled.left,
                max = $('.intro-slide-one .mCSB_draggerRail').width(),
                percent_scrolled = (100 * cur) / max,
                slide_width = $('.second-slide').width(),
                drops_height = 8.3 + (percent_scrolled - 92)+ '%',
                chemicals_width = (percent_scrolled - 92) / 5 + '%',
                chemicals_placement = 50 - (((percent_scrolled - 92) / 5) / 2) + 0.5 + '%',
                water_left = 5.5 - ( (percent_scrolled - 92) / 18 ) + '%',
                water_left_placement = 13.85 - (((percent_scrolled - 92) / 2.12) / 100) + '%';

            $('.student-introduction-slider .raindrops').css("top", drops_height);
            $('.student-introduction-slider .chemicals').css({'width' : chemicals_width, 'left' : chemicals_placement});
            $('.student-introduction-slider .water').css("height", water_left);
            $('.student-introduction-slider .water').css("right", water_left_placement);
          }
        }
        setInterval(checkScroll, 50);
      }

      // Slide 3
      if ( $('.intro-slide-two').length ) {
        function checkScroll() {
          if ( $('.third-slide.flex-active-slide').length ) {
            var scrolled = $('.intro-slide-two .mCSB_dragger').offset(),
                cur = scrolled.left,
                max = $('.intro-slide-two .mCSB_draggerRail').width(),
                percent_scrolled = ((100 * cur) / max) - 92.77,
                machine_scroll = -50 + (percent_scrolled * 1.6),
                machine_position = machine_scroll + '%',
                sprout = (percent_scrolled / 8) + '%',
                sprout_parent_width = $('.student-introduction-slider .sprout').parent().width(),
                sprout_width = $('.student-introduction-slider .sprout').width(),
                sprout_placement = (sprout_parent_width / 3) - (sprout_width / 3) + 'px',
                soil_width = $('.student-introduction-slider .soil').width(),
                soil = (percent_scrolled / 8) + '%',
                soil_placement = (sprout_parent_width / 3) - (soil_width / 3) + 'px';

            $('.student-introduction-slider .machine').css("left", machine_position);
            $('.student-introduction-slider .sprout').css({"height" : sprout, "left" : sprout_placement});
            $('.student-introduction-slider .soil').css({"height" : soil, "left" : soil_placement});

            if ( machine_scroll > -30 ) {
              $('.student-introduction-slider .tree.three').addClass('animated');
            } else {
              $('.student-introduction-slider .tree.three').removeClass('animated');
            }

            if ( machine_scroll > -20 ) {
              $('.student-introduction-slider .tree.two').addClass('animated');
            } else {
              $('.student-introduction-slider .tree.two').removeClass('animated');
            }

            if ( machine_scroll > 43 ) {
              $('.student-introduction-slider .tree.one').addClass('animated');
            } else {
              $('.student-introduction-slider .tree.one').removeClass('animated');
            }
          }
        }
        setInterval(checkScroll, 50);
      }

      // Slide 4
      if ( $('.intro-slide-three').length ) {
        function checkScroll() {
          if ( $('.fifth-slide.flex-active-slide').length ) {
            var scrolled = $('.intro-slide-three .mCSB_dragger').offset(),
                cur = scrolled.left,
                max = $('.intro-slide-three .mCSB_draggerRail').width(),
                percent_scrolled = (((100 * cur) / max) - 92.77) * 1.06,
                cow_opacity = 1 - ((percent_scrolled / 100) * 4),
                veggie_one_opacity = (percent_scrolled / 100) * 4,
                chicken_opacity = 2 - ((percent_scrolled / 100) * 4),
                veggie_two_opacity = -1 + ((percent_scrolled / 100) * 4),


                pig_opacity = 3 - ((percent_scrolled / 100) * 4),
                veggie_three_opacity = -2 + ((percent_scrolled / 100) * 4);



            $('.student-introduction-slider .cow').css("opacity", cow_opacity);
            $('.student-introduction-slider .veggies.one').css("opacity", veggie_one_opacity);
            $('.student-introduction-slider .chicken').css("opacity", chicken_opacity);
            $('.student-introduction-slider .veggies.two').css("opacity", veggie_two_opacity);
            $('.student-introduction-slider .farmer').css("opacity", pig_opacity);
            $('.student-introduction-slider .veggies.three').css("opacity", veggie_three_opacity);
          }
        }
        setInterval(checkScroll, 50);
      }

      /////////////////////////////////////////////////////////////////////
      // Topic 2
      /////////////////////////////////////////////////////////////////////

      // Topic 2 first slider
      if ( $('.theme-two-slide-one').length ) {
        function checkScroll() {
          if ( $('.first-slide.flex-active-slide').length ) {
            var scrolled = $('.theme-two-slide-one .mCSB_dragger').offset(),
                cur = scrolled.left,
                max = $('.theme-two-slide-one .mCSB_draggerRail').width(),
                percent_scrolled = (((100 * cur) / max) / 100) - 0.92;

            $('.student-second-topic .map-wrapper .cow_img').css("opacity", percent_scrolled);
            $('.student-second-topic .map-wrapper .pig_img').css("opacity", percent_scrolled);
            $('.student-second-topic .map-wrapper .chicken_img').css("opacity", percent_scrolled);
          }
        }
        setInterval(checkScroll, 50);
      }

      if ( $('.theme-two-slide-two').length ) {
        function checkScroll() {
          if ( $('.second-slide.flex-active-slide').length ) {
            var scrolled = $('.theme-two-slide-two .mCSB_dragger').offset(),
                cur = scrolled.left,
                max = $('.theme-two-slide-two .mCSB_draggerRail').width(),
                percent_scrolled = (((100 * cur) / max) / 100) - 0.92;
            
            $('.student-second-topic .pig-n-chicken-wrapper .pig_img').css("opacity", percent_scrolled);
            $('.student-second-topic .pig-n-chicken-wrapper .small_chicken').css("opacity", percent_scrolled);
          }
        }
        setInterval(checkScroll, 50);
      }

      if ( $('.theme-two-slide-three').length ) {
        function checkScroll() {
          if ( $('.third-slide.flex-active-slide').length ) {
            var scrolled = $('.theme-two-slide-three .mCSB_dragger').offset(),
                cur = scrolled.left,
                max = $('.theme-two-slide-three .mCSB_draggerRail').width(),
                meat_height = -147 + ((100 * cur) / max) + '%';
            
            $('.student-second-topic .plate-wrapper .meat_img').css("top", meat_height);
          }
        }
        setInterval(checkScroll, 50);
      }

      // Indian click area
      $(".student-second-topic .indian-cow").click(function(){
        $(this).toggle();
        $(".thought_bubble_text").toggle();
      });

      // Toggle country texts
      $(".student-second-topic .country-link").click(function(){
        target_text = $(this).attr( "data-country" );
        current_container = $(this).closest( "section" );
        country_text = current_container.find( ".text-" + target_text);

        country_text.toggle();
      });

      jQuery('.student-second-topic .text-area.monday').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5a78a60a11a6f');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      jQuery('.student-second-topic .text-area.tuesday').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5a78a68611a70');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      jQuery('.student-second-topic .text-area.wednesday').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5a78a68e11a71');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      jQuery('.student-second-topic .text-area.thursday').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5a78a69511a72');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      jQuery('.student-second-topic .text-area.friday').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5a78a69e11a73');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      jQuery('.student-second-topic .text-area.saturday').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5a78a6a611a74');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      jQuery('.student-second-topic .text-area.sunday').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5a78a6b311a75');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      jQuery('.student-second-topic .text-area.sustainable-food').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5a78a6d211a76');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      jQuery('.student-second-topic .text-area.option-one').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5a78a76a11a78');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      jQuery('.student-second-topic .text-area.option-two').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5a78a79111a79');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      jQuery('.student-second-topic .text-area.option-three').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5a78a79811a7a');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.radio-one').click(function() {
        var selected_label = $('.acf-radio-list').find('label.selected'),
            parent_label = $('#acf-field_5a78a6f511a77').closest('label');

        parent_label.trigger('click');
        $('.acf-radio-list label.selected input').attr('checked', false);
        selected_label.removeClass('selected');
        parent_label.addClass('selected');
        $('#acf-field_5a78a6f511a77').attr('checked', true);
      });

      $('.radio-two').click(function() {
        var selected_label = $('.acf-radio-list').find('label.selected'),
            parent_label = $('#acf-field_5a78a6f511a77-two').closest('label');

        parent_label.trigger('click');
        $('.acf-radio-list label.selected input').attr('checked', false);
        selected_label.removeClass('selected');
        parent_label.addClass('selected');
        $('#acf-field_5a78a6f511a77-two').attr('checked', true);
      });

      $('.radio-three').click(function() {
        var selected_label = $('.acf-radio-list').find('label.selected'),
            parent_label = $('#acf-field_5a78a6f511a77-three').closest('label');

        parent_label.trigger('click');
        $('.acf-radio-list label.selected input').attr('checked', false);
        selected_label.removeClass('selected');
        parent_label.addClass('selected');
        $('#acf-field_5a78a6f511a77-three').attr('checked', true);
      });

      $('.radio-four').click(function() {
        var selected_label = $('.acf-radio-list').find('label.selected'),
            parent_label = $('#acf-field_5a78a6f511a77-four').closest('label');

        parent_label.trigger('click');
        $('.acf-radio-list label.selected input').attr('checked', false);
        selected_label.removeClass('selected');
        parent_label.addClass('selected');
        $('#acf-field_5a78a6f511a77-four').attr('checked', true);
      });

      $('.radio-five').click(function() {
        var selected_label = $('.acf-radio-list').find('label.selected'),
            parent_label = $('#acf-field_5a78a6f511a77-five').closest('label');

        parent_label.trigger('click');
        $('.acf-radio-list label.selected input').attr('checked', false);
        selected_label.removeClass('selected');
        parent_label.addClass('selected');
        $('#acf-field_5a78a6f511a77-five').attr('checked', true);
      });

      $('.radio-six').click(function() {
        var selected_label = $('.acf-radio-list').find('label.selected'),
            parent_label = $('#acf-field_5a78a6f511a77-six').closest('label');

        parent_label.trigger('click');
        $('.acf-radio-list label.selected input').attr('checked', false);
        selected_label.removeClass('selected');
        parent_label.addClass('selected');
        $('#acf-field_5a78a6f511a77-six').attr('checked', true);
      });

      $('.radio-seven').click(function() {
        var selected_label = $('.acf-radio-list').find('label.selected'),
            parent_label = $('#acf-field_5a78a6f511a77-seven').closest('label');

        parent_label.trigger('click');
        $('.acf-radio-list label.selected input').attr('checked', false);
        selected_label.removeClass('selected');
        parent_label.addClass('selected');
        $('#acf-field_5a78a6f511a77-seven').attr('checked', true);
      });

      /////////////////////////////////////////////////////////////////////
      // Topic 3
      /////////////////////////////////////////////////////////////////////

      // add article text to submission form
      jQuery('.student-third-topic .article-textarea').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5aad77ddbe17e');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });


      /////////////////////////////////////////////////////////////////////
      // Topic 4
      /////////////////////////////////////////////////////////////////////

      $('.save-answers-link').click(function(){
        $('.step-textarea').attr("disabled", true);
      });

      $(".student-fourth-topic .step-image").click(function(){
        var selected_img = $(this).attr('src'),
            save_field = $('#acf-field_5aabca2171346');

        if ( $( this ).hasClass( "is-active" ) ) {
          save_field.val('');
        } else {
          save_field.val( selected_img );
        }
      });

      jQuery('.student-fourth-topic .step-textarea').on('input', function() {
        var tiny_mce_input = $('#acf-field_5aabca7171347'),
            textarea_content = $('.step-textarea').val();

        tiny_mce_input.html( textarea_content );
      });

      jQuery('.student-fourth-topic .section-three-comment').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5aabc9ff71345');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.bar-chart-result').click(function(){
        $('.resizable-bars .ui-resizable-handle.ui-resizable-n').remove();
        $('#chart-container .all-elements rect').css('display', 'block');
        $('.resizable-bars .bar-value').css('display', 'block');
      });

      $('.bar-chart-result-two').click(function(){
        $('.resizable-bars-two .ui-resizable-handle.ui-resizable-n').remove();
        $('#chart-container-two .all-elements rect').css('display', 'block');
        $('.resizable-bars-two .bar-value').css('display', 'block');
        $('#acf-form .acf-form-submit').css('display', 'block');
      });

      $(".student-fourth-topic .first-result-button").click(function(){
        var pillar_second = $('#resizable-second').height(),
            pillar_third = $('#resizable-third').height(),
            pillar_fourth = $('#resizable-fourth').height(),
            tiny_mce_input_two = $('#acf-field_5aabc91f7133c'),
            tiny_mce_input_three = $('#acf-field_5aabc93a7133d'),
            tiny_mce_input_four = $('#acf-field_5aabc9537133e');

        tiny_mce_input_two.val( pillar_second );
        tiny_mce_input_three.val( pillar_third );
        tiny_mce_input_four.val( pillar_fourth );
      });

      $(".student-fourth-topic .second-result-button").click(function(){
        var pillar_first = $('#resizable-two-first').height(),
            pillar_second = $('#resizable-two-second').height(),
            pillar_third = $('#resizable-two-third').height(),
            pillar_fourth = $('#resizable-two-fourth').height(),
            pillar_fifth = $('#resizable-two-fifth').height(),
            pillar_sixth = $('#resizable-two-sixth').height(),
            pillar_seventh = $('#resizable-two-seventh').height(),
            pillar_eight = $('#resizable-two-eight').height(),
            tiny_mce_input_one = $('#acf-field_5aabcabd71348'),
            tiny_mce_input_two = $('#acf-field_5aabcac271349'),
            tiny_mce_input_three = $('#acf-field_5aabcac67134a'),
            tiny_mce_input_four = $('#acf-field_5aec4f2005f7e'),
            tiny_mce_input_five = $('#acf-field_5aec4f2805f7f'),
            tiny_mce_input_six = $('#acf-field_5aec4f2f05f80'),
            tiny_mce_input_seven = $('#acf-field_5aec4f3705f81'),
            tiny_mce_input_eight = $('#acf-field_5aec4f3e05f82');

        tiny_mce_input_one.val( pillar_first );
        tiny_mce_input_two.val( pillar_second );
        tiny_mce_input_three.val( pillar_third );
        tiny_mce_input_four.val( pillar_fourth );
        tiny_mce_input_five.val( pillar_fifth );
        tiny_mce_input_six.val( pillar_sixth );
        tiny_mce_input_seven.val( pillar_seventh );
        tiny_mce_input_eight.val( pillar_eight );
      });


      /////////////////////////////////////////////////////////////////////
      // Topic 5
      /////////////////////////////////////////////////////////////////////

      $(".student-five-topic .step-image").click(function(){
        var selected_img = $(this).attr('data-target'),
            save_field_container = $('.acf-field-5aabc5c3803b9'),
            save_field = save_field_container.find("input[type=radio][value=" + selected_img + "]"),
            save_field_container = save_field.closest("label");;

        if ( $( this ).hasClass( "is-active" ) ) {
          $('input[type=radio]').removeAttr('checked');
          $('label.selected').removeClass('selected');
        } else {
          $('label.selected').removeClass('selected');
          $('input[type=radio]').removeAttr('checked');
          save_field.attr('checked', 'checked');
          save_field_container.addClass('selected');
        }
      });

      jQuery('.student-five-topic .why-textarea').on('input', function() {
        var value = jQuery(this).val(),
            tiny_mce_input = $('#acf-field_5aabc622803ba');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      /////////////////////////////////////////////////////////////////////
      // Topic 4 & 5
      /////////////////////////////////////////////////////////////////////

      $(".step-image").click(function(){
        if ( $( this ).hasClass( "is-active" ) ) {
          $( this ).removeClass('is-active');
        } else {
          if ( $('img.is-active').length ) {
            $('img.is-active').removeClass('is-active');
          }

          $( this ).addClass('is-active');
        }
      });


      /////////////////////////////////////////////////////////////////////
      // Topic 6
      /////////////////////////////////////////////////////////////////////

      if ( $('.scroll-box-vertical').length ) {
        function checkScroll() {
          var scrolled = $('.scroll-box-vertical .mCSB_dragger').offset(),
              cur = scrolled.top,
              scroll_container_offset = $('.mCSB_draggerRail').offset(),
              scroll_container_offset_top = scroll_container_offset.top,
              max = $('.scroll-box-vertical .mCSB_draggerRail').height(),
              percent_scrolled = (cur - scroll_container_offset_top) / 3.2,
              water_height = (2000 / (0.0001 + percent_scrolled)) - 16;

              console.log(water_height);
              
          
          if ( water_height >= 56.8 ) {
            $('.student-six-topic .water').css("height", '56.8%');
          } else {
            $('.student-six-topic .water').css("height", water_height + '%');
          }
        }
        setInterval(checkScroll, 50);

        setTimeout(function(){
          $('#mCSB_1_dragger_vertical').css('top', '320px');
          $('#mCSB_1_container').css('top', '-2050px');
        }, 500);
      }

      $(".student-six-topic .fish-section img").click(function(){
        target_text = $(this).attr( "data-target" );
        current_container = $(this).closest( "section" );
        fish_text = current_container.find( "." + target_text + "-content");

        if ( $('.fish-content.active').length ) {
          $('.fish-content.active').toggle();
        }

        if ( fish_text.hasClass('active') ) {
          $('.fish-content.active').removeClass('active');
        } else {
          $('.fish-content.active').removeClass('active');
          fish_text.addClass('active');
          fish_text.toggle();
        }
      });

      $('.student-six-topic .fish-textarea.one').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5aad3d541771f');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.student-six-topic .fish-textarea.two').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5aad3ead17720');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.student-six-topic .fish-textarea.three').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5aad3eb317721');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.student-six-topic .fish-textarea.four').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5aad3eba17722');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.student-six-topic .fish-textarea.five').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5af203eea1222');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });


      $(".student-six-topic .bar-chart-result").click(function(){
        var pillar_one = $('#resizable-first').height(),
            pillar_second = $('#resizable-second').height(),
            pillar_third = $('#resizable-third').height(),
            pillar_fourth = $('#resizable-fourth').height(),
            pillar_fifth = $('#resizable-fifth').height(),
            pillar_sixth = $('#resizable-sixth').height(),
            pillar_seventh = $('#resizable-seventh').height(),
            pillar_eight = $('#resizable-eight').height(),
            pillar_ninth = $('#resizable-ninth').height(),
            tiny_mce_input_one = $('#acf-field_5b6759f35bab5'),
            tiny_mce_input_two = $('#acf-field_5b675a025bab6'),
            tiny_mce_input_three = $('#acf-field_5b675a085bab7'),
            tiny_mce_input_four = $('#acf-field_5b675a0f5bab8'),
            tiny_mce_input_five = $('#acf-field_5b675a165bab9'),
            tiny_mce_input_six = $('#acf-field_5b675a1e5baba'),
            tiny_mce_input_seven = $('#acf-field_5b675a235babb'),
            tiny_mce_input_eight = $('#acf-field_5b675a2a5babc'),
            tiny_mce_input_nine = $('#acf-field_5b675a395babd');

        tiny_mce_input_one.val( pillar_one );
        tiny_mce_input_two.val( pillar_second );
        tiny_mce_input_three.val( pillar_third );
        tiny_mce_input_four.val( pillar_fourth );
        tiny_mce_input_five.val( pillar_fifth );
        tiny_mce_input_six.val( pillar_sixth );
        tiny_mce_input_seven.val( pillar_seventh );
        tiny_mce_input_eight.val( pillar_eight );
        tiny_mce_input_nine.val( pillar_ninth );
      });


      /////////////////////////////////////////////////////////////////////
      // Topic 7
      /////////////////////////////////////////////////////////////////////

      $(".student-seven-topic .farting-cow").click(function(){
        $('.student-seven-topic .fart-content').addClass('active');
        $('.student-seven-topic .fart-content .fart').addClass('active');

        setTimeout(function() {
          $('.student-seven-topic .fart-text').toggle();
        }, 1000);
      });

      $(".student-seven-topic .food-link").click(function(){
        var target_value = $(this).attr( "data-target" ),
            target_content = '.' + target_value + '-content';


        if ($(this).hasClass('active')) {
          
          $(this).removeClass('active');

          var active_value = $('.button-content').find(target_content + '.active'),
              active_container = active_value.closest('.col-xs-4');

          active_value.toggle();
          active_value.removeClass('active');
          active_container.removeClass('active');

        } else {
          if (($(".student-seven-topic .food-column-one").hasClass('active')) && ($(".student-seven-topic .food-column-two").hasClass('active')) && ($(".student-seven-topic .food-column-three").hasClass('active'))) {

            // do nothing

          } else if (($(".student-seven-topic .food-column-one").hasClass('active')) && ($(".student-seven-topic .food-column-three").hasClass('active'))) {

            $(".student-seven-topic .food-column-two").addClass('active');
            $('.food-column-two ' + target_content).toggle();
            $('.food-column-two ' + target_content).addClass('active');

          } else if (($(".student-seven-topic .food-column-two").hasClass('active')) && ($(".student-seven-topic .food-column-three").hasClass('active'))) {

            $(".student-seven-topic .food-column-one").addClass('active');
            $('.food-column-one ' + target_content).toggle();
            $('.food-column-one ' + target_content).addClass('active');

          } else if (($(".student-seven-topic .food-column-two").hasClass('active')) && ($(".student-seven-topic .food-column-one").hasClass('active'))) {

            $(".student-seven-topic .food-column-three").addClass('active');
            $('.food-column-three ' + target_content).toggle();
            $('.food-column-three ' + target_content).addClass('active');

          } else if ($(".student-seven-topic .food-column-two").hasClass('active')) {

            $(".student-seven-topic .food-column-three").addClass('active');
            $('.food-column-three ' + target_content).toggle();
            $('.food-column-three ' + target_content).addClass('active');

          } else if ($(".student-seven-topic .food-column-one").hasClass('active')) {

            $(".student-seven-topic .food-column-two").addClass('active');
            $('.food-column-two ' + target_content).toggle();
            $('.food-column-two ' + target_content).addClass('active');

          } else {

            $(".student-seven-topic .food-column-one").addClass('active');
            $('.food-column-one ' + target_content).toggle();
            $('.food-column-one ' + target_content).addClass('active');

          }

          if ($('.food-link.active').length > 2 ) {
            // Do nothing
          } else {
            $(this).addClass('active');
          }
        }        
      });

      $('.student-seven-topic .task-input').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5af216a1a5c1b');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.val( input_html );
      });

      $('.student-seven-topic .task-textarea').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5af216bda5c1c');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $(".student-seven-topic .bar-chart-result").click(function(){
        var pillar_second = $('#resizable-second').height(),
            pillar_third = $('#resizable-third').height(),
            pillar_first = $('#resizable-first').height(),
            tiny_mce_input_two = $('#acf-field_5aad4bf5e8b52'),
            tiny_mce_input_three = $('#acf-field_5aad4c0de8b53'),
            tiny_mce_input_first = $('#acf-field_5aad4c12e8b54');

        tiny_mce_input_two.val( pillar_second );
        tiny_mce_input_three.val( pillar_third );
        tiny_mce_input_first.val( pillar_first );
      });


      /////////////////////////////////////////////////////////////////////
      // Topic 8
      /////////////////////////////////////////////////////////////////////

      $('.student-eight-topic .recipe-one').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5ace5411e9159');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.student-eight-topic .recipe-two').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5ace5426e915a');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.student-eight-topic .recipe-three').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5ace543be915b');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $(".student-eight-topic .forrest-button").click(function(){
        var target_value = $(this).attr( "data-target" ),
            target_content = $('.student-eight-topic .' + target_value);

        if (target_content.hasClass('active')) {
          // Do nothing
        } else {
          $(".student-eight-topic .jungle-img.active").toggle();
          $(".student-eight-topic .jungle-img.active").removeClass('active');
          target_content.toggle();
          target_content.addClass('active');
        }
      });

      $('.student-eight-topic .drag-n-drop-comment').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5aad4ea405536');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.student-eight-topic .image-upload-comment').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5aad4ea405619');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.student-eight-topic .pros-comment').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5aad4ea4056fc');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.student-eight-topic .cons-comment').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5aad4ea40576e');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });


      /////////////////////////////////////////////////////////////////////
      // Topic 9
      /////////////////////////////////////////////////////////////////////

      $('.student-nine-topic .comment-one').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5aad5e38d155d');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.student-nine-topic .comment-two').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5aad5e4ed155e');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.student-nine-topic .comment-three').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5aad5e54d155f');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });

      $('.student-nine-topic .comment-four').on('input', function() {
        var value = $(this).val(),
            tiny_mce_input = $('#acf-field_5aad5e5cd1560');

        if ( !value ) {
          input_html = '';
        } else {
          input_html = value;
        }

        tiny_mce_input.html( input_html );
      });


      /////////////////////////////////////////////////////////////////////
      // Topic 10
      /////////////////////////////////////////////////////////////////////

      $(".student-ten-topic .issue-value-img").click(function(){
        var target_value = $(this).attr( "src" ),
            tiny_mce_input = $('#acf-field_5aad5f2d908da'),
            target_text = $(this).attr( "data-target" ),
            target_content = $('.' + target_text);

        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $('.issue-text.active').toggle();
          $('.issue-text.active').removeClass('active');

          input_html = '';
          tiny_mce_input.val( input_html );
        } else {
          if ($('.issue-value-img.active').length) {
            $('.issue-value-img.active').removeClass('active');
            $('.issue-text.active').toggle();
            $('.issue-text.active').removeClass('active');
            $(this).addClass('active');
            target_content.addClass('active');
            target_content.toggle();

            input_html = target_value;
            tiny_mce_input.val( input_html );
          } else {
            $(this).addClass('active');
            target_content.addClass('active');
            target_content.toggle();

            input_html = target_value;
            tiny_mce_input.val( input_html );
          }
        }
      });


      /////////////////////////////////////////////////////////////////////
      // Hotspots
      /////////////////////////////////////////////////////////////////////
      
      $(".hotspots-overview .create-hotspot").click(function(){
        var title_input = $('#acf-field_5aa6ced1774ed'),
            img_input = $('#acf-field_5aa6cf12774ef'),
            description_input = $('#acf-field_5aa6cf06774ee');

        if ($('.create-hotspot.selected').length) {
          // If a hotspot is already selected, do this:
          if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');

            var title = '',
                img_src = '',
                description = '';
          } else {
            $('.create-hotspot.selected').removeClass('selected');

            $(this).addClass('selected');

            var title = $('.create-hotspot.selected h3').html(),
                img_src = $('.create-hotspot.selected img').attr('src'),
                description = $('.create-hotspot.selected .hotspot-final-text').html();
          }
        } else {
          // If no hotspot is selected, do this:
          $(this).addClass('selected');

          var title = $('.create-hotspot.selected h3').html(),
              img_src = $('.create-hotspot.selected img').attr('src'),
              description = $('.create-hotspot.selected .hotspot-final-text').html();
        }

        title_input.val( title );
        description_input.html( description );
        img_input.val( img_src );
      });

      $(".hotspots-overview .hotspot-show-more").click(function(){
        var container = $(this).closest('.hotspot-wrapper').find('.hotspot-content'),
            short_content = container.find('.short'),
            long_content = container.find('.long');

        short_content.toggle();
        long_content.toggle();
      });

      $(".hotspots-overview .hotspot-show-less").click(function(){
        var container = $(this).closest('.hotspot-wrapper').find('.hotspot-content'),
            short_content = container.find('.short'),
            long_content = container.find('.long');

        short_content.toggle();
        long_content.toggle();
      });


      /////////////////////////////////////////////////////////////////////
      // Teacher material
      /////////////////////////////////////////////////////////////////////

      $(".material-overview .teacher-material").click(function(){
        var target = $(this).attr( "data-target" ),
            target_container = $('.' + target);

        if ($('.material-sidebar.open').length) {
          if ( target_container.hasClass('open') ) {
            target_container.removeClass('open');
            target_container.toggle();
            $('.material-overlay').toggle();
          } else {
            $('.material-sidebar.open').toggle();
            $('.material-sidebar.open').removeClass('open');

            target_container.addClass('open');
            target_container.toggle();
            $('.material-overlay').toggle();
          }
        } else {
          target_container.addClass('open');
          target_container.toggle();
          $('.material-overlay').toggle();
        }
      });

      $(".material-overlay").click(function(){
        $('.material-sidebar.open').toggle();
        $('.material-sidebar.open').removeClass('open');
        $('.material-overlay').toggle();
      });

      $(".material-close").click(function(){
        $('.material-sidebar.open').toggle();
        $('.material-sidebar.open').removeClass('open');
        $('.material-overlay').toggle();
      });
    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page
    }
  },
  // About us page, note the change from about-us to about_us.
  about_us: {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
