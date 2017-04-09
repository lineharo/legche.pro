$(document).ready(function() {

    var $form_call_window = $('#form-call-window');
    var $form_call = $('#form-call');
    $form_call.submit(function(e) {
        e.preventDefault();
        $.post('/ajax/ajax.php', $(this).serialize(), function(data){
            var result = JSON.parse(data);
            if (result.RESULT === 'FAIL') {
                $form_call.find('.message').show().html('Ошибка отправки заявки');
            } else {
                $form_call.parent().find('.message').show().html('Запрос отправлен');
                $form_call.hide('slow').delay(3000).show();
                $form_call_window.delay(3000).hide(0);
            }
        });
    });
    
    var $form_order_window = $('#form-order-window');
    var $form_order = $('#form-order');
    $form_order.submit(function(e) {
        e.preventDefault();
        $.post('/ajax/ajax.php', $(this).serialize(), function(data){
            var result = JSON.parse(data);
            if (result.RESULT === 'FAIL') {
                $form_order.find('.message').show().html('Ошибка отправки заявки');
            } else {
                $form_order.parent().find('.message').show().html('Запрос отправлен');
                $form_order.hide('slow').delay(3000).show();
                $form_order_window.delay(3000).hide(0);
            }
        });
    });
    
    var $form_order_request = $('#form-order-request');
    $form_order_request.submit(function(e) {
        e.preventDefault();
        $.post('/ajax/ajax.php', $(this).serialize(), function(data){
            var result = JSON.parse(data);
            if (result.RESULT === 'FAIL') {
                $form_order_request.find('.message').show().html('Ошибка отправки заявки');
            } else {
                $form_order_request.parent().find('.message').show().html('Ваша заявка отправлена');
            
            }
        });
    });
    
    
    $('.button-call').click(function(event){
        event.preventDefault();
        $('#form-call-window').show();
    });
    
    $('.button-order').click(function(event){
        event.preventDefault();
        $('#form-order-window').show();
    });
    
    $('#popup-service-event .button-order').click(function(event){
        $('#popup-service-event').hide();
    });

    $('li.sites a.a-button').click(function(e){
        e.preventDefault();
        $('#popup-service-site').show();
    });

    $('li.context a.a-button').click(function(e){
        e.preventDefault();
        $('#popup-service-context').show();
    });
    
    $('li.smm a.a-button').click(function(e){
        e.preventDefault();
        $('#popup-service-smm').show();
    });
    
    $('li.event a.a-button').click(function(e){
        e.preventDefault();
        $('#popup-service-event').show();
    });
    
    $('li.design a.a-button').click(function(e){
        e.preventDefault();
        $('#popup-service-design').show();
    });
    
    $('.individual .button a').click(function(e){
        e.preventDefault();
        $('#popup-service-individual').show();
    });
    
    // var $form_popup_individual = $('#form-popup-individual');
    // $form_popup_individual.submit(function(e) {
    //     e.preventDefault();
    //     $.post('/ajax/ajax.php', $(this).serialize(), function(data){
    //         var result = JSON.parse(data);
    //         if (result.RESULT === 'FAIL') {
    //             $form_popup_individual.find('.message').show().html('Ошибка отправки заявки');
    //         } else {
    //             $form_popup_individual.parent().find('.message').show().html('Ваша заявка отправлена');
    //         
    //         }
    //     });
    // });
    
    $('.pi-close').click(function(){
        $(this).parent().parent().parent().fadeOut( "fast")();
    });
    
    var $popup_info = $('.popup-info');
    $popup_info.click(function(e){
        if (e.target === this) {
            $(this).parent().fadeOut( "fast");
        }
    });

    var h_hght = $('.header .c-wrap').position().top; // высота шапки
    console.log(h_hght);
    var h_mrg = 0;    // отступ когда шапка уже не видна
                     
    $(function(){
        var elem = $('.header .c-wrap');
        var top = $(this).scrollTop();
         
        if(top > h_hght){
            elem.css('top', h_mrg);
            elem.css('background-color', 'rgba(255,255,255, 0.8)');
        }           
         
        $(window).scroll(function(){
            top = $(this).scrollTop();
             
            if (top+h_mrg < h_hght) {
                elem.css('top', '0');
                elem.css('background-color', 'rgba(255,255,255, 0)');
                elem.css('position','relative')
            } else {
                elem.css('top', h_mrg);
                elem.css('background-color', 'rgba(255,255,255, 0.8)');
                elem.css('position', 'fixed');
            }
        });
    });

});

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


