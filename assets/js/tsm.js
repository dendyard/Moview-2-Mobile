

var where = window.location.host;
if(where == 'localhost:8888' || where == 'localhost'){
    var base_url = window.location.protocol + "//" + window.location.host + "/transshoppingmall";
}
else{
    var base_url = window.location.protocol + "//" + window.location.host + "/";
}


$(document).ready(function(){
  $('.img-slider-center').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: '<img src="' + base_url + '/assets/images/leftarr.png" class="arrsld">',
      nextArrow: '<img src="' + base_url + '/assets/images/rightarr.png" class="arrsld2">',
  });
  
  $('.promos-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      variableWidth: true,
      centerMode: true,
      initialSlide: 1,
      prevArrow: '<img src="' + base_url + '/assets/images/leftarr.png" class="arrsld3">',
      nextArrow: '<img src="' + base_url + '/assets/images/rightarr.png" class="arrsld4">',
      
  });
    
  $('.events-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      centerMode: true,
      prevArrow: '<img src="' + base_url + '/assets/images/leftarr.png" class="arrsld5">',
      nextArrow: '<img src="' + base_url + '/assets/images/rightarr.png" class="arrsld6">',
  });
    
    
    $('.promos-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
      $('.sld_tsm_.slick-slide').each(function() {
            $(this).addClass('hide');
            $(this).removeClass('whitebg');
          
            $(this).find('.sld_tsm_txtpromo').css('opacity','0');
            $(this).find('.sld_tsm_txtpromodate').css('opacity','0');
            $(this).find('.desc-promo').css('opacity','0');
            
          
        });
      $('.sld_tsm_.slick-active').each(function() {
            $(this).removeClass('hide');
            $(this).addClass('whitebg');
            $(this).find('.sld_tsm_txtpromo').css('opacity','1');
            $(this).find('.sld_tsm_txtpromodate').css('opacity','1');
            $(this).find('.desc-promo').css('opacity','1');
        });
        
    });
    
    
    
    $('.events-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
      $('.sld_tsm_2.slick-slide').each(function() {
            $(this).addClass('hide');
            $(this).find('.sld_tsm_txtevents').css('opacity','0');
            $(this).find('.desc-promo').css('opacity','0');
            
        });
      $('.sld_tsm_2.slick-active').each(function() {
            $(this).removeClass('hide');
            $(this).find('.sld_tsm_txtevents').css('opacity','1');
            $(this).find('.desc-promo').css('opacity','1');
        });
        
    });
    
    $('#pickm').on('click', function(){
        showmalls(1);
    });
    
    $('#clstn2').on('click', function(){
        showmalls(0);
    })
    
    $('#srcbtn').on('click', function(){
        showSearch(1);
        
    });
    
    $('#bbsrc').on('click', function(){
        showSearch(0);
    })
    
    $('#closesearch').on('click', function(){
        showSearch(0);
    })
    
    filterlist0.addEventListener('click', getFilter);
    filterlist1.addEventListener('click', getFilter);
    filterlist2.addEventListener('click', getFilter);
    filterlist3.addEventListener('click', getFilter);
    
    function getFilter(e){
        $('#filterlist0').removeClass('active');
        $('#filterlist1').removeClass('active');
        $('#filterlist2').removeClass('active');
        $('#filterlist3').removeClass('active');
        
        switch(e.target.id) {
            case "filterlist0":
                document.getElementById("txtsearchmall").value = "";
                $('#filterlist0').addClass('active');
                break;
            case "filterlist1":
                document.getElementById("txtsearchmall").value = "Trans Studio";
                $('#filterlist1').addClass('active');
                break;
            case "filterlist2":
                document.getElementById("txtsearchmall").value = "Transpark";
                $('#filterlist2').addClass('active');
                break;
            case "filterlist3":
                document.getElementById("txtsearchmall").value = "Transmart";
                $('#filterlist3').addClass('active');
                break;    
        }
        filterMall();
        
    }
    
    function showmalls(v){
        if (v){
           TweenMax.to(dimmerModal,0.5,{opacity:1, display:"block",ease:Expo.easeOut});
            
           TweenMax.to(modalpickmall,0.5,{opacity:1, display:"block",ease:Expo.easeOut});
            
        }else{
            
            TweenMax.to(dimmerModal,0,{opacity:0, display:"none",ease:Expo.easeOut});
            TweenMax.to(modalpickmall,0,{opacity:0, display:"none",ease:Expo.easeOut});   
        }
    }
    
                
    function showSearch(v){
        
        if (v){
            TweenMax.to(modalsearch,0.5,{opacity:1, display:"block",ease:Expo.easeOut})    
            TweenMax.to(dimmerModal,0.5,{opacity:1, display:"block",ease:Expo.easeOut});
            document.getElementById("txtsearch").focus();
        }else{
            TweenMax.to(modalsearch,0,{opacity:0, display:"none",ease:Expo.easeOut})    
            TweenMax.to(dimmerModal,0,{opacity:0, display:"none",ease:Expo.easeOut})   
        }

    }
    
    $('#txtsearch').on('keypress', (e)=>{   
        if(e.which == 13) {
            TweenMax.to(resboard,0,{y:2000, display:"none",ease:Expo.easeOut}); 
            getSearch(txtsearch.value);
        }
    });
    
    $('#icossrc').on('click', (e)=>{
        TweenMax.to(resboard,0,{y:2000, display:"none",ease:Expo.easeOut}); 
            getSearch(txtsearch.value);
    });
    
    TweenMax.to(resboard,0,{y:2000, display:"none",ease:Expo.easeOut}) 
    
    
    function getSearch(flt){
        let filtersearch = flt;
        let tenantlist = '';
        resboard.style.display = 'block';
        brandresult.style.display = 'none';
        emptsrc.style.display = 'none';
        TweenMax.to(resboard,0.5,{y:0, ease:Sine.easeOut});
        $.ajax({
            type: 'GET',
            url: base_url + '/home/getSearch/' + filtersearch,
            dataType: 'json',
            }).done(function (result) {
                tenantlist = '';
                sResult.innerHTML = result.tenant.length;
                if (result.tenant.length > 0) {
                    
                    emptsrc.style.display = 'none';
                    brandresult.style.display = 'block';
                $.each(result.tenant, function(index, element) {
                    
                    tenantlist += "<div class='brand-list-det-2 mr10'><img src='" + element.attributes.imageUrl + "' class='imgbrandlogo'><div class='text-align-left font20 ml-25'>" + element.attributes.name + "</div><div class='text-align-left font20 ml-25 mt-10'><div class='pfloor'>" + element.attributes.mallFloor + "</div> <div class='pcal'><img src='" + base_url + "/assets/images/phone-fil.png'>&nbsp;&nbsp;<span>" + element.attributes.contact + "</span></div></div><div class='desc-brd-detail text-align-left font20 ml-25 mt-10'>" + element.attributes.description + "</div></div>";
                });
                    
                
                }else{
                    brandresult.style.display = 'none';
                    emptsrc.style.display = 'block';
                }
                sResultBrand.innerHTML = tenantlist;
        });       
    }
    
    
    var oprg = false;
    
    $('.header-inline').on('mouseover', ()=>{
        TweenMax.to(mainlogo,0.3,{css:{margin:"0", width: "235px"}, ease:Expo.easeOut});
                  TweenMax.to(mnright,0.3,{scaleY:1, opacity:1, ease:Back.easeOut});
                  TweenMax.to(mnlinks,0.3,{scaleY:1, opacity:1, ease:Back.easeOut});
    });
    
    $(window).scroll(function(e){ 
      var $el = $('.header-inline'); 
      var isPositionFixed = ($el.css('position') == 'fixed');
            if ($(this).scrollTop() > 50){ 
                $('#scrolldown').css('display','none');
            }
            if ($(this).scrollTop() < 50){ 
                $('#scrolldown').css('display','block');
            }
            if ($(this).scrollTop() > 200){ 
               // $el.css({'position': 'fixed', 'top': '0px', 'z-index' : '100'}); 
                  TweenMax.to(mainlogo,0.3,{css:{margin:"auto", width: "50px"}, ease:Expo.easeOut});
                  TweenMax.to(mnright,0.3,{scaleY:0, opacity:0, ease:Expo.easeOut});
                  TweenMax.to(mnlinks,0.3,{scaleY:0, opacity:0, ease:Expo.easeOut, onComplete:()=>{
                      oprg = false;
                  }});

              }
              if ($(this).scrollTop() < 200){
               // $el.css({'position': 'fixed', 'top': '0px'}); 
                  TweenMax.to(mainlogo,0.3,{css:{margin:"0", width: "235px"}, ease:Expo.easeOut});
                  TweenMax.to(mnright,0.3,{scaleY:1, opacity:1, ease:Back.easeOut});
                  TweenMax.to(mnlinks,0.3,{scaleY:1, opacity:1, ease:Back.easeOut, onComplete:()=>{
                      oprg = false;
                  }});
              }     
      
      
    });
    
    
});

function filterMall() {
    var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("txtsearchmall");
        filter = input.value.toUpperCase();
        ul = document.getElementById("malllistul");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue =  a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }