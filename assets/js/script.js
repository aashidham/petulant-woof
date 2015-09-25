var dayOfWeekString = ['Mon' , 'Tue' , 'Wed' , 'Thu' , 'Fri' , 'Sat', 'Sun'];
var hours_string = ['Midnight' , '1 AM' , '2 AM' , '3 AM' , '4 AM' , '5 AM' , '6 AM' , '7 AM' , '8 AM' , '9 AM' , '10 AM' , '11 AM' , 'Noon' , '1 PM' , '2 PM' , '3 PM' , '4 PM' , '5 PM' , '6 PM' , '7 PM' , '8 PM' , '9 PM' , '10 PM' , '11 PM'];
var month_string = ['Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec'];

var daystoshow = 7 // Default : 7 days = 1 week; 
var startingdate = new Date() // Default : Starting date = Today ;

$(document).ready(function (){
	$("#generate").on('click' , function(){
		$(".table_container").empty();
		if($("#daystoshow").val()) {
			daystoshow =  parseInt($("#daystoshow").val());	
		}
		generate_table(startingdate , daystoshow);
		$(this).attr('disabled', '');
	});

	$("#datepicker").datepicker({ 
        dateFormat: "yy-mm-dd", 
        onSelect: function(){
        	startingdate = new Date($(this).val());
        	$("#generate").removeAttr('disabled');
        }
    });

    function generate_table(date , counts) {
    	var table_container = $(".table_container");
    	table_container.append("<div id='top_title_month_date'></div>");
    	table_container.append("<div class='clear'></div>");
    	table_container.append("<div id='top_title_day_of_week'></div>");
    	table_container.append("<div class='clear'></div>");

    	generate_top_title_bar(date, counts);
    	generate_main_table(counts);
    }

    function generate_top_title_bar(date , counts) {

    	var top_title_month_date = $("#top_title_month_date");
    	var top_title_day_of_week = $("#top_title_day_of_week");

    	for (var index = 0; index < counts; index++) {
			var current_date = new Date(date.getTime() + 86400000 * index );
			var month = month_string[current_date.getMonth()];
			var day = current_date.getDate() + 1;
			var dayOfWeek = dayOfWeekString[current_date.getDay()];
			top_title_month_date.append("<span class='monthandday'>" + month + ' ' + day + "</span>");
			$("span.monthandday").css('width',parseInt(100 / counts) -0.5 + '%');
			top_title_day_of_week.append("<span class='dayofweek'>" + dayOfWeek + "</span>");
			$("span.dayofweek").css('width',parseInt(100 / counts) -0.5 + '%');
		};
    }

    function generate_main_table(counts) {

    	var table_container = $(".table_container");

    	for (var index = 0 ; index < 24; index++) {
			var class_name = '';

			table_container.append("<div class='one_row'></div>");
			table_container.append("<div class='clear'></div>");

			var one_row = $("div.one_row").eq(index);
			

			one_row.append("<div class='hour'>" + hours_string[index] + "</div>");


			for (var index1 = 0; index1 < counts; index1++) {

				one_row.append("<div class = 'chip_div'></div>");

				var chip_div = $("div.chip_div").eq(index1 + index * counts);
				chip_div.css('width',parseInt(100 / counts) -0.5 + '%');

				for (var index2 = 0; index2 < 3; index2++) {
					class_name = index1 + 1 +' ' + index + ' ' + index2*15 + ' cell_div';
					chip_div.append("<div class='" + class_name + "'></div>");
				}

			};
		};
    }
})