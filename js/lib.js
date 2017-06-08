/*   Смена классов    */
$(function() {
	$("#side").click(function() {
		$('.left_bar ul li').removeClass('active');
	})
});
$(function() {
    $("ul.sort li").click(function() {
        $("ul.sort li").removeClass("active");
        $(this).toggleClass("active");
    })
});

/*Запрет перетаскивания картинок*/
setInterval(function(){    
	$('img').attr({
		"ondrag":"return false",
		"ondragdrop":"return false",
		"ondragstart":"return false"
	})
}, 300)
/*Запрет перетаскивания ссылок*/
setInterval(function(){    
	$('a').attr({
		"ondrag":"return false",
		"ondragdrop":"return false",
		"ondragstart":"return false"
	})
}, 300)




/*  Галерея  */

function Gallery(target) {
  this.target = $(target);
  this.images = $('.photos img', this.target);
  this.index = 0;
}

Gallery.prototype.init = function() {
  var self = this;
  $('button.next', this.target).click(function() {
    self.images.eq(self.index).css('opacity',  0);
    self.index++;
    if (self.index >= self.images.length) {
      self.index = 0;
    }
    self.images.eq(self.index).css('opacity', 1);
    $(this).parents('div[class*="gallery"]').find(".small_galery div").removeClass("showed");
    $(this).parents('div[class*="gallery"]').find(".small_galery img[data-num ="+self.index+"]").parent().addClass("showed");
  });
  $('button.prev', this.target).click(function() {
    self.images.eq(self.index).css('opacity',  0);
    self.index--;
    if (self.index < 0) {
      self.index = self.images.length - 1;
    }
    self.images.eq(self.index).css('opacity', 1);
    $(this).parents('div[class*="gallery"]').find(".small_galery div").removeClass("showed");
    $(this).parents('div[class*="gallery"]').find(".small_galery img[data-num ="+self.index+"]").parent().addClass("showed");
  });
  $('.small_galery img', this.target).click(function() {
    self.index = $(this).attr('data-num');
    self.images.css('opacity', 0);
    self.images.eq(self.index).css('opacity', 1);
    $(this).parents('div[class*="gallery"]').find(".small_galery div").removeClass("showed");
    $(this).parent().addClass("showed");
  });
};

$(function() {
  $('.gallery').each(function() {
    new Gallery(this).init();
  });
});



/* ====  Количество человек (выпадающее меню)  ====*/

$(document).on(
	'click.bs.dropdown.data-api', 
	'[class*="fix"]',
	function (e) { e.stopPropagation() }
);

$(function() {
	$(".fix .range_inputs .applyBtn").click(function() {
		$(this).parents('.open').removeClass("open");

	})
	$(".fix .range_inputs .cancelBtn").click(function() {
		$('#human').val( 1);
		$(".fix input[type='radio']").removeAttr("checked");
		$(".fix input[name='man']:first").prop("checked", true);
		$(this).parents('.open').removeClass("open");
	})
});


/* Чекбоксы выпадающего меню  (добавить клонирование селектов) */


$(function() {
  var bornBlock = $('.children_born_block');
  var target = $('#human')
    , men = $('.fix input[name="man"]')
    , children = $('.fix input[name="child"]');
  children.click(function() {
    if ('on' === $(this).data('state')) {  
      $(this).data('state', 'off').removeAttr('checked');
      bornBlock.hide();
      bornBlock.find('.child_data_born').not('.child_data_born:eq(0)').remove();
    }
    else {
      children.data('state', 'off');
      $(this).data('state', 'on').attr('checked', 'checked');
      var coin = $(this).data('coin');
      bornBlock.show();
      bornBlock.find('.child_data_born').not('.child_data_born:eq(0)').remove();
      var num = 1;
      for (i = 0; i < coin-1; i++) {
        bornBlock.find('.child_data_born:eq(0)').clone().appendTo(bornBlock).attr("id", "child-" + ++num);
      }
    }
  });
  men.add(children).click(function() {
    target.val((men.filter(':checked').val() || '')
      + (children.filter(':checked').val() || ''));
  });
});


/*   Добавление количества человек в форму booking   */

var changeHumans = $('#change_humans');
var humans = $('#humans');
changeHumans.change(function(){
	var num = +changeHumans.val();
	var clearf = humans.find('.clearfix');
	clearf.not('.clearfix:eq(0)').remove();
	$('input[name = "date_born"]').val('');
	for (i  = 1; i < num; i++) {
		var count = i;
		humans.find('.clearfix:eq(0)').clone().appendTo(humans).attr("id", "human-" + ++count);
	}
});

var changeChildrens = $('#change_childrens');
var childrens = $('#childrens');
changeChildrens.change(function(){
	var num = +changeChildrens.val();
	var clearf = childrens.find('.clearfix');
	childrens.css('display', 'block');
	if (num === 0) {
		childrens.css('display', 'none');
	}	
	clearf.not('.clearfix:eq(0)').remove();
	$('input[name = "date_born"]').val('');
	for (i  = 1; i < num; i++) {
		var count = i;
		humans.find('.clearfix:eq(0)').clone().appendTo(childrens).attr("id", "child-" + ++count);
	}
});

/*  Маска даты  */
if ($('.add_people')) {
	$(function(){
		$('input[name = "date_born"]').mask("99/99/9999");
	});
}



/*   Акордион  */
$(function() {
	var acord = $('.left_bar.slide');
	acord.click(function(){
		acord.not(this).children('div').slideUp();
		$(this).children('div').slideDown();
	})
});

/*   Календарь   */

if (document.querySelector('input[name="daterange"]')) {
	$(function() {
	$('input[name="daterange"]').daterangepicker({
	"buttonClasses": "btn btn-md",
	"applyClass": "btn-primary",
	"applyClass": "apply_btn",
	 "locale": {
	        "format": "DD.MM.YY",
	        "separator": " - ",
	        "applyLabel": "Применить",
	        "cancelLabel": "Отмена",
	        "fromLabel": "От",
	        "toLabel": "До",
	        "customRangeLabel": "Свой",
	        "daysOfWeek": [
	            "Вс",
	            "Пн",
	            "Вт",
	            "Ср",
	            "Чт",
	            "Пт",
	            "Сб"
	        ],
	        "monthNames": [
	            "Январь",
	            "Февраль",
	            "Март",
	            "Апрель",
	            "Май",
	            "Июнь",
	            "Июль",
	            "Август",
	            "Сентябрь",
	            "Октябрь",
	            "Ноябрь",
	            "Декабрь"
	        ],
	        "firstDay": 1
	    }
	});});
}

if (document.querySelector('input[name="date"]')) {
	$(function() {
	$('input[name="date"]').daterangepicker({
		"singleDatePicker": true,
		"showDropdowns": true,
		 "autoApply": true,
		"startDate": "01. 01. 2000",
		 "locale": {
		        "format": "DD. MM. YYYY",
		        "separator": " - ",
		        "applyLabel": "Применить",
		        "cancelLabel": "Отмена",
		        "fromLabel": "От",
		        "toLabel": "До",
		        "customRangeLabel": "Свой",
		        "daysOfWeek": [
		            "Вс",
		            "Пн",
		            "Вт",
		            "Ср",
		            "Чт",
		            "Пт",
		            "Сб"
		        ],
		        "monthNames": [
		            "Январь",
		            "Февраль",
		            "Март",
		            "Апрель",
		            "Май",
		            "Июнь",
		            "Июль",
		            "Август",
		            "Сентябрь",
		            "Октябрь",
		            "Ноябрь",
		            "Декабрь"
		        ],
		        "firstDay": 1
		    }
	});});
};

if (document.querySelector('input[name^="date-time"]')) {
	$(function() {
	$('input[name^="date-time"]').daterangepicker({
		"singleDatePicker": true,
		"showDropdowns": true,
		 "timePicker": true,
		 "applyClass": "apply_btn",
		 "timePicker24Hour": true,
		 "locale": {
		        "format": "DD. MM. YYYY  -  HH:mm ",
		        "separator": " - ",
		        "daysOfWeek": [
		            "Вс",
		            "Пн",
		            "Вт",
		            "Ср",
		            "Чт",
		            "Пт",
		            "Сб"
		        ],
		        "monthNames": [
		            "Январь",
		            "Февраль",
		            "Март",
		            "Апрель",
		            "Май",
		            "Июнь",
		            "Июль",
		            "Август",
		            "Сентябрь",
		            "Октябрь",
		            "Ноябрь",
		            "Декабрь"
		        ],
		        "firstDay": 1
		    }
	});});
};