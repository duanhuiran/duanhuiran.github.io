$(function(){
	
	var eatSprite = new CssSprite({
        target:'#eat',
        paused:true,
        loop:1,
        frames: [[2560,5760,1280,720],[0,6480,1280,720],[1280,5760,1280,720],[0,5760,1280,720],[2560,5040,1280,720],[1280,5040,1280,720],[0,5040,1280,720],[2560,4320,1280,720],[1280,4320,1280,720],[0,4320,1280,720],[2560,3600,1280,720],[1280,3600,1280,720],[0,3600,1280,720],[2560,2880,1280,720],[1280,2880,1280,720],[0,2880,1280,720],[2560,2160,1280,720],[1280,2160,1280,720],[0,2160,1280,720],[2560,1440,1280,720],[1280,1440,1280,720],[0,1440,1280,720],[2560,720,1280,720],[1280,720,1280,720],[0,720,1280,720],[2560,0,1280,720],[1280,0,1280,720],[1280,0,1280,720],[0,0,1280,720]],
        animationend:function () {
            this.target.style.display = 'none';
            
            // document.querySelector('.full').style.display = 'block';

        }
    })

    var spitSprite = new CssSprite({
        target:'#eat',
        paused:true,
        loop:1,
        frames: [[0,0,1280,720],[1280,0,1280,720],[1280,0,1280,720],[2560,0,1280,720],[0,720,1280,720],[1280,720,1280,720],[2560,720,1280,720],[0,1440,1280,720],[1280,1440,1280,720],[2560,1440,1280,720],[0,2160,1280,720],[1280,2160,1280,720],[2560,2160,1280,720],[0,2880,1280,720],[1280,2880,1280,720],[2560,2880,1280,720],[0,3600,1280,720],[1280,3600,1280,720],[2560,3600,1280,720],[0,4320,1280,720],[1280,4320,1280,720],[2560,4320,1280,720],[0,5040,1280,720],[1280,5040,1280,720],[2560,5040,1280,720],[0,5760,1280,720],[1280,5760,1280,720],[0,6480,1280,720],[2560,5760,1280,720]],
        animationend:function () {
            this.target.style.display = 'none';
            
            // document.querySelector('.hunger').style.display = 'block';
        }
    })




	function plus(d,b,h) {

    var windowWidth = $(window).width()
    var windowHeight = $(window).height()
    var bgWidth = $('.bgPic').width()
    var bgHeight = $('.bgPic').height()
    var d = Math.sqrt(windowWidth/bgWidth)
    var b = (bgWidth/2)*(d-1)
    var h = $('.hunger').height()/2 * windowWidth/bgWidth

    console.log('长度倍数' + windowWidth/bgWidth);
    console.log('变化后的full高度' + h);
    	
    	$('.eat').css({ 
    		'transform':'scale(' + d + ')',
    		'left': b + 'px',
    		'top': '50%',
    		'margin-top': -h + 'px'
    	}
	);
    	$('.hunger').css({
    		'transform':'scale(' + d + ')',
    		'left': b + 'px',
    		'top': '50%',
    		'margin-top': -h + 'px',
    		'z-index':"0"
    	}
   	);
    	$('.full').css({
    		'transform':'scale(' + d + ')',
    		'left': b + 'px',
    		'top': '50%',
    		'margin-top': -h + 'px'
    	}
    );
    	$('.bgPic').css({
    		'transform':'scale(' + d + ')',
    		'left': b + 'px',
    	}
    );

    	$('.surface').css({
    		'transform':'scale(' + d + ')',
    		'left': b + 'px',
    		'top': '50%',
    		'margin-top': -h + 'px'
    	}
    );


	};


		// $('#Title').fadeIn(5000);
		// $('.Intro').animate({
		// 			margin: '0 0 0 690px'
		// 		}, 900);



	$(document).ready(plus);
	$(window).resize(plus);
	


	$('#textAll').fullpage({
		

		onLeave: function(index, nextindex, direction){
			var e = $('.event').width()
			var windowWidth = $(window).width()
			var bgWidth = $('.bgPic').width()
			var d = Math.sqrt(windowWidth/bgWidth)
			var b = (bgWidth/2)*(d-1)

			console.log(direction);
			if(index == 1 && direction == "down") {
				    $('#Intro').fadeOut(100);
                    $('#Title').fadeOut(100);
					document.querySelector('.hunger').style.display = 'none';
                    eatSprite.target.style.display = 'block';
                    eatSprite.play();
                    $('.full').delay(830).fadeIn(50);
                    $('.timeLine').toggleClass('timeLineChanged');;



			}
			if(index == 2 && direction == "up"){
					document.querySelector('.full').style.display = 'none';
                    // document.querySelector('.hunger').style.display = 'none';
                    spitSprite.target.style.display = 'block';
                    spitSprite.play();
                    $('.hunger').delay(830).fadeIn(50);
                    $('#Intro').fadeIn(500);
                    $('#Title').fadeIn(500);
                    $('.timeLine').toggleClass('timeLineChanged');;




			}

			if(index == 2 && direction == "down"){
				$('#bgPic').animate({
					left: "9%"
				}, 900);
				$('#zipRec').toggleClass('zipRecChanged');
				$('#text001').toggleClass('text001Changed');
				$('#full').toggleClass('fullColorChanged');

				$('#movie1-1').toggleClass('moveTo-1');	
				$('#movie1-2').toggleClass('moveTo-2');
				$('#movie1-3').toggleClass('moveTo-3');

				$('#movie1-1').find('img').toggleClass('svgChanged');
				$('#movie1-2').find('img').toggleClass('svgChanged');
				$('#movie1-3').find('img').toggleClass('svgChanged');

				$('.M1-1').toggleClass('svgChanged');
				$('.M1-2').toggleClass('svgChanged');
				$('.M1-3').toggleClass('svgChanged');
				

			}

			if(index == 3 && direction == "up"){
				$('#bgPic').animate({
					left: b + "px"
				}, 900);
				$('#zipRec').toggleClass('zipRecChanged');
				$('#text001').toggleClass('text001Changed');
				$('#full').toggleClass('fullColorChanged');

				$('#movie1-1').toggleClass('moveTo-1');
				$('#movie1-2').toggleClass('moveTo-2');
				$('#movie1-3').toggleClass('moveTo-3');

				$('#movie1-1').find('img').toggleClass('svgChanged');
				$('#movie1-2').find('img').toggleClass('svgChanged');
				$('#movie1-3').find('img').toggleClass('svgChanged');

				$('.M1-1').toggleClass('svgChanged');
				$('.M1-2').toggleClass('svgChanged');
				$('.M1-3').toggleClass('svgChanged');

				

			}
			if(index == 3 && direction == "down"){
				$('#bgPic').animate({
					left: "9%"
				}, 900);
				$('#text001').toggleClass('text001Changed02');
				$('#zipRec').toggleClass('zipRecChanged02');

				$('#movie1-1').toggleClass('moveTo-1');
				$('#movie1-2').toggleClass('moveTo-2');
				$('#movie1-3').toggleClass('moveTo-3');

				$('#movie1-1').find('img').toggleClass('svgChanged');
				$('#movie1-2').find('img').toggleClass('svgChanged');
				$('#movie1-3').find('img').toggleClass('svgChanged');

				$('.M1-1').toggleClass('svgChanged');
				$('.M1-2').toggleClass('svgChanged');
				$('.M1-3').toggleClass('svgChanged');

				$('#full').toggleClass('turnGray');

				$('#screen2').toggleClass('screenShow');
				


				
			}

			if(index == 4 && direction == "up"){
				$('#text001').toggleClass('text001Changed02');
				$('#zipRec').toggleClass('zipRecChanged02');

				$('#movie1-1').toggleClass('moveTo-1');
				$('#movie1-2').toggleClass('moveTo-2');
				$('#movie1-3').toggleClass('moveTo-3');

				$('#movie1-1').find('img').toggleClass('svgChanged');
				$('#movie1-2').find('img').toggleClass('svgChanged');
				$('#movie1-3').find('img').toggleClass('svgChanged');

				$('.M1-1').toggleClass('svgChanged');
				$('.M1-2').toggleClass('svgChanged');
				$('.M1-3').toggleClass('svgChanged');


				$('#full').toggleClass('turnGray');

				$('#screen2').toggleClass('screenShow');
				
				

			}
			if(index == 4 && direction == "down"){
				$('#screen2').toggleClass('screenShow');


				$('#movie2-1').toggleClass('moveTo-1');
				$('#movie2-2').toggleClass('moveTo-2');
				$('#movie2-3').toggleClass('moveTo-3');

				$('.M2-1').toggleClass('svgChanged');
				$('.M2-2').toggleClass('svgChanged');
				$('.M2-3').toggleClass('svgChanged');

				
			}

			if(index == 5 && direction == "up"){
				$('#screen2').toggleClass('screenShow');


				$('#movie2-1').toggleClass('moveTo-1');
				$('#movie2-2').toggleClass('moveTo-2');
				$('#movie2-3').toggleClass('moveTo-3');

				$('.M2-1').toggleClass('svgChanged');
				$('.M2-2').toggleClass('svgChanged');
				$('.M2-3').toggleClass('svgChanged');


			}

			if(index == 5 && direction == "down"){
				$('#screen3').toggleClass('screenShow');

				$('#movie2-1').toggleClass('moveTo-1');
				$('#movie2-2').toggleClass('moveTo-2');
				$('#movie2-3').toggleClass('moveTo-3');

				$('.M2-1').toggleClass('svgChanged');
				$('.M2-2').toggleClass('svgChanged');
				$('.M2-3').toggleClass('svgChanged');


			}

			if(index == 6 && direction == "up"){

				$('#screen3').toggleClass('screenShow');

				$('#movie2-1').toggleClass('moveTo-1');
				$('#movie2-2').toggleClass('moveTo-2');
				$('#movie2-3').toggleClass('moveTo-3');

				$('.M2-1').toggleClass('svgChanged');
				$('.M2-2').toggleClass('svgChanged');
				$('.M2-3').toggleClass('svgChanged');
				

				
			}

			if(index == 6 && direction == "down"){
				$('#screen3').toggleClass('screenShow');


				$('#movie3-1').toggleClass('moveTo-1');
				$('#movie3-2').toggleClass('moveTo-2');
				$('#movie3-3').toggleClass('moveTo-3');

				$('#movie3-1').find('img').toggleClass('svgChanged');
				$('#movie3-2').find('img').toggleClass('svgChanged');
				$('#movie3-3').find('img').toggleClass('svgChanged');

				$('.M3-1').toggleClass('svgChanged');
				$('.M3-2').toggleClass('svgChanged');
				$('.M3-3').toggleClass('svgChanged');



			}

			if(index == 7 && direction == "up"){
				$('#screen3').toggleClass('screenShow');

				$('#movie3-1').toggleClass('moveTo-1');
				$('#movie3-2').toggleClass('moveTo-2');
				$('#movie3-3').toggleClass('moveTo-3');

				$('#movie3-1').find('img').toggleClass('svgChanged');
				$('#movie3-2').find('img').toggleClass('svgChanged');
				$('#movie3-3').find('img').toggleClass('svgChanged');

				$('.M3-1').toggleClass('svgChanged');
				$('.M3-2').toggleClass('svgChanged');
				$('.M3-3').toggleClass('svgChanged');
				
				
			}

			if(index == 7 && direction == "down"){
				$('#movie3-1').toggleClass('moveTo-1');
				$('#movie3-2').toggleClass('moveTo-2');
				$('#movie3-3').toggleClass('moveTo-3');

				$('#movie3-1').find('img').toggleClass('svgChanged');
				$('#movie3-2').find('img').toggleClass('svgChanged');
				$('#movie3-3').find('img').toggleClass('svgChanged');

				$('.M3-1').toggleClass('svgChanged');
				$('.M3-2').toggleClass('svgChanged');
				$('.M3-3').toggleClass('svgChanged');

				$('#screen4').toggleClass('screenShow');

				


			}

			if(index == 8 && direction == "up"){
				$('#screen4').toggleClass('screenShow');

				$('#movie3-1').toggleClass('moveTo-1');
				$('#movie3-2').toggleClass('moveTo-2');
				$('#movie3-3').toggleClass('moveTo-3');

				$('#movie3-1').find('img').toggleClass('svgChanged');
				$('#movie3-2').find('img').toggleClass('svgChanged');
				$('#movie3-3').find('img').toggleClass('svgChanged');
				
				$('.M3-1').toggleClass('svgChanged');
				$('.M3-2').toggleClass('svgChanged');
				$('.M3-3').toggleClass('svgChanged');
				
				
			}

			if(index == 8 && direction == "down"){
				$('#screen4').toggleClass('screenShow');

				$('#movie4-1').toggleClass('moveTo-1');
				$('#movie4-2').toggleClass('moveTo-2');
				$('#movie4-3').toggleClass('moveTo-3');

				$('#movie4-1').find('img').toggleClass('svgChanged');
				$('#movie4-2').find('img').toggleClass('svgChanged');
				$('#movie4-3').find('img').toggleClass('svgChanged');

				$('.M4-1').toggleClass('svgChanged');
				$('.M4-2').toggleClass('svgChanged');
				$('.M4-3').toggleClass('svgChanged');


			}

			if(index == 9 && direction == "up"){
				$('#screen4').toggleClass('screenShow');

				$('#movie4-1').toggleClass('moveTo-1');
				$('#movie4-2').toggleClass('moveTo-2');
				$('#movie4-3').toggleClass('moveTo-3');

				$('#movie4-1').find('img').toggleClass('svgChanged');
				$('#movie4-2').find('img').toggleClass('svgChanged');
				$('#movie4-3').find('img').toggleClass('svgChanged');

				$('.M4-1').toggleClass('svgChanged');
				$('.M4-2').toggleClass('svgChanged');
				$('.M4-3').toggleClass('svgChanged');

				
				
			}

			if(index == 9 && direction == "down"){

				$('#movie4-1').toggleClass('moveTo-1');
				$('#movie4-2').toggleClass('moveTo-2');
				$('#movie4-3').toggleClass('moveTo-3');

				$('#movie4-1').find('img').toggleClass('svgChanged');
				$('#movie4-2').find('img').toggleClass('svgChanged');
				$('#movie4-3').find('img').toggleClass('svgChanged');

				$('.M4-1').toggleClass('svgChanged');
				$('.M4-2').toggleClass('svgChanged');
				$('.M4-3').toggleClass('svgChanged');
				
				$('#screen5').toggleClass('screenShow');


			}

			if(index == 10 && direction == "up"){
				$('#movie4-1').toggleClass('moveTo-1');
				$('#movie4-2').toggleClass('moveTo-2');
				$('#movie4-3').toggleClass('moveTo-3');

				$('#movie4-1').find('img').toggleClass('svgChanged');
				$('#movie4-2').find('img').toggleClass('svgChanged');
				$('#movie4-3').find('img').toggleClass('svgChanged');

				$('.M4-1').toggleClass('svgChanged');
				$('.M4-2').toggleClass('svgChanged');
				$('.M4-3').toggleClass('svgChanged');

				$('#screen5').toggleClass('screenShow');

				
				
			}

			if(index == 10 && direction == "down"){
				$('#screen5').toggleClass('screenShow');
				$('#bgPic').animate({
					left: b + "px"
				}, 900);

				$('#full').toggleClass('fullColorChanged');

				$('#screen3').toggleClass('screenShow');
				$('#screen4').toggleClass('screenShow');
				$('#screen5').toggleClass('screenShow');

				$('#conclusion').toggleClass('conclusionChanged');
				

			}

			if(index == 11 && direction == "up"){
				$('#screen5').toggleClass('screenShow');
				$('#bgPic').animate({
					left: "8%"
				}, 900);
				$('#full').toggleClass('fullColorChanged');

				$('#screen3').toggleClass('screenShow');
				$('#screen4').toggleClass('screenShow');
				$('#screen5').toggleClass('screenShow');
				$('#conclusion').toggleClass('conclusionChanged');
			}

			if(index ==11 && direction == "down"){
				


			}


		}
	});
});