// jQuery(document).ready(function(){
//     jQuery(window).load(function(){  //load函数
//         jQuery('.socket').show();
//     });
// });
	// $('.socket').fadeIn(100);


$(function(){


	function PC_or_M() {
            if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {

            	isM();

            }else {
            	isPC();
            }
        }

    PC_or_M();

    function isM(){

	$('.loading').fadeOut(500);

    $(".section2").after('<div class="section"></div>');
    $(".section4").after('<div class="section"></div>');
    $(".section6").after('<div class="section"></div>');
    $(".section8").after('<div class="section"></div>');
    $(".section10").after('<div class="section"><div id= "LG_M" class="event LG_M"><img src="img/legend_M.png" /></div></div> <div class="section"></div> <div class="section sectionLast"><div class="last"><div id="cast_M" class="cast_M"><div id="Note_M" class="Note_M"><h2>*Note</h2><p>Data sources: Douban(Douban.com) and ChinaBoxOffice(Cbooo.cn) <br />Data is limited to Chinese animated films(including co-productions) released in the Chinese Mainland from October 1949 to August 2019. <br />Disclaimer: All movie posters and animation characters are copyright to their respective owners. For inquiries please contact c_lab@cgtn.com.</p></div><div id="castLine_M" class="castLine_M"></div><div id="Credit_M" class="Credit_M"><h2>Credit</h2><p>Supervisor: Jiang Heping. <br>Managing Director: Zhang Shilei. <br>Project Manager: Si Nan.<br>Multimedia Producers: Xu Jiye,Zhou Rui.<br>Interactive Designer: Li Yixiao. <br>Interactive Developers: Duan Huiran(Intern),Bi Jiankun. <br>Chief Editor: Chen Ran. <br>Copy Editor: Nadim Diab. <br>Copywriter: Wu Lushi.<br>Data Editors & Visualization:  Zhang Yujia,Li Yixiao,Zhou Rui,Duan Huiran(Intern)</p></div><div id="Copyright_M" class="Copyright_M"><p style="width: 100%">Copyright &copy;2018 CGTN. Beijing ICP prepared NO. 16065310-3</p><div id="CopyLine" class="CopyLine"></div><div id="shares" class="shares"><div id="facebook" class="icons"><a href="//www.cgtn.com/socialmedia/facebook" target="_Blank"><img src="img/fb_M.png" alt="facebook" /></a></div><div id="tweet" class="icons"><a href="//www.cgtn.com/socialmedia/twitter" target="_Blank"><img src="img/tw_M.png" alt="tweet" /></a></div><div id="youtube" class="icons"><a href="//www.cgtn.com/socialmedia/youtube" target="_Blank"><img src="img/yb_M.png" alt="tweet" /></a></div><div id="ins" class="icons"><a href="//www.cgtn.com/socialmedia/instagram" target="_Blank"><img src="img/ins_M.png" alt="tweet" /></a></div><div id="pin" class="icons"><a href="//www.cgtn.com/socialmedia/pinterest" target="_Blank"><img src="img/pin_M.png" alt="tweet" /></a></div><div id="tumblr" class="icons"><a href="//www.cgtn.com/socialmedia/tumblr" target="_Blank"><img src="img/tumblr_M.png" alt="tweet" /></a></div><div id="miaopai" class="icons"><a href="//www.cgtn.com/socialmedia/miaopai" target="_Blank"><img src="img/mp_M.png" alt="tweet" /></a></div><div id="wechat" class="icons"><img src="img/wechat_M.png" alt="tweet" /></div><div id="weibo" class="icons"><a href="//www.cgtn.com/socialmedia/weibo" target="_Blank"><img src="img/weibo_M.png" alt="tweet" /></a></div><div id="douyin" class="icons"><img src="img/dy_M.png" alt="tweet" /></div></div></div></div></div></div>');
	
	var eatSprite = new CssSprite({
        target:'#eat',
        paused:true,
        loop:1,
        frames: [[750,6660,750,1332],[0,6660,750,1332],[3000,5328,750,1332],[2250,5328,750,1332],[1500,5328,750,1332],[750,5328,750,1332],[0,5328,750,1332],[3000,3996,750,1332],[2250,3996,750,1332],[1500,3996,750,1332],[750,3996,750,1332],[0,3996,750,1332],[3000,2664,750,1332],[2250,2664,750,1332],[1500,2664,750,1332],[750,2664,750,1332],[0,2664,750,1332],[3000,1332,750,1332],[2250,1332,750,1332],[1500,1332,750,1332],[750,1332,750,1332],[0,1332,750,1332],[3000,0,750,1332],[2250,0,750,1332],[1500,0,750,1332],[750,0,750,1332],[0,0,750,1332]],
        animationend:function () {
            this.target.style.display = 'none';
            
            // document.querySelector('.full').style.display = 'block';

        }
    })

    var spitSprite = new CssSprite({
        target:'#eat',
        paused:true,
        loop:1,
        frames: [[0,0,750,1332],[750,0,750,1332],[1500,0,750,1332],[2250,0,750,1332],[3000,0,750,1332],[0,1332,750,1332],[750,1332,750,1332],[1500,1332,750,1332],[2250,1332,750,1332],[3000,1332,750,1332],[0,2664,750,1332],[750,2664,750,1332],[1500,2664,750,1332],[2250,2664,750,1332],[3000,2664,750,1332],[0,3996,750,1332],[750,3996,750,1332],[1500,3996,750,1332],[2250,3996,750,1332],[3000,3996,750,1332],[0,5328,750,1332],[750,5328,750,1332],[1500,5328,750,1332],[2250,5328,750,1332],[3000,5328,750,1332],[0,6660,750,1332],[750,6660,750,1332]],

        animationend:function () {
            this.target.style.display = 'none';
            
            // document.querySelector('.hunger').style.display = 'block';
        }
    })




	function plus(d,b,h,q) {

    var windowWidth = $(window).width()
    var windowHeight = $(window).height()
    var bgWidth = $('.bgPic').width()
    var bgHeight = $('.bgPic').height()
    
    var d = windowWidth/bgWidth
    var b = (bgWidth/2)*(d-1)
    var h = $('.hunger').height()/2 * windowWidth/bgWidth
    

	// console.log(d*100 + '%')



    	$('.hunger').css({
    		// 'transform':'scale(' + d + ')',
    		// 'left': b + 'px',
    		// 'top': '50%',
    		// 'margin-top': -h + 'px',
    		// 'z-index':"0"
    	}
   	);
    	$('.full').css({
    		// 'transform':'scale(' + d + ')',
    		// 'left': b + 'px',
    		// 'top': '50%',
    		// 'margin-top': -h + 'px'
    	}
    );
    	$('.bgPic').css({
    		'transform':'scale(' + d + ')'
    	}
    );
 //    	$('.bgPic').css("left",function(i,curr){
 //    		if (windowWidth < 1280) {
 //    			return b + 'px';
 //    		}	
	// });

    	$('.surface').css({
    		// 'transform':'scale(' + d + ')',
    		// 'left': b + 'px',
    		// 'top': '50%',
    		// 'margin-top': -h + 'px'
    	}
    );



	};


		// $('#Title').fadeIn(5000);
		// $('.Intro').animate({
		// 			margin: '0 0 0 690px'
		// 		}, 900);



	$(document).ready(plus);
	$(window).resize(plus);

	document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); 
}, {passive: false});



	$("#wechat").click(function(){
  $(".wechat_detail").fadeToggle();
  $(".dy_detail").fadeOut();
});

	$("#douyin").click(function(){
  $(".dy_detail").fadeToggle();
  $(".wechat_detail").fadeOut();
});
	
	$("#info").click(function(){
  $(".cast").fadeToggle();
});

	$(".close").click(function(){
  $(".cast").fadeToggle();
});




// 	$(".event").find('img').mouseover(function(){
//   	$(".event").find('img').css({'transform':'scale(3) translate(100px,100px)',});
// });

// 	$(".event").find('img').mouseout(function(){
//   	$(".event").find('img').css({'transform':'scale(1) translate(0px,0px)' ,});
// });

	// $('.last').slimScroll({height:'1000px'})


	$('#textAll').fullpage({
		scrollingSpeed:600,
		afterLoad: function(anchorLink, index){
            console.log(index);
		},

		onLeave: function(index, nextindex, direction){
			var e = $('.event').width()
			var windowWidth = $(window).width()
			var windowHeight = $(window).height()
			var bgWidth = $('.bgPic').width()
			var d = windowWidth/bgWidth
			var b = (bgWidth/2)*(d-1)

    var fuHeight = $('.full').height()
    var w = (windowHeight - fuHeight*d)/2
    // var q = 360 + w - ((360-88.5)*d)
    var q = windowHeight/2 - (360-48.5)*d
 //    console.log(d);
 //    console.log(windowHeight);
 //    console.log(fuHeight);
//     console.log(w);
 //    console.log(q);


			// console.log(direction);



			if(index == 1 && direction == "down" && isAndroid) {
                    $('#hunger').fadeOut(500);
				    $('#Intro').fadeOut(100);
                    $('#Title').fadeOut(100);
                    $('.full').delay(830).fadeIn(50);
                    $('.timeLine_M').toggleClass('timeLineChanged');
                    $('.Xline').fadeOut(100);
                    $('.Mouse').fadeOut(100);
        
                    $('.zipRec').toggleClass('zipRecChanged02');
                    $('.zipRec').css({
    		'top': "50%",
    		"width": 20 + "%",
    		"height":"0%",
    		"left":"40%",
    	}
   	);



			}
			if(index == 2 && direction == "up" && isAndroid){
                    $('#full').fadeOut(500);
                    $('#hunger').delay(830).fadeIn(50);
                    $('#Intro').fadeIn(500);
                    $('#Title').fadeIn(500);
                    $('.timeLine_M').toggleClass('timeLineChanged');
                    $('.Xline').fadeIn(500);
                    $('.Mouse').fadeIn(500);
                    $('.zipRec').toggleClass('zipRecChanged02');
                    $('#boxText').fadeOut(900);


			}

			if(index == 1 && direction == "down" && isiOS) {
					eatSprite.target.style.display = 'block';
                    eatSprite.play();
				    $('#Intro').fadeOut(100);
                    $('#Title').fadeOut(100);
					document.querySelector('.hunger').style.display = 'none';
                    $('.full').delay(830).fadeIn(50);
                    $('.timeLine_M').toggleClass('timeLineChanged');
                    $('.Xline').fadeOut(100);
                    $('.Mouse').fadeOut(100);
        
                    $('.zipRec').toggleClass('zipRecChanged02');
                    $('.zipRec').css({
    		'top': "50%",
    		"width": 20 + "%",
    		"height":"0%",
    		"left":"40%",
    	}
   	);



			}
			if(index == 2 && direction == "up" && isiOS){
					spitSprite.target.style.display = 'block';
                    spitSprite.play();
					document.querySelector('.full').style.display = 'none';
                    $('.hunger').delay(830).fadeIn(50);
                    $('#Intro').fadeIn(500);
                    $('#Title').fadeIn(500);
                    $('.timeLine_M').toggleClass('timeLineChanged');
                    $('.Xline').fadeIn(500);
                    $('.Mouse').fadeIn(500);
                    $('.zipRec').toggleClass('zipRecChanged02');
                    $('#boxText').fadeOut(900);

			}

			if(index == 2 && direction == "down"){


				$('#full').toggleClass('fullColorChanged');

				$('#M_movie1-1').toggleClass('M_moveTo-1');	
				$('#M_movie1-2').toggleClass('M_moveTo-2');
				$('#M_movie1-3').toggleClass('M_moveTo-3');

				$('#M_movie1-1').find('img').toggleClass('svgChanged');
				$('#M_movie1-2').find('img').toggleClass('svgChanged');
				$('#M_movie1-3').find('img').toggleClass('svgChanged');

				$('.M_M1-1').toggleClass('svgChanged');
				$('.M_M1-2').toggleClass('svgChanged');
				$('.M_M1-3').toggleClass('svgChanged');

				// $('#CGTNlogo2').toggleClass('svgChanged');

				$('.zipRec').toggleClass('zipRecChanged');
				$('#boxText').fadeIn(900);
				$('.zipRec').css({
    		'top':"0px",
    		"width": "100%",
    		"height":"100%",
    		"left":"0%",
    	}
   	);	

			}

			if(index == 3 && direction == "up"){

				$('#boxText').fadeOut(900);

				$('#full').toggleClass('fullColorChanged');

				$('#M_movie1-1').toggleClass('M_moveTo-1');	
				$('#M_movie1-2').toggleClass('M_moveTo-2');
				$('#M_movie1-3').toggleClass('M_moveTo-3');

				$('#M_movie1-1').find('img').toggleClass('svgChanged');
				$('#M_movie1-2').find('img').toggleClass('svgChanged');
				$('#M_movie1-3').find('img').toggleClass('svgChanged');

				$('.M_M1-1').toggleClass('svgChanged');
				$('.M_M1-2').toggleClass('svgChanged');
				$('.M_M1-3').toggleClass('svgChanged');

				// $('#CGTNlogo2').toggleClass('svgChanged');


				$('.zipRec').toggleClass('zipRecChanged');
                $('.zipRec').css({
    		'top': q + "px",
    		"width": 20  + "%",
    		"height":"0%",
    		"left":"40%",
    	}
   	);

				

			}
			if(index == 3 && direction == "down"){


				$('#M_movie1-1').toggleClass('M_moveTo-1');	
				$('#M_movie1-2').toggleClass('M_moveTo-2');
				$('#M_movie1-3').toggleClass('M_moveTo-3');

				$('#M_movie1-1').find('img').toggleClass('svgChanged');
				$('#M_movie1-2').find('img').toggleClass('svgChanged');
				$('#M_movie1-3').find('img').toggleClass('svgChanged');

				$('.M_M1-1').toggleClass('svgChanged');
				$('.M_M1-2').toggleClass('svgChanged');
				$('.M_M1-3').toggleClass('svgChanged');

				$('#full').toggleClass('turnGray');

				$('#screen2').toggleClass('screenShow');

				$('#funFacts1').toggleClass('screenShow');
				
				// $('.zipRec').toggleClass('zipRecChanged02');

				// $('#boxText').fadeOut(900);

				$('.legendSmall1_M').delay(500).fadeIn(900);

				$('.box01').toggleClass('box01Translate');
				$('.box01').fadeOut(500);


				
			}

			if(index == 4 && direction == "up"){
				// $('#boxText').fadeIn(900);
				// $('.zipRec').toggleClass('zipRecChanged02');

				$('#M_movie1-1').toggleClass('M_moveTo-1');	
				$('#M_movie1-2').toggleClass('M_moveTo-2');
				$('#M_movie1-3').toggleClass('M_moveTo-3');

				$('#M_movie1-1').find('img').toggleClass('svgChanged');
				$('#M_movie1-2').find('img').toggleClass('svgChanged');
				$('#M_movie1-3').find('img').toggleClass('svgChanged');

				$('.M_M1-1').toggleClass('svgChanged');
				$('.M_M1-2').toggleClass('svgChanged');
				$('.M_M1-3').toggleClass('svgChanged');


				$('#full').toggleClass('turnGray');

				$('#screen2').toggleClass('screenShow');

				$('#funFacts1').toggleClass('screenShow');

				$('.legendSmall1_M').fadeOut(900);
				$('.box01').fadeIn(500);
				$('.box01').toggleClass('box01Translate');
				

			}

			if(index == 4 && direction == "down"){

			}


			if(index == 5 && direction == "up"){
				

			}
			if(index == 5 && direction == "down"){

				$('#screen2').toggleClass('screenShow');

				$('#funFacts1').toggleClass('screenShow');


				$('#M_movie2-1').toggleClass('M_moveTo-1');
				$('#M_movie2-2').toggleClass('M_moveTo-2');
				$('#M_movie2-3').toggleClass('M_moveTo-3');

				$('.M_M2-1').toggleClass('M_svgChanged');
				$('.M_M2-2').toggleClass('M_svgChanged');
				$('.M_M2-3').toggleClass('M_svgChanged');

				$('.legendSmall1_M').fadeOut(900);

				$('.zipRec').css({
    		'display': "none",
    	}
   	);

				
			}

			if(index == 6 && direction == "up"){

				$('#screen2').toggleClass('screenShow');

				$('#funFacts1').toggleClass('screenShow');


				$('#M_movie2-1').toggleClass('M_moveTo-1');
				$('#M_movie2-2').toggleClass('M_moveTo-2');
				$('#M_movie2-3').toggleClass('M_moveTo-3');

				$('.M_M2-1').toggleClass('M_svgChanged');
				$('.M_M2-2').toggleClass('M_svgChanged');
				$('.M_M2-3').toggleClass('M_svgChanged');

				$('.legendSmall1_M').delay(500).fadeIn(900);

				$('.zipRec').css({
    		'display': "block",
    	}
   	);


			}

			if(index == 6 && direction == "down"){

				$('#screen3').toggleClass('screenShow');

				$('#funFacts2').toggleClass('screenShow');

				$('#M_movie2-1').toggleClass('M_moveTo-1');
				$('#M_movie2-2').toggleClass('M_moveTo-2');
				$('#M_movie2-3').toggleClass('M_moveTo-3');

				$('.M_M2-1').toggleClass('M_svgChanged');
				$('.M_M2-2').toggleClass('M_svgChanged');
				$('.M_M2-3').toggleClass('M_svgChanged');

				$('.legendSmall2_M').delay(500).fadeIn(900);

			}

			if(index == 7 && direction == "up"){

				$('#M_movie2-1').toggleClass('M_moveTo-1');
				$('#M_movie2-2').toggleClass('M_moveTo-2');
				$('#M_movie2-3').toggleClass('M_moveTo-3');

				$('.M_M2-1').toggleClass('M_svgChanged');
				$('.M_M2-2').toggleClass('M_svgChanged');
				$('.M_M2-3').toggleClass('M_svgChanged');

				$('#screen3').toggleClass('screenShow');

				$('#funFacts2').toggleClass('screenShow');

				$('.legendSmall2_M').fadeOut(900);


			}

			if(index == 7 && direction == "down"){

			}


			if(index == 8 && direction == "up"){



				
			}

			if(index == 8 && direction == "down"){

				$('#screen3').toggleClass('screenShow');

				$('#funFacts2').toggleClass('screenShow');


				$('#M_movie3-1').toggleClass('M_moveTo-1');	
				$('#M_movie3-2').toggleClass('M_moveTo-2');
				$('#M_movie3-3').toggleClass('M_moveTo-3');

				$('#M_movie3-1').find('img').toggleClass('svgChanged');
				$('#M_movie3-2').find('img').toggleClass('svgChanged');
				$('#M_movie3-3').find('img').toggleClass('svgChanged');

				$('.M_M3-1').toggleClass('svgChanged');
				$('.M_M3-2').toggleClass('svgChanged');
				$('.M_M3-3').toggleClass('svgChanged');

				$('.legendSmall2_M').fadeOut(900);





			}

			if(index == 9 && direction == "up"){
				$('#screen3').toggleClass('screenShow');

				$('#funFacts2').toggleClass('screenShow');

				$('#M_movie3-1').toggleClass('M_moveTo-1');	
				$('#M_movie3-2').toggleClass('M_moveTo-2');
				$('#M_movie3-3').toggleClass('M_moveTo-3');

				$('#M_movie3-1').find('img').toggleClass('svgChanged');
				$('#M_movie3-2').find('img').toggleClass('svgChanged');
				$('#M_movie3-3').find('img').toggleClass('svgChanged');

				$('.M_M3-1').toggleClass('svgChanged');
				$('.M_M3-2').toggleClass('svgChanged');
				$('.M_M3-3').toggleClass('svgChanged');

				$('.legendSmall2_M').delay(500).fadeIn(900);


				
				
			}

			if(index == 9 && direction == "down"){
				$('#M_movie3-1').toggleClass('M_moveTo-1');	
				$('#M_movie3-2').toggleClass('M_moveTo-2');
				$('#M_movie3-3').toggleClass('M_moveTo-3');

				$('#M_movie3-1').find('img').toggleClass('svgChanged');
				$('#M_movie3-2').find('img').toggleClass('svgChanged');
				$('#M_movie3-3').find('img').toggleClass('svgChanged');

				$('.M_M3-1').toggleClass('svgChanged');
				$('.M_M3-2').toggleClass('svgChanged');
				$('.M_M3-3').toggleClass('svgChanged');
				// $('.M3-3').toggleClass('svgChanged');



				$('#screen4').toggleClass('screenShow');

				$('#funFacts3').toggleClass('screenShow');

				$('.legendSmall3_M').delay(500).fadeIn(900);

				


			}

			if(index == 10 && direction == "up"){
				$('#M_movie3-1').toggleClass('M_moveTo-1');	
				$('#M_movie3-2').toggleClass('M_moveTo-2');
				$('#M_movie3-3').toggleClass('M_moveTo-3');

				$('#M_movie3-1').find('img').toggleClass('svgChanged');
				$('#M_movie3-2').find('img').toggleClass('svgChanged');
				$('#M_movie3-3').find('img').toggleClass('svgChanged');

				$('.M_M3-1').toggleClass('svgChanged');
				$('.M_M3-2').toggleClass('svgChanged');
				$('.M_M3-3').toggleClass('svgChanged');

				$('#screen4').toggleClass('screenShow');

				$('#funFacts3').toggleClass('screenShow');

				$('.legendSmall3_M').fadeOut(900);


			}

			if(index == 10 && direction == "down"){

			}

			if(index == 11 && direction == "up"){
				
				
			}

			if(index == 11 && direction == "down"){
				$('#screen4').toggleClass('screenShow');

				$('#funFacts3').toggleClass('screenShow');

				$('#M_movie4-1').toggleClass('M_moveTo-1');	
				$('#M_movie4-2').toggleClass('M_moveTo-2');
				$('#M_movie4-3').toggleClass('M_moveTo-3');

				$('#M_movie4-1').find('img').toggleClass('svgChanged');
				$('#M_movie4-2').find('img').toggleClass('svgChanged');
				$('#M_movie4-3').find('img').toggleClass('svgChanged');

				$('.M_M4-1').toggleClass('svgChanged');
				$('.M_M4-2').toggleClass('svgChanged');
				$('.M_M4-3').toggleClass('svgChanged');

				$('.legendSmall3_M').fadeOut(900);


			}

			if(index == 12 && direction == "up"){
				$('#screen4').toggleClass('screenShow');

				$('#funFacts3').toggleClass('screenShow');

				$('#M_movie4-1').toggleClass('M_moveTo-1');	
				$('#M_movie4-2').toggleClass('M_moveTo-2');
				$('#M_movie4-3').toggleClass('M_moveTo-3');

				$('#M_movie4-1').find('img').toggleClass('svgChanged');
				$('#M_movie4-2').find('img').toggleClass('svgChanged');
				$('#M_movie4-3').find('img').toggleClass('svgChanged');

				$('.M_M4-1').toggleClass('svgChanged');
				$('.M_M4-2').toggleClass('svgChanged');
				$('.M_M4-3').toggleClass('svgChanged');

				$('.legendSmall3_M').delay(500).fadeIn(900);

				
				
			}

			if(index == 12 && direction == "down"){

				$('#M_movie4-1').toggleClass('M_moveTo-1');	
				$('#M_movie4-2').toggleClass('M_moveTo-2');
				$('#M_movie4-3').toggleClass('M_moveTo-3');

				$('#M_movie4-1').find('img').toggleClass('svgChanged');
				$('#M_movie4-2').find('img').toggleClass('svgChanged');
				$('#M_movie4-3').find('img').toggleClass('svgChanged');

				$('.M_M4-1').toggleClass('svgChanged');
				$('.M_M4-2').toggleClass('svgChanged');
				$('.M_M4-3').toggleClass('svgChanged');
				
				$('#screen5').toggleClass('screenShow');

				$('#funFacts4').toggleClass('screenShow');

				$('.legendSmall4_M').delay(500).fadeIn(900);


			}

			if(index == 13 && direction == "up"){

				$('#M_movie4-1').toggleClass('M_moveTo-1');	
				$('#M_movie4-2').toggleClass('M_moveTo-2');
				$('#M_movie4-3').toggleClass('M_moveTo-3');

				$('#M_movie4-1').find('img').toggleClass('svgChanged');
				$('#M_movie4-2').find('img').toggleClass('svgChanged');
				$('#M_movie4-3').find('img').toggleClass('svgChanged');

				$('.M_M4-1').toggleClass('svgChanged');
				$('.M_M4-2').toggleClass('svgChanged');
				$('.M_M4-3').toggleClass('svgChanged');

				$('#screen5').toggleClass('screenShow');

				$('#funFacts4').toggleClass('screenShow');

				$('.legendSmall4_M').fadeOut(900);
				

			}

			if(index == 13 && direction == "down"){

			}

			if(index == 14 && direction == "up"){

				
			}

			if(index == 14 && direction == "down"){
				$('#screen5').toggleClass('screenShow');

				$('#funFacts4').toggleClass('screenShow');

				$('#full').toggleClass('fullColorChanged');

				$('#screen3').toggleClass('screenShow');
				$('#screen4').toggleClass('screenShow');
				$('#screen5').toggleClass('screenShow');

				$('.legendSmall4_M').fadeOut(900);

				

			}

			if(index == 15 && direction == "up"){
				$('#screen5').toggleClass('screenShow');

				$('#funFacts4').toggleClass('screenShow');

				$('#full').toggleClass('fullColorChanged');

				$('#screen3').toggleClass('screenShow');
				$('#screen4').toggleClass('screenShow');
				$('#screen5').toggleClass('screenShow');

				$('.legendSmall4_M').delay(500).fadeIn(900);
	
			}

			if(index ==17 && direction == "down"){
				// $('.logo').css({'display':'none',})
				$('.last').fadeIn(900);
				$(".last").slimScroll({
            height: '100vh',
            scrollTo:'0px',
        });

			}

			if(index == 18 && direction == "up"){
				// $('.logo').css({'display':'block',})
				$('.last').fadeOut(900);
				$(".last").slimScroll({
            height: '100vh'
        });

			}

			if(index ==18 && direction == "down"){
			

			}


		}
	});

    };

//安卓的JS…………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………


//PC端的JS……………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………
    function isPC(){

	
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




	function plus(d,b,h,q) {

    var windowWidth = $(window).width()
    var windowHeight = $(window).height()
    var bgWidth = $('.bgPic').width()
    var bgHeight = $('.bgPic').height()
    
    var d = windowWidth/bgWidth
    var b = (bgWidth/2)*(d-1)
    var h = $('.hunger').height()/2 * windowWidth/bgWidth
    

    $('.event001').find('p').css("font-size",function(i,curr){
    if (windowWidth > 1500) {
    		return Math.sqrt(d)*1 + 'rem';

    		}
    if (windowWidth <= 1500) {
    		return 0.9 + 'rem';

    		}
	});

    $('.mNote').find('p').css("font-size",function(i,curr){
    if (windowWidth > 1500) {
    		return 0.3*d + 'rem';

    		}
    if (windowWidth <= 1500) {
    		return 0.7*d + 'rem';
    		}
	});

    $('.event001').find('p').css("line-height",function(i,curr){
    if (windowWidth > 1400) {
    		return Math.sqrt(d)*1.4 + 'rem';

    		}
    if (windowWidth <= 1400) {
    		return 1.2 + 'rem';

    		}
	});


    $('.event').find('p').css("font-size",function(i,curr){
    if (windowWidth > 1400) {
    		return Math.sqrt(d)*1 + 'rem';

    		}
    if (windowWidth <= 1400) {
    		return 0.9 + 'rem';

    		}
	});



    $('.event').find('p').css("line-height",function(i,curr){
    if (windowWidth > 1400) {
    		return Math.sqrt(d)*1.4 + 'rem';

    		}
        if (windowWidth <= 1400) {
    		return 1.2 + 'rem';

    		}
	});

	// console.log(d*100 + '%')



    	$('.hunger').css({
    		// 'transform':'scale(' + d + ')',
    		// 'left': b + 'px',
    		// 'top': '50%',
    		// 'margin-top': -h + 'px',
    		// 'z-index':"0"
    	}
   	);
    	$('.full').css({
    		// 'transform':'scale(' + d + ')',
    		// 'left': b + 'px',
    		// 'top': '50%',
    		// 'margin-top': -h + 'px'
    	}
    );
    	$('.bgPic').css({
    		'transform':'scale(' + d + ')'
    	}
    );
    	$('.bgPic').css("left",function(i,curr){
    		if (windowWidth < 1280) {
    			return b + 'px';
    		}	
	});

    	$('.surface').css({
    		// 'transform':'scale(' + d + ')',
    		// 'left': b + 'px',
    		// 'top': '50%',
    		// 'margin-top': -h + 'px'
    	}
    );



	};


		// $('#Title').fadeIn(5000);
		// $('.Intro').animate({
		// 			margin: '0 0 0 690px'
		// 		}, 900);



	$(document).ready(plus);
	$(window).resize(plus);


	$("#wechat").click(function(){
  $(".wechat_detail").fadeToggle();
  $(".dy_detail").fadeOut();
});

	$("#douyin").click(function(){
  $(".dy_detail").fadeToggle();
  $(".wechat_detail").fadeOut();
});
	
	$("#info").click(function(){
  $(".cast").fadeToggle();
});

	$(".close").click(function(){
  $(".cast").fadeToggle();
});



	$("#small01").click(function(){
  $("#zoom01").fadeToggle();
});

	$("#small02").click(function(){
  $("#zoom02").fadeToggle();
});

	$("#small03").click(function(){
  $("#zoom03").fadeToggle();
});

	$("#zoom01").click(function(){
  $("#zoom01").fadeToggle();
});

	$("#zoom02").click(function(){
  $("#zoom02").fadeToggle();
});
	$("#zoom03").click(function(){
  $("#zoom03").fadeToggle();
});
// 	$(".event").find('img').mouseover(function(){
//   	$(".event").find('img').css({'transform':'scale(3) translate(100px,100px)',});
// });

// 	$(".event").find('img').mouseout(function(){
//   	$(".event").find('img').css({'transform':'scale(1) translate(0px,0px)' ,});
// });


	$('#textAll').fullpage({
		onLeave: function(index, nextindex, direction){
			var e = $('.event').width()
			var windowWidth = $(window).width()
			var windowHeight = $(window).height()
			var bgWidth = $('.bgPic').width()
			var d = windowWidth/bgWidth
			var b = (bgWidth/2)*(d-1)

    var fuHeight = $('.full').height()
    var w = (windowHeight - fuHeight*d)/2
    // var q = 360 + w - ((360-88.5)*d)
    var q = windowHeight/2 - (360-48.5)*d
 //    console.log(d);
 //    console.log(windowHeight);
 //    console.log(fuHeight);
	// console.log(w);
 //    console.log(q);


			// console.log(direction);
			if(index == 1 && direction == "down") {
				    $('#Intro').fadeOut(100);
                    $('#Title').fadeOut(100);
					document.querySelector('.hunger').style.display = 'none';
                    eatSprite.target.style.display = 'block';
                    eatSprite.play();
                    $('.full').delay(830).fadeIn(50);
                    $('.timeLine').toggleClass('timeLineChanged');
                    $('.Xline').fadeOut(100);
                    $('.Mouse').fadeOut(100);
        
                    $('.zipRec').toggleClass('zipRecChanged02');
                    $('.zipRec').css({
    		'top': q + "px",
    		"width": 20 + "%",
    		"height":d + "%",
    	}
   	);				




			}
			if(index == 2 && direction == "up"){
					document.querySelector('.full').style.display = 'none';
                    // document.querySelector('.hunger').style.display = 'none';
                    spitSprite.target.style.display = 'block';
                    spitSprite.play();
                    $('.hunger').delay(830).fadeIn(50);
                    $('#Intro').fadeIn(500);
                    $('#Title').fadeIn(500);
                    $('.timeLine').toggleClass('timeLineChanged');
                    $('.Xline').fadeIn(500);
                    $('.Mouse').fadeIn(500);
                    $('.zipRec').toggleClass('zipRecChanged02');
                    $('#text001').fadeOut(900);




			}

			if(index == 2 && direction == "down"){
				$('#surface-1').animate({
					left: "9%"
				}, 900);

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

				$('#CGTNlogo2').toggleClass('svgChanged');

				$('.zipRec').toggleClass('zipRecChanged');
				$('#text001').fadeIn(900);
				$('.zipRec').css({
    		'top':"0px",
    		"width": "100%",
    		"height":"100%",
    	}
   	);			


			}

			if(index == 3 && direction == "up"){
				$('#surface-1').animate({
					left:"0%"
				}, 900);

				$('#text001').fadeOut(900);

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
				$('#CGTNlogo2').toggleClass('svgChanged');


				$('.zipRec').toggleClass('zipRecChanged');
                $('.zipRec').css({
    		'top': q + "px",
    		"width": 20  + "%",
    		"height":d + "%",
    	}
   	);			


				

			}
			if(index == 3 && direction == "down"){



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

				$('#funFacts1').toggleClass('screenShow');
				
				$('.zipRec').toggleClass('zipRecChanged02');

				$('#text001').fadeOut(900);

				$('.legendSmall1').fadeIn(900);


				
			}

			if(index == 4 && direction == "up"){

				$('#text001').fadeIn(900);
				$('.zipRec').toggleClass('zipRecChanged02');
				// $('.zipRec').toggleClass('zipRecChanged');

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

				$('#funFacts1').toggleClass('screenShow');

				$('.legendSmall1').fadeOut(900);
				
				

			}
			if(index == 4 && direction == "down"){

				$('#screen2').toggleClass('screenShow');

				$('#funFacts1').toggleClass('screenShow');


				$('#movie2-1').toggleClass('moveTo-1');
				$('#movie2-2').toggleClass('moveTo-2');
				$('#movie2-3').toggleClass('moveTo-3');

				$('.M2-1').toggleClass('svgChanged');
				$('.M2-2').toggleClass('svgChanged');
				$('.M2-3').toggleClass('svgChanged');

				$('.zipRec').css({
    		'display': "none",
    	}
   	);
				$('.legendSmall1').fadeOut(900);
				
			}

			if(index == 5 && direction == "up"){

				$('#screen2').toggleClass('screenShow');

				$('#funFacts1').toggleClass('screenShow');


				$('#movie2-1').toggleClass('moveTo-1');
				$('#movie2-2').toggleClass('moveTo-2');
				$('#movie2-3').toggleClass('moveTo-3');

				$('.M2-1').toggleClass('svgChanged');
				$('.M2-2').toggleClass('svgChanged');
				$('.M2-3').toggleClass('svgChanged');

				$('.zipRec').css({
    		'display': "block",
    	}
   	);
				$('.legendSmall1').fadeIn(900);

			}

			if(index == 5 && direction == "down"){

				$('#screen3').toggleClass('screenShow');

				$('#funFacts2').toggleClass('screenShow');

				$('#movie2-1').toggleClass('moveTo-1');
				$('#movie2-2').toggleClass('moveTo-2');
				$('#movie2-3').toggleClass('moveTo-3');

				$('.M2-1').toggleClass('svgChanged');
				$('.M2-2').toggleClass('svgChanged');
				$('.M2-3').toggleClass('svgChanged');

				$('.legendSmall2').fadeIn(900);

			}

			if(index == 6 && direction == "up"){


				$('#screen3').toggleClass('screenShow');

				$('#funFacts2').toggleClass('screenShow');

				$('#movie2-1').toggleClass('moveTo-1');
				$('#movie2-2').toggleClass('moveTo-2');
				$('#movie2-3').toggleClass('moveTo-3');

				$('.M2-1').toggleClass('svgChanged');
				$('.M2-2').toggleClass('svgChanged');
				$('.M2-3').toggleClass('svgChanged');
				
				$('.legendSmall2').fadeOut(900);

				
			}

			if(index == 6 && direction == "down"){

				$('#screen3').toggleClass('screenShow');

				$('#funFacts2').toggleClass('screenShow');


				$('#movie3-1').toggleClass('moveTo-1');
				$('#movie3-2').toggleClass('moveTo-2');
				$('#movie3-3').toggleClass('moveTo-3');

				$('#movie3-1').find('img').toggleClass('svgChanged');
				$('#movie3-2').find('img').toggleClass('svgChanged');
				$('#movie3-3').find('img').toggleClass('svgChanged');

				$('.M3-1').toggleClass('svgChanged');
				$('.M3-2').toggleClass('svgChanged');
				$('.M3-3').toggleClass('svgChanged');

				$('.mNote').slideToggle();

				$('.legendSmall2').fadeOut(900);



			}

			if(index == 7 && direction == "up"){
				$('#screen3').toggleClass('screenShow');

				$('#funFacts2').toggleClass('screenShow');

				$('#movie3-1').toggleClass('moveTo-1');
				$('#movie3-2').toggleClass('moveTo-2');
				$('#movie3-3').toggleClass('moveTo-3');

				$('#movie3-1').find('img').toggleClass('svgChanged');
				$('#movie3-2').find('img').toggleClass('svgChanged');
				$('#movie3-3').find('img').toggleClass('svgChanged');

				$('.M3-1').toggleClass('svgChanged');
				$('.M3-2').toggleClass('svgChanged');
				$('.M3-3').toggleClass('svgChanged');

				$('.mNote').slideToggle();

				$('.legendSmall2').fadeIn(900);
				
				
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

				$('.mNote').slideToggle();

				$('#screen4').toggleClass('screenShow');

				$('#funFacts3').toggleClass('screenShow');

				$('.legendSmall3').fadeIn(900);

				


			}

			if(index == 8 && direction == "up"){
				$('#screen4').toggleClass('screenShow');

				$('#funFacts3').toggleClass('screenShow');

				$('#movie3-1').toggleClass('moveTo-1');
				$('#movie3-2').toggleClass('moveTo-2');
				$('#movie3-3').toggleClass('moveTo-3');

				$('#movie3-1').find('img').toggleClass('svgChanged');
				$('#movie3-2').find('img').toggleClass('svgChanged');
				$('#movie3-3').find('img').toggleClass('svgChanged');
				
				$('.M3-1').toggleClass('svgChanged');
				$('.M3-2').toggleClass('svgChanged');
				$('.M3-3').toggleClass('svgChanged');

				$('.mNote').slideToggle();

				$('.legendSmall3').fadeOut(900);
				
				
			}

			if(index == 8 && direction == "down"){
				$('#screen4').toggleClass('screenShow');

				$('#funFacts3').toggleClass('screenShow');

				$('#movie4-1').toggleClass('moveTo-1');
				$('#movie4-2').toggleClass('moveTo-2');
				$('#movie4-3').toggleClass('moveTo-3');

				$('#movie4-1').find('img').toggleClass('svgChanged');
				$('#movie4-2').find('img').toggleClass('svgChanged');
				$('#movie4-3').find('img').toggleClass('svgChanged');

				$('.M4-1').toggleClass('svgChanged');
				$('.M4-2').toggleClass('svgChanged');
				$('.M4-3').toggleClass('svgChanged');

				$('.legendSmall3').fadeOut(900);


			}

			if(index == 9 && direction == "up"){
				$('#screen4').toggleClass('screenShow');

				$('#funFacts3').toggleClass('screenShow');

				$('#movie4-1').toggleClass('moveTo-1');
				$('#movie4-2').toggleClass('moveTo-2');
				$('#movie4-3').toggleClass('moveTo-3');

				$('#movie4-1').find('img').toggleClass('svgChanged');
				$('#movie4-2').find('img').toggleClass('svgChanged');
				$('#movie4-3').find('img').toggleClass('svgChanged');

				$('.M4-1').toggleClass('svgChanged');
				$('.M4-2').toggleClass('svgChanged');
				$('.M4-3').toggleClass('svgChanged');

				$('.legendSmall3').fadeIn(900);

				
				
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

				$('#funFacts4').toggleClass('screenShow');

				$('.legendSmall4').fadeIn(900);


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

				$('#funFacts4').toggleClass('screenShow');

				$('.legendSmall4').fadeOut(900);
				
				
			}

			if(index == 10 && direction == "down"){
				$('#screen5').toggleClass('screenShow');

				$('#funFacts4').toggleClass('screenShow');
				// $('#surface-1').animate({
				// 	left: "0%"
				// }, 900);

				$('#full').toggleClass('fullColorChanged');

				$('#screen3').toggleClass('screenShow');
				$('#screen4').toggleClass('screenShow');
				$('#screen5').toggleClass('screenShow');

				$('.LG').fadeIn(900);

				$('.legendSmall4').fadeOut(900);

				

			}

			if(index == 11 && direction == "up"){
				$('#screen5').toggleClass('screenShow');

				$('#funFacts4').toggleClass('screenShow');
				// $('#surface-1').animate({
				// 	left: "9%"
				// }, 900);
				$('#full').toggleClass('fullColorChanged');

				$('#screen3').toggleClass('screenShow');
				$('#screen4').toggleClass('screenShow');
				$('#screen5').toggleClass('screenShow');
				$('.LG').fadeOut(900);

				$('.legendSmall4').fadeIn(900);
			}

			if(index ==11 && direction == "down"){
				


			}


		}
	});
    };
    
});