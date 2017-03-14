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
    
    $('.close').click(function(){
        $(this).parent().parent().hide();
    });

    $('.button-call').click(function(event){
        event.preventDefault();
        $('#form-call-window').show();
    });
    
    $('.button-order').click(function(event){
        event.preventDefault();
        $('#form-order-window').show();
    });
    
    $('#popup-plan-event .button-order').click(function(event){
        $('#popup-plan-event').hide();
    });
    
    $('#popup-plan-im .button-order').click(function(event){
        $('#popup-plan-im').hide();
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

    $('.plan.base').click(function(e){
        e.preventDefault();
        $('#popup-plan-base').show();
    });

    $('.plan.business').click(function(e){
        e.preventDefault();
        $('#popup-plan-business').show();
    });
    
    $('.plan.standart').click(function(e){
        e.preventDefault();
        $('#popup-plan-standart').show();
    });
    
    $('.plan.inetmarketing').click(function(e){
        e.preventDefault();
        $('#popup-plan-im').show();
    });
    
    $('.plan.event').click(function(e){
        e.preventDefault();
        $('#popup-plan-event').show();
    });
    
    $('.plan.individual').click(function(e){
        e.preventDefault();
        $('#popup-plan-individual').show();
    });
    
    var $form_popup_individual = $('#form-popup-individual');
    $form_popup_individual.submit(function(e) {
        e.preventDefault();
        $.post('/ajax/ajax.php', $(this).serialize(), function(data){
            var result = JSON.parse(data);
            if (result.RESULT === 'FAIL') {
                $form_popup_individual.find('.message').show().html('Ошибка отправки заявки');
            } else {
                $form_popup_individual.parent().find('.message').show().html('Ваша заявка отправлена');
            
            }
        });
    });
    
    $('.pi-close').click(function(){
        $(this).parent().parent().parent().hide();
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


