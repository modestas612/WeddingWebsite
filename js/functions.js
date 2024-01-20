"use strict";
$(document).ready(function(){
    headerBackgroundoTvarkymas();
    renderDukBlock(duk_data);
    responsiveNAV();
    updateTimer();
    menuAktiviKlase();

    // on scroll - update header background
    $(document).scroll(function(){
        headerBackgroundoTvarkymas();
        menuAktiviKlase();
    });

    $('#main_nav > a').click(function(){
        $('#main_nav').removeClass('active');
    });
});

function headerBackgroundoTvarkymas(){
    if ($(document).scrollTop() >= 300) {
        $('header').addClass('fixed-header');
    } else {
        $('header').removeClass('fixed-header');
        $('#main_nav > a').removeClass('active');
    }
    return;
}

function menuAktiviKlase() {
    var nuorodu_skaicius = $('#main_nav > a').length,
        href_verte = '';

    for ( var i=0; i<nuorodu_skaicius; i++ ) {
        href_verte = $('#main_nav > a').eq(i).attr('href');

        if($(href_verte).length){
            if (scrollY + 70 >= $(href_verte).offset().top && scrollY + 70 < $(href_verte).offset().top + $(href_verte).height() ) {
                $('#main_nav > a').removeClass('active');
                $('#main_nav > a[href="'+href_verte+'"]').addClass('active');
            } 
        }
        
    }
    return;
}

function renderDukBlock(data){
    var html = '';
    for ( var i=0; i<data.length; i++) {
        html += renderOneDukBox( data[i] );
    }
    $('#duk > div > #duk_block').html(html);
    return;
}

function renderOneDukBox( duomenys ) {
    var html = ' <div class="duk-box">\
                    <h4>'+duomenys.klausimas+'</h4>\
                    <p>'+duomenys.atsakymas+'</p>\
                </div>\ '
    return html;
}

function responsiveNAV(){
    $('.menu-toggle').click(function(){
        $('#main_nav').toggleClass('active');
    });
}

$('#return-to-top').click(function() {
    $('body,html').animate({
        scrollTop : 0
    }, 1500);
});

function updateTimer() {
    var future = Date.parse("June 8, 2024 15:00:00");
    var now = new Date();
    var diff = future - now;
  
    var days = Math.floor( diff / (1000*60*60*24) );
    var hours = Math.floor( diff / (1000*60*60) );
    var mins = Math.floor( diff / (1000*60) );
    var secs = Math.floor( diff / 1000 );
  
    var d = days;
    var h = hours - days  * 24;
    var m = mins  - hours * 60;
    var s = secs  - mins  * 60;
  
    var wordForDays = kurisZodis(d, 'd');
    var wordForHours = kurisZodis(h, 'h');
    var wordForMins = kurisZodis(m, 'm');
    var wordForSecs = kurisZodis(s, 's');

    var diena = d == 0 ? '' : '<div>'+d+'<span>'+wordForDays+'</span></div>';
    var valanda = h == 0 ? '' : '<div>'+h+'<span>'+wordForHours+'</span></div>';
    var minute = m == 0 ? '' : '<div>'+m+'<span>'+wordForMins+'</span></div>';
    var sekunde = s == 0 ? '' : '<div>'+s+'<span>'+wordForSecs+'</span></div>';

    document.getElementById("timer").innerHTML = diena + valanda + minute + sekunde;
}

setInterval('updateTimer()', 1000);

function kurisZodis(number, constant){
    var lastDigit = number % 10;
    if(number > 10 && number < 20){
        var lastDigit = 0;
    }
    if(lastDigit == 1){
        switch(constant){
        case 'd': return 'Diena';
        case 'h': return 'Valanda';
        case 'm': return 'Minutė';
        case 's': return 'Sekundė';
        default: return '';
        }
    } else if( lastDigit == 0){
        switch(constant){
        case 'd': return 'Dienų';
        case 'h': return 'Valandų';
        case 'm': return 'Minučių';
        case 's': return 'Sekundžių';
        default: return '';
        }
    } else {
        switch(constant){
        case 'd': return 'Dienos';
        case 'h': return 'Valandos';
        case 'm': return 'Minutės';
        case 's': return 'Sekundės';
        default: return '';
        }
    }
}