//vars for processing data.
var fypsData;
var data;
var fyps = [];
var fypNum = 8;

//all sections.
var keywords = ["Task", "Manufacturing", "Agriculture", "Defence", "Environment", "Tech", "Trade", "Health", "Democracy"];
var isKeywords = {};

//vars for window layouts.
var windowW;
var ww, wh;
var canvasWidth, canvasHeight, upperHeight, bottomHeight, fypHeadHeight;
var canvas;
var hoverWidth; //hover text bound width.

//vars for container layouts.
var outerPadding, innerPadding;
var margins;
var fypDivWidth;

var couterPadding;
var cinnerPadding;
var cfypDiv = [];
var cfypDivWidth;

//screen responsive.
// 992, 1200, 1366, 1600, 1920
var scaleSize = 12.5;
var scaleTextArr = [0.025,0.036, 0.044, 0.05, 0.055, 0.066];
var widthTextArr = ["4500%","2700%", "2300%", "2000%", "1800%", "1515%"];
var scaleText, scaleWidthText;
var scaleTitleArr = [0.05,0.06, 0.066, 0.072, 0.08, 0.1];
var widthTitleArr = ["2250%","1700%", "1500%", "1400%", "1250%", "1000%"];
var scaleTitle, scaleWidthTitle;
var scaleSizeArr = [22.5,17, 15, 14, 12.5, 10];

//trigger event.
//vars for trigger event.
var cardNum = 30;
var element_in_view = [];
var screen_height;
var scrollPage_off_screen = false;
//scrolling setting.
var pageable = new Pageable("#scroll-page", {
  childSelector: "[data-anchor]",
  anchors: [],
  animation: 1400,
  pips: false,
  // throttle: 50,
  orientation: 50,
  freeScroll: false,
  navPrevEl: false,
  navNextEl: false,
  infinite: false,
  // onScroll: scrolling,
  onStart: update,
  onFinish: showArrow,
  events: {
    mouse: false
  }
});

var first_reach_element;
var cover_in_view;

$(document).ready(function() {
//调整标题词间距
            function resetWord() {
                if ((navigator.userAgent.match(/(iphone|ios)/i))) {

                    $(".cover-title-M").addClass("wordSpacing");

                }
            }

            resetWord();


  //vars for window layouts.
  windowW = $(window).width();

  if (windowW > 1920) {
    $("#container").width(1920);
  } else {
    $("#container").width(windowW);
  }


  ww = $("#container").width(); //window width.
  wh = $(window).height(); //window height.
  screen_height = wh;
  $("#menu").width(ww);


  canvasWidth = ww;
  upperHeight = $("#upper").height();
  fypHeadHeight = $("#fyp-head").height();
  canvasHeight = wh - upperHeight - fypHeadHeight;
  hoverWidth = ww * 0.25;

  outerPadding = (ww / 50 > 5) ? ww / 50 : 5;
  innerPadding = (ww / 35 > 15) ? ww / 35 : 15;
  // innerPadding = 15;
  margins = {
    left: outerPadding,
    top: 0,
    bottom: 0,
    right: outerPadding
  }
  fypDivWidth = (canvasWidth - margins.left - margins.right - innerPadding * 7) / fypNum;


  couterPadding = 0;
  cinnerPadding = 0;
  cfypDivWidth = (windowW - couterPadding - couterPadding - cinnerPadding * 7) / fypNum;


  $("#progress-container").css({
    "width": (ww - 2 * outerPadding) + "px"
  });


  $("#menu").height(upperHeight);

  if (windowW > 1920) {
    scaleSize = scaleSizeArr[5];
    scaleText = scaleTextArr[5];
    scaleWidthText = widthTextArr[5];
    scaleTitle = scaleTitleArr[5];
    scaleWidthTitle = widthTitleArr[5];

  } else if (windowW < 1920 && windowW > 1600) {
    scaleSize = scaleSizeArr[4];
    scaleText = scaleTextArr[4];
    scaleWidthText = widthTextArr[4];
    scaleTitle = scaleTitleArr[4];
    scaleWidthTitle = widthTitleArr[4];

  } else if (windowW < 1600 && windowW > 1366) {
    scaleSize = scaleSizeArr[3];
    scaleText = scaleTextArr[3];
    scaleWidthText = widthTextArr[3];
    scaleTitle = scaleTitleArr[3];
    scaleWidthTitle = widthTitleArr[3];

  } else if (windowW < 1366 && windowW > 1200) {
    scaleSize = scaleSizeArr[2];
    scaleText = scaleTextArr[2];
    scaleWidthText = widthTextArr[2];
    scaleTitle = scaleTitleArr[2];
    scaleWidthTitle = widthTitleArr[2];

  } else if (windowW < 1200 && windowW > 992) {

    scaleSize = scaleSizeArr[1];
    scaleText = scaleTextArr[1];
    scaleWidthText = widthTextArr[1];
    scaleTitle = scaleTitleArr[1];
    scaleWidthTitle = widthTitleArr[1];

  } else if (windowW < 992) {
    scaleSize = scaleSizeArr[0];
    scaleText = scaleTextArr[0];
    scaleWidthText = widthTextArr[0];
    scaleTitle = scaleTitleArr[0];
    scaleWidthTitle = widthTitleArr[0];
  }
  //source & share.


  $("#wechat").click(function() {
    $(".wechat_detail").fadeToggle();
  });

});


//cover animation setting.
var cover = true;
var words = [];
var wordsData, rawWords;
var initialNum = 100;


//fyp divs.
var fypDiv = [];
//vars for nodes calculation.
var connectedArray = [];
var nodes = {};
var currentM;

//connecting animation.
var g = 2.5;
var m = 50;

//cover related.
var showCover = true;
var loading = true;

//color settings.
var manufactureLineDark;
var manufactureLine;
var agricultureLineDark;
var agricultureLine;
var taskLineDark;
var taskLine;
var othersLineDark;
var othersLine;

var isResize = false;
var showAllTextsCtr = true;
var agricultureTop;

//resize layouts.
$(window).resize(function() {
  wh = $(window).height();
  canvasHeight = wh - upperHeight - fypHeadHeight;
  upperHeight = $("#upper").height();
  fypHeadHeight = $("#fyp-head").height();
  canvasHeight = wh - upperHeight - fypHeadHeight;

  //set the fyp-head layouts.
  $(".fyp-head-div").height(fypHeadHeight);
  $(".fypDiv").height(canvasHeight);

  $("#menu").height(upperHeight);


  for (var i = 0; i < keywords.length; i++) {

    if (keywords[i] == "Task") {
      var tsx1 = $("#sectionContentDiv11").offset().left - 35;
      var tsy1 = $("#sectionContentDiv11").offset().top + 5;
      $("#task-star1").css({
        top: tsy1,
        left: tsx1
      });
    }

    if (keywords[i] == "Manufacturing") {
      var mx1 = $("#chapterContentDiv031").offset().left + 5;
      var my1 = $("#chapterContentDiv031").offset().top + 15;
      var mx2 = $("#chapterContentDiv752").offset().left + 5;
      var my2 = $("#chapterContentDiv752").offset().top - 15;
      $("#manufacturing-star1").css({
        top: my1,
        left: mx1
      });
      $("#manufacturing-star2").css({
        top: my2,
        left: mx2
      });
    }

    if (keywords[i] == "Agriculture") {
      var ax1 = $("#chapterContentDiv511").offset().left + 5;
      var ay1 = $("#chapterContentDiv512").offset().top - 10;
      $("#agriculture-star1").css({
        top: ay1,
        left: ax1
      });
    }

    if (keywords[i] == "Health") {
      var hx1 = $("#chapterContentDiv593").offset().left - 35;
      var hy1 = $("#chapterContentDiv593").offset().top + 5;
      var hx2 = $("#sectionContentDiv714").offset().left - 35;
      var hy2 = $("#sectionContentDiv714").offset().top + 5;

      $("#health-star1").css({
        top: hy1,
        left: hx1
      });
      $("#health-star2").css({
        top: hy2,
        left: hx2
      });
    }

    if (keywords[i] == "Democracy") {
      var dmx1 = $("#sectionContentDiv48").offset().left - 35;
      var dmy1 = $("#sectionContentDiv48").offset().top + 5;
      var dmx2 = $("#sectionContentDiv511").offset().left - 35;
      var dmy2 = $("#sectionContentDiv511").offset().top + 5;
      $("#democracy-star1").css({
        top: dmy1,
        left: dmx1
      });
      $("#democracy-star2").css({
        top: dmy2,
        left: dmx2
      });
    }

    if (keywords[i] == "Tech") {
      //R&D cards.
      var rdx1 = $("#chapterContentDiv083").offset().left + 5;
      var rdy1 = $("#chapterContentDiv083").offset().top + 25;
      var rdx2 = $("#chapterContentDiv432").offset().left + 5;
      var rdy2 = $("#chapterContentDiv432").offset().top - 10;
      var rdx3 = $("#chapterContentDiv722").offset().left + 5;
      var rdy3 = $("#chapterContentDiv722").offset().top - 10;
      $("#rd-star1").css({
        top: rdy1,
        left: rdx1
      });
      $("#rd-star2").css({
        top: rdy2,
        left: rdx2
      });
      $("#rd-star3").css({
        top: rdy3,
        left: rdx3
      });
    }

    if (keywords[i] == "Environment") {
      var ex1 = $("#chapterContentDiv661").offset().left + 10;
      var ey1 = $("#chapterContentDiv662").offset().top - 8;
      $("#rd-star1").css({
        top: ey1,
        left: ex1
      });
    }

    if (keywords[i] == "Trade") {
      //trade star divs.
      var tx1 = $("#chapterContentDiv062").offset().left + 5;
      var ty1 = $("#chapterContentDiv062").offset().top + 5;
      var tx2 = $("#chapterContentDiv162").offset().left + 10;
      var ty2 = $("#chapterContentDiv162").offset().top - 5;
      var tx3 = $("#chapterContentDiv452").offset().left + 5;
      var ty3 = $("#chapterContentDiv452").offset().top + 25;
      $("#trade-star1").css({
        top: ty1,
        left: tx1
      });
      $("#trade-star2").css({
        top: ty2,
        left: tx2
      });
      $("#trade-star3").css({
        top: ty3,
        left: tx3
      });
    }

    if (keywords[i] == "Defence") {
      var dx1 = $("#chapterContentDiv114").offset().left + 5;
      var dy1 = $("#chapterContentDiv114").offset().top + 5;
      var dx2 = $("#chapterContentDiv6152").offset().left + 10;
      var dy2 = $("#chapterContentDiv6152").offset().top + 40;
      $("#defence-star1").css({
        top: dy1,
        left: dx1
      });
      $("#defence-star2").css({
        top: dy2,
        left: dx2
      });
    }
  }


  //resize cover fyps card.
  var cww = $(window).width();
  cfypDivWidth = (cww - couterPadding - couterPadding - cinnerPadding * 7) / fypNum;
  for (var i = 0; i < fypNum; i++) {
    var cthisPositionX = couterPadding + i * cinnerPadding + i * cfypDivWidth;
    cfypDiv[i].position(cthisPositionX, 0);
    cfypDiv[i].style("width", cfypDivWidth + "px");
    cfypDiv[i].style("position", "fixed");
    var cfypDivHeight = wh - margins.top;
    cfypDiv[i].style("height", cfypDivHeight + "px");
  }

})

//resize the canvas.
function windowResized() {
  resizeCanvas(canvasWidth, canvasHeight);
}

function preload() {
  fypsData = loadJSON("data/fyps-0226.json", jsonLoaded);
  wordsData = loadJSON("data/cover.json");
}

function jsonLoaded() {

  setTimeout(function() {
    loading = false;
  }, 1000);
}

function setup() {
  data = fypsData.fyps;
  //console.log(data);
  processingData();
  //console.log(fyps);

  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.id("mycanvas").parent("theCanvas").style("position", "fixed");
  createDiv().id("fypWrapper").parent("theCanvas").style("position", "fixed");
  $("#fypWrapper").width(ww);
  $("#fypWrapper").height(canvasHeight);

  //set the fyp-head layouts.
  for (var i = 0; i < fypNum; i++) {
    var thisPositionX = outerPadding + i * innerPadding + i * fypDivWidth;
    createDiv().id("fypHead" + i).class("fyp-head-div")
      .position(thisPositionX, 0)
      .parent("fyp-head").style("height", fypHeadHeight + "px").style("width", fypDivWidth + "px");
    select("#head-content" + i).parent("fypHead" + i);
  }

  //create fyp divs.
  for (var i = 0; i < fypNum; i++) {
    fypDiv[i] = createDiv().id("fypDiv" + i).class("fypDiv").parent("fypWrapper").style("z-index", "-1").style("position", "relative");
    var thisPositionX = outerPadding + i * innerPadding + i * fypDivWidth;
    fypDiv[i].position(thisPositionX, 0);
    fypDiv[i].style("width", fypDivWidth + "px");
    var fypDivHeight = canvasHeight - margins.top;
    fypDiv[i].style("height", fypDivHeight + "px");
  }


  //create divs for fyps content.
  for (var i = 0; i < fyps.length; i++) {
    //create the div for table of content.
    createDiv().id("fypContentDiv" + i).class("fyp-content").parent("fypDiv" + i);

    for (var j = 0; j < fyps[i].sections.length; j++) {
      //put the section titles on each cards,
      createDiv("<p class = 'section-title'><span class = 'section-title-bg'><span class = 'add-bg'>" + fyps[i].sections[j].no + " " + fyps[i].sections[j].title + "</span></span></p>").id("sectionContentDiv" + i + j).parent("fypContentDiv" + i);
      if (fyps[i].sections[j].text != null) {
        createDiv(fyps[i].sections[j].text).class("section-content").parent("sectionContentDiv" + i + j);
      }

      for (var v = 0; v < fyps[i].sections[j].chapters.length; v++) {
        if (fyps[i].sections[j].chapters[v].no != null) {
          //then put the chapter titles under the section titles repectively.
          createDiv("<p class = 'chapter-title'><span class = 'chapter-title-bg'><span class = 'add-bg'>" + fyps[i].sections[j].chapters[v].no + " " + fyps[i].sections[j].chapters[v].title + "</span></span></p>").id("chapterContentDiv" + i + j + v).parent("sectionContentDiv" + i + j);
          //then put the chapter texts under the chapter titles respectively and hide them all.
          createDiv(fyps[i].sections[j].chapters[v].text).class("text-content").parent("chapterContentDiv" + i + j + v);
        }
      }
    }
  }
  //hide all section and chapter titles.
  shiftMode("titles", "quick");

  //calculate nodes.
  for (var i = 0; i < keywords.length; i++) {
    connectedNodes(keywords[i]);
  }
  modifyNodes();
  //console.log(nodes);

  //create empty curretM array.
  currentM = new Array(13).fill(0);
  first_reach_element = new Array(30).fill(true);


  //initial all elments.
  shiftMode("texts", "quick");
  $("#container, #upper").hide(); //hide all divs.
  $("#menu").hide();
  $("#guide-to-PC").hide();
  $(".hover-text").hide();
  $(".hover-text-bottom").hide();
  $(".fypDiv").hide();
  $("#upper").css({
    "background": "rgb(245, 244, 240)"
  });

  setCoverDiv();
  //skip to explore page.
  $("#toExplore").click(function() {
    //emptyNodes();
    element_in_view.fill(false);
    cover_in_view = false;
    hideAllTexts();
    scrollPage_off_screen = true;
    cover = false;
    $("#cover-bg").hide(); //hide background.
    $("#container, #upper").show(); //show canvas.
    $("#progress-container").hide();
    $("#styled-bars").hide();
    $("#scroll-page").hide();
    $("#menu").show();
    $(".fyp-content").css({
      // "color": "rgb(180, 180, 180)"
      "color": "rgba(153, 149, 132, 0.6)"
    });
    isResize = false;
    shiftMode("texts", "slow");
  });

  //explore buttons.
  for (var i = 0; i < keywords.length; i++) {
    isKeywords[keywords[i]] = false;
  }
  $("#Task").click(toTask);
  $("#Manufacturing").click(toManufacturing);
  $("#Agriculture").click(toAgriculture);
  $("#Defence").click(toDefence);
  $("#Environment").click(toEnvironment);
  $("#Tech").click(toTech);
  $("#Trade").click(toTrade);
  // $("#Reform").click(toReform);
  $("#Health").click(toHealth);
  $("#Democracy").click(toDemocracy);
  $("#menu .button").click(function() {

    $(this).addClass("button-focus").parent(".button-border").siblings().children(".button").removeClass("button-focus");
    $(this).parent(".button-border").addClass("button-selected").siblings().removeClass("button-selected");

  });

  //color code.
  manufactureLineDark = color(53, 67, 54, 250);
  manufactureLine = color(111, 127, 111, 200);
  agricultureLineDark = color(246, 208, 46, 250);
  agricultureLine = color(217, 179, 97, 200);
  taskLineDark = color(146, 9, 3, 250);
  taskLine = color(181, 58, 48, 200);
  othersLineDark = color(146, 9, 3, 250);
  othersLine = color(181, 58, 48, 200);

  //cover animation setting.
  rawWords = wordsData.words;

  for (var i = 0; i < initialNum; i++) {
    var newW = newWord(i);
    words.push(newW);
  }
  //console.log(words);
  for (var i = 0; i < words.length; i++) {
    words[i].create();
  }

}




$('#scroll-page').fullpage({
            scrollingSpeed: 600,
            afterLoad: function (anchorLink, index) {
                    console.log(index);
                },

                onLeave: function (index, nextindex, direction) {

                    

                    if (index == 2 && direction == "down") {

                                    first_reach_element[1] = false;
                                    first_reach_element[0] = true;
                                    hideAllTexts();
                                    cover = false;
                                    $("#cover-bg").hide();
                                    $("#container, #upper").show();
                                    $(".fyp-content").css({
                                      "color": "rgba(153, 149, 132, 0.6)"
                                    });
                                    shiftMode("texts", "slow"); // showing effect needs rethinking.
                                    $(".section-content, .text-content").show();
                    }

                    if (index == 3 && direction == "up") {
                                    first_reach_element[2] = true;
                                    cover = true;
                                    $("#cover-bg").show();
                                    $("#container, #upper").hide();
                                    $(".section-content, .text-content").hide();
                    }

                }
        });







function draw() {

  if (loading) {

  } else {
    $("#loading-page").hide();
    if (cover) {
      showAllTexts("quick");
      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (word.vanishing) {
          //  word.grow();
          word.show();
          word.lightness += 0.01;
          if (word.lightness > 97) {
            word.reLocate();
          }
        }
      }
    }

    clear();

    if (cover_in_view) {
      $("#cover-bg").show();
      cover = true;
      $("#container, #upper").hide();
      $(".fypDiv").hide();

    }

    if (element_in_view[0]) { // intro1 with cover bg.
      if (!first_reach_element[1]) { //upscrolled to intro.
        $("#cover-bg").show();
        cover = true;
        $("#container, #upper").hide();
        $(".fypDiv").hide();
        first_reach_element[1] = true;
      }
      //put the cover background code here.
    }

    if (element_in_view[1]) { // show all the fyp texts.
      if (!first_reach_element[2]) { //upscrolled to fyp texts.
        first_reach_element[2] = true;
        //do nothing
      }

      if (first_reach_element[1]) {
        first_reach_element[1] = false;
        first_reach_element[0] = true;
        hideAllTexts();
        cover = false;
        $("#cover-bg").hide();
        $("#container, #upper").show();
        $(".fyp-content").css({
          "color": "rgba(153, 149, 132, 0.6)"
        });
        shiftMode("texts", "slow"); // showing effect needs rethinking.
        $(".section-content, .text-content").show();
      }
    }

    if (element_in_view[2]) { // show all the fyp texts - blank
      if (!first_reach_element[3]) { //upscrolled to fyp texts.
        $(".task-highlight").removeClass("task-highlight-add");
        emptyNodes();
        first_reach_element[3] = true;
        $(".text-content, .section-content").removeClass("task-color");
        $(".fyp-content").css({
          "color": "rgba(153, 149, 132, 0.6)"
        });
        shiftMode("texts", "quick");
      }

      if (first_reach_element[2]) {
        first_reach_element[2] = false;
        first_reach_element[1] = true;
        //do nothing.
      }
    }

    if (element_in_view[3]) { // task 1. show task with lines and highlight
      if (!first_reach_element[4]) { //upscrolled to task1.
        first_reach_element[4] = true;
      }
      if (first_reach_element[3]) {
        $(".fyp-content").css({
          "color": "rgba(153, 149, 132, 0.5)"
        });
        $(".section-content, .text-content").addClass("task-color");
        shiftMode("titles", "quick");
        first_reach_element[2] = true;
        first_reach_element[3] = false;
      }
      animationNodes("Task", 8);
      $(".task-highlight").addClass("task-highlight-add");
    }

  }
}

function update(data) {
  $(".scroll-down-small").hide();
    $(".gap-arrow").hide();
  if (this.index == 0) { //cover
    resetView();
    cover_in_view = true;
    //  console.log("cover");
  }

  if (this.index == 1) { //intro1
    resetView();
    element_in_view[0] = true;
    //  console.log("intro1");
  }

  if (this.index == 2) { //showAllTexts
    resetView();
    element_in_view[1] = true;
    //    console.log("alltexts");
  }

  if (this.index == 3) { //blank
    resetView();
    element_in_view[2] = true;
    //  console.log("blank");
  }

  if (this.index == 4) { //task1 - lines with highlight words.
    resetView();
    element_in_view[3] = true;
    //    console.log("task1");
  }

  if (this.index == 5) { //task1 - blank
    resetView();
    element_in_view[4] = true;
    //    console.log("blank");
  }

  // if (this.index == 6) { //task2
  //   resetView();
  //   element_in_view[5] = true;
  //   //  console.log("task2");
  // }

  // if (this.index == 7) { //task2-blank
  //   resetView();
  //   element_in_view[6] = true;
  //   //  console.log("blank");
  // }

  if (this.index == 6) { //task3-info1
    resetView();
    element_in_view[5] = true;
    //  console.log("task3-info1");
  }

  if (this.index == 7) { //task3-info1-blank.
    resetView();
    element_in_view[6] = true;
    //  console.log("task3-info1");
  }

  if (this.index == 8) { //task4-info2
    resetView();
    element_in_view[7] = true;
    //  console.log("task4-info2");
  }

  if (this.index == 9) { //task4-info2-blank.
    resetView();
    element_in_view[8] = true;
    //  console.log("task4-info2");
  }

  if (this.index == 10) { //manufacture1 - showall texts
    resetView();
    element_in_view[9] = true;
    //  console.log("manufacture1");
  }

  if (this.index == 11) { //manufacture-blank
    resetView();
    element_in_view[10] = true;
    //    console.log("blank");
  }

  if (this.index == 12) { //manufacture2
    resetView();
    element_in_view[11] = true;
    //    console.log("manufacture2");
  }

  if (this.index == 13) { //manufacture2-blank
    resetView();
    element_in_view[12] = true;
    //console.log("blank");
  }

  if (this.index == 14) { //manufacture3-qutoe.
    resetView();
    element_in_view[13] = true;
    //console.log("manufacture3-quote");
  }

  if (this.index == 15) { //manufacture3-qutoe-blank.
    resetView();
    element_in_view[14] = true;
    //console.log("manufacture3-quote");
  }

  if (this.index == 16) { //manufacture4 - info1
    resetView();
    element_in_view[15] = true;
    //  console.log("manufacture4-info1");
  }

  if (this.index == 17) { //manufacture4 - info1-blank.
    resetView();
    element_in_view[16] = true;
    //  console.log("manufacture4-info1");
  }

  if (this.index == 18) { //manufacture5 - info2-quote
    resetView();
    element_in_view[17] = true;
    //  console.log("manufacture5-info2");
  }

  if (this.index == 19) { //manufacture5 - info2-quote-blank.
    resetView();
    element_in_view[18] = true;
    //  console.log("manufacture5-info2");
  }

  if (this.index == 20) { //agriculture1-showalltexts.
    resetView();
    element_in_view[19] = true;
    //console.log("agriculture1");
  }

  if (this.index == 21) { //agriculture1-blank.
    resetView();
    element_in_view[20] = true;
    //console.log("blank");
  }

  if (this.index == 22) { //agriculture2.
    resetView();
    element_in_view[21] = true;
    //console.log("agriculture2");
  }

  if (this.index == 23) { //agriculture2-blank.
    resetView();
    element_in_view[22] = true;
    //console.log("blank");
  }

  if (this.index == 24) { //agriculture3 - info.
    resetView();
    element_in_view[23] = true;
    //console.log("agriculture3 -info1");
  }

  if (this.index == 25) { //agriculture3 - info -blank.
    resetView();
    element_in_view[24] = true;
    //console.log("agriculture3 -info1");
  }

  if (this.index == 26) { //agriculture4 -blank -quote.
    resetView();
    element_in_view[25] = true;
    //  console.log("agriculture4-blank-quote");
  }

  if (this.index == 27) { //agriculture4 -blank -quote - blank.
    resetView();
    element_in_view[26] = true;
    //  console.log("agriculture4-blank-quote");
  }

  if (this.index == 28) { //agriculture5-info2
    resetView();
    element_in_view[27] = true;
    //  console.log("agriculture5-info2");
  }

  if (this.index == 29) { //before-explore.
    resetView();
    element_in_view[28] = true;
    //console.log("exlore");
  }

  if (this.index == 30) { //explore.
    resetView();
    element_in_view[29] = true;
    //console.log("exlore");
  }

}

function showArrow() {
  $(".scroll-down-small").show();
  $(".gap-arrow").show();
}

function resetView() {
  element_in_view.fill(false);
  cover_in_view = false;
}


function showAllTexts(s) {
  for (var i = 0; i < fyps.length; i++) {
    $("#cfypDiv" + i).show();
    for (var j = 0; j < fyps[i].sections.length; j++) {
      $("#csectionContentDiv" + i + j).show();
      if (s == "quick") {
        $("#csectionContentDiv" + i + j + " .csection-content").show();
      } else {
        $("#csectionContentDiv" + i + j + " .csection-content").slideDown(10000);
      }
      for (var v = 0; v < fyps[i].sections[j].chapters.length; v++) {
        $("#cchapterContentDiv" + i + j + v).show();
        if (s == "quick") {
          $("#cchapterContentDiv" + i + j + v + " .ctext-content").show();
        } else {
          $("#cchapterContentDiv" + i + j + v + " .ctext-content").slideDown(10000);
        }
      }
    }
  }
}

function hideAllTexts() {
  for (var i = 0; i < fyps.length; i++) {
    $("#cfypDiv" + i).hide();
    for (var j = 0; j < fyps[i].sections.length; j++) {
      $("#csectionContentDiv" + i + j).hide();
      $("#csectionContentDiv" + i + j + " .csection-content").hide();
      for (var v = 0; v < fyps[i].sections[j].chapters.length; v++) {
        $("#cchapterContentDiv" + i + j + v).hide();
        $("#cchapterContentDiv" + i + j + v + " .ctext-content").hide();
      }
    }
  }
}

function setCoverDiv() {
  //create cover fyps card.
  for (var i = 0; i < fypNum; i++) {
    cfypDiv[i] = createDiv().id("cfypDiv" + i).class("cover-card").parent("cover-bg").hide();
    var cthisPositionX = couterPadding + i * cinnerPadding + i * cfypDivWidth;
    cfypDiv[i].position(cthisPositionX, 0);
    cfypDiv[i].style("width", cfypDivWidth + "px");
    cfypDiv[i].style("position", "fixed");
    var cfypDivHeight = wh - margins.top;
    cfypDiv[i].style("height", cfypDivHeight + "px");
  }
  //create cover holders.
  for (var i = 0; i < fyps.length; i++) {
    createDiv().id("cfypContentDiv" + i).class("cfyp-content").parent("cfypDiv" + i);
    //  createDiv().id("cfypContent-title" + i).class("cfyp-title").parent("cfypContentDiv" + i);
    for (var j = 0; j < fyps[i].sections.length; j++) {
      createDiv("<p class = 'section-title'><span class = 'section-title-bg'>" + fyps[i].sections[j].no + " " + fyps[i].sections[j].title + "</span></p>").id("csectionContentDiv" + i + j).parent("cfypContentDiv" + i);
      if (fyps[i].sections[j].text != null) {
        createDiv(fyps[i].sections[j].text).class("csection-content").parent("csectionContentDiv" + i + j).hide();
      }

      for (var v = 0; v < fyps[i].sections[j].chapters.length; v++) {
        if (fyps[i].sections[j].chapters[v].no != null) {
          //then put the chapter titles under the section titles repectively.
          createDiv("<p class = 'chapter-title'><span class = 'chapter-title-bg'>" + fyps[i].sections[j].chapters[v].no + " " + fyps[i].sections[j].chapters[v].title + "</span></p>").id("cchapterContentDiv" + i + j + v).parent("csectionContentDiv" + i + j);
          //then put the chapter texts under the chapter titles respectively and hide them all.
          createDiv(fyps[i].sections[j].chapters[v].text).class("ctext-content").parent("cchapterContentDiv" + i + j + v).hide();
        }
      }
    }
  }

}

function scaleAll(s) {
  if (s == "titles") {
    $(".fyp-content").css("transform", "scale(" + scaleTitle + ")");
    $(".fyp-content").css("width", scaleWidthTitle);
  }
  if (s == "texts") {
    $(".fyp-content").css("transform", "scale(" + scaleText + ")");
    $(".fyp-content").css("width", scaleWidthText);
  }

}

function shiftMode(s, speed) {
  if (s == "texts") {
    if (speed == "quick") {
      scaleAll("texts");
      $(".section-title, .chapter-title").hide();
      $(".section-content, .text-content").show();
    } else if (speed == "slow") {
      scaleAll("texts");
      $(".section-title, .chapter-title").hide();
      // if (is_ie) {
      //   $(".fypDiv").show();
      // } else {
      $(".fypDiv").slideDown(2000);
      //}

    } else if (speed == "medium") {
      scaleAll("texts");
      $(".section-title, .chapter-title").hide();
      // if (is_ie) {
      //   $(".section-content, .text-content").show();
      // } else {
      $(".section-content, .text-content").slideDown(1000);
      //}

    }
  }
  if (s == "titles") {
    if (speed == "quick") {
      scaleAll("titles");
      $(".section-content, .text-content").hide();
      $(".section-title, .chapter-title").show();
    } else if (speed == "slow") {
      scaleAll("titles");
      $(".section-content, .text-content").hide();
      $(".section-title, .chapter-title").show();
    }
  }

}

function highlightTexts(node, addc) {
  for (var i = 0; i < fyps.length; i++) {
    for (var j = 0; j < fyps[i].sections.length; j++) {
      if (fyps[i].sections[j].tags == node) {
        //console.log("????");
        //  select("span", "#sectionContentDiv" + i + j).addClass("large", 500);
        $("#sectionContentDiv" + i + j + " .section-content").hide();
        $("#sectionContentDiv" + i + j + " .section-content").addClass(addc);
        // if (is_ie) {
        //   $("#sectionContentDiv" + i + j + " .section-content").show();
        // } else {
        $("#sectionContentDiv" + i + j + " .section-content").slideDown(800);
        //  }


        for (var c = 0; c < fyps[i].sections[j].chapters.length; c++) {
          $("#chapterContentDiv" + i + j + c + " .text-content").hide();
          $("#chapterContentDiv" + i + j + c + " .text-content").addClass(addc);
          // if (is_ie) {
          //   $("#chapterContentDiv" + i + j + c + " .text-content").show();
          // } else {
          $("#chapterContentDiv" + i + j + c + " .text-content").slideDown(800);
          //  }

        }
      } else {
        for (var c = 0; c < fyps[i].sections[j].chapters.length; c++) {
          if (fyps[i].sections[j].chapters[c].tags == node) {
            //  select("span", "#chapterContentDiv" + i + j + c).addClass("medium", 500);
            //createDiv(fyps[i].sections[j].chapters[v].text).class("text-content").parent("chapterContentDiv" + i + j + v).hide();
            //select(".text-content", "#chapterContentDiv" + i + j + c).show();
            //console.log("tessst");
            $("#chapterContentDiv" + i + j + c + " .text-content").hide();
            $("#chapterContentDiv" + i + j + c + " .text-content").addClass(addc);
            // if (is_ie) {
            //   $("#chapterContentDiv" + i + j + c + " .text-content").show();
            // } else {
            $("#chapterContentDiv" + i + j + c + " .text-content").slideDown(800);
            //  }

          }
        }

      }
    }
  }
}

function emptyNodes() {
  $("span").removeClass("large medium manufacture-large agriculture-large task-large manufacture-medium agriculture-medium task-medium others-large others-medium");
  $("p").removeClass("medium-s");
  $(".text-highlight").removeClass("text-highlight-add");
  $(".task-highlight").removeClass("task-highlight-add");
  //$(".text-content").hide();
  //$(".section-content").hide();
  currentM.fill(0);
}

function animationNodes(node, fypsNo) {
  var nodeArray = nodes[node];
  if (node == "Manufacturing") {
    highlightSingleNode(node, 0, "manufacture-large", "manufacture-medium");
    highlightSingleNode(node, 1, "manufacture-large", "manufacture-medium");
    drawingSingleNode(nodeArray, 0, manufactureLineDark, manufactureLine);
    for (var j = 1; j < fypsNo - 1; j++) {
      if (currentM[j - 1] == m) {
        drawingSingleNode(nodeArray, j, manufactureLineDark, manufactureLine);
      }
    }
    if (currentM[1] == m) {
      highlightSingleNode(node, 2, "manufacture-large", "manufacture-medium");
    }
    if (currentM[3] == m) {
      highlightSingleNode(node, 3, "manufacture-large", "manufacture-medium");
    }
    if (currentM[5] == m) {
      highlightSingleNode(node, 4, "manufacture-large", "manufacture-medium");
    }
    if (currentM[7] == m) {
      highlightSingleNode(node, 5, "manufacture-large", "manufacture-medium");
    }
    if (currentM[8] == m) {
      highlightSingleNode(node, 6, "manufacture-large", "manufacture-medium");
    }
    if (currentM[11] == m) {
      highlightSingleNode(node, 7, "manufacture-large", "manufacture-medium");
    }

  } else if (node == "Agriculture") {
    highlightSingleNode(node, 0, "agriculture-large", "agriculture-medium");
    drawingSingleNode(nodeArray, 0, agricultureLineDark, agricultureLine);
    for (var j = 1; j < 4 - 1; j++) {
      if (currentM[j - 1] == m) {
        highlightSingleNode(node, j, "agriculture-large", "agriculture-medium");
        highlightSingleNode(node, j + 1, "agriculture-large", "agriculture-medium");
        drawingSingleNode(nodeArray, j, agricultureLineDark, agricultureLine);
      }
    }
    if (currentM[2] == m) {
      highlightSingleNode(node, 4, "agriculture-large", "agriculture-medium");
      drawingSingleNode(nodeArray, 3, agricultureLineDark, agricultureLine);
    }
    // if(currentM[3] == m){
    //   highlightSingleNode(node, 4);
    // }

    for (var j = 4; j < 9 - 1; j++) {
      if (currentM[j - 1] == m) {
        highlightSingleNode(node, j, "agriculture-large", "agriculture-medium");
        drawingSingleNode(nodeArray, j, agricultureLineDark, agricultureLine);
      }
    }

  } else {

    highlightSingleNode(node, 0, "task-large", "task-medium");
    drawingSingleNode(nodeArray, 0, taskLineDark, taskLine);
    for (var j = 1; j < fypsNo - 1; j++) {
      if (currentM[j - 1] == m) {
        highlightSingleNode(node, j, "task-large", "task-medium");
        drawingSingleNode(nodeArray, j, taskLineDark, taskLine);
      }
    }
    if (currentM[fypsNo - 2] == m) {
      highlightSingleNode(node, fypsNo - 1, "task-large", "task-medium");
    }
  }
}

function drawingNodes(node, fypsNo, dark, light) {
  //console.log("happenning");
  var nodeArray = nodes[node];
  drawingSingleNode(nodeArray, 0, dark, light);
  for (var j = 1; j < fypsNo - 1; j++) {
    if (currentM[j - 1] == m) {
      drawingSingleNode(nodeArray, j, dark, light);
    }
  }

}

function highlightNodes(node, fypsNo, typeL, typeM) {

  for (var i = 0; i < fypsNo; i++) {
    for (var j = 0; j < fyps[i].sections.length; j++) {
      if (fyps[i].sections[j].tags == node) {
        //console.log("????");
        select("span", "#sectionContentDiv" + i + j).addClass("large", 500).addClass(typeL);
        //select("span", "#sectionContentDiv" + i + j + " span").addClass("add-bg-large", 1500);
        $("#sectionContentDiv" + i + j + " .section-content").slideDown(1000);

        for (var c = 0; c < fyps[i].sections[j].chapters.length; c++) {
          //console.log("siiii");
          $("#chapterContentDiv" + i + j + c + " p").addClass("medium-s");
          //select(".text-content", "#chapterContentDiv" + i + j + c).show();
          $("#chapterContentDiv" + i + j + c + " .text-content").slideDown(1000);
        }
      } else {
        for (var c = 0; c < fyps[i].sections[j].chapters.length; c++) {
          if (fyps[i].sections[j].chapters[c].tags == node) {
            select("span", "#chapterContentDiv" + i + j + c).addClass("medium", 500).addClass(typeM);
            //createDiv(fyps[i].sections[j].chapters[v].text).class("text-content").parent("chapterContentDiv" + i + j + v).hide();
            //select(".text-content", "#chapterContentDiv" + i + j + c).show();
            //console.log("tessst");
            $("#chapterContentDiv" + i + j + c + " .text-content").slideDown(1000);
          }
        }

      }
    }
  }

}

function highlightSingleNode(node, fypsNo, typeL, typeM) {
  var i = fypsNo;
  for (var j = 0; j < fyps[i].sections.length; j++) {
    if (fyps[i].sections[j].tags == node) {
      //console.log("????");
      select("span", "#sectionContentDiv" + i + j).addClass("large", 500).addClass(typeL);

      //$("#sectionContentDiv" + i + j + " .section-content").slideDown(1000);
      $("#sectionContentDiv" + i + j + " .section-content").show();
      for (var c = 0; c < fyps[i].sections[j].chapters.length; c++) {
        //console.log("siiii");
        $("#chapterContentDiv" + i + j + c + " p").addClass("medium-s");
        //select(".text-content", "#chapterContentDiv" + i + j + c).show();
        //  $("#chapterContentDiv" + i + j + c + " .text-content").slideDown(1000);
        $("#chapterContentDiv" + i + j + c + " .text-content").show();
      }
    } else {
      for (var c = 0; c < fyps[i].sections[j].chapters.length; c++) {
        if (fyps[i].sections[j].chapters[c].tags == node) {
          select("span", "#chapterContentDiv" + i + j + c).addClass("medium", 500).addClass(typeM);
          //createDiv(fyps[i].sections[j].chapters[v].text).class("text-content").parent("chapterContentDiv" + i + j + v).hide();
          //select(".text-content", "#chapterContentDiv" + i + j + c).show();
          //console.log("tessst");
          //$("#chapterContentDiv" + i + j + c + " .text-content").slideDown(1000);
          $("#chapterContentDiv" + i + j + c + " .text-content").show();
        }
      }

    }
  }
}

function drawingSingleNode(nodeArray, i, dark, light) {
  noFill();
  //for(var i = 0; i < nodeArray.length - 1; i++){
  if (Array.isArray(nodeArray[i].endv) && !Array.isArray(nodeArray[i + 1].startv)) {

    //stroke("rgba(181, 58, 48, 0.8)");
    stroke(light);
    strokeWeight(1);
    for (var v = 0; v < nodeArray[i].endv.length; v++) { // ends to start.
      //console.log("1");
      beginShape();
      for (var n = 0; n < currentM[i]; n++) {
        var p = n / m;
        var res = ease(p, g);
        var x = nodeArray[i].endv[v].x + (nodeArray[i + 1].startv.x - nodeArray[i].endv[v].x) * p;
        var y = nodeArray[i].endv[v].y + (nodeArray[i + 1].startv.y - nodeArray[i].endv[v].y) * res;
        //var x = nodeArray[i].endv[v].x - 10 + (nodeArray[i + 1].startv.x - nodeArray[i].endv[v].x + 10) * p;
        //var y = nodeArray[i].endv[v].y - 10+ (nodeArray[i + 1].startv.y - nodeArray[i].endv[v].y + 10) * res;
        vertex(x, y);
      }
      endShape();
    }

  } else if (Array.isArray(nodeArray[i + 1].startv) && !Array.isArray(nodeArray[i].endv)) {
    //console.log("2");
    //stroke("rgba(244,128,93,0.7)");
    //stroke("rgba(181, 58, 48, 0.8)");
    stroke(light);
    strokeWeight(1);
    for (var v = 0; v < nodeArray[i + 1].startv.length; v++) { //end to starts.
      beginShape();
      for (var n = 0; n < currentM[i]; n++) {
        var p = n / m;
        var res = ease(p, g);
        var x = nodeArray[i].endv.x + (nodeArray[i + 1].startv[v].x - nodeArray[i].endv.x) * p;
        var y = nodeArray[i].endv.y + (nodeArray[i + 1].startv[v].y - nodeArray[i].endv.y) * res;
        //var x = nodeArray[i].endv.x - 10 + (nodeArray[i + 1].startv[v].x - nodeArray[i].endv.x + 10) * p;
        //var y = nodeArray[i].endv.y - 10 + (nodeArray[i + 1].startv[v].y - nodeArray[i].endv.y + 10) * res;
        vertex(x, y);
      }
      endShape();
    }
  } else if (Array.isArray(nodeArray[i + 1].startv) && (nodeArray[i].endv.length == 1)) {
    // stroke("rgba(244,128,93,0.7)");
    //stroke("rgba(181, 58, 48, 0.8)");
    stroke(light);
    strokeWeight(1);
    //console.log("2");
    for (var v = 0; v < nodeArray[i + 1].startv.length; v++) { //end to array start.
      beginShape();
      for (var n = 0; n < currentM[i]; n++) {
        var p = n / m;
        var res = ease(p, g);
        var x = nodeArray[i].endv[0].x + (nodeArray[i + 1].startv[v].x - nodeArray[i].endv[0].x) * p;
        var y = nodeArray[i].endv[0].y + (nodeArray[i + 1].startv[v].y - nodeArray[i].endv[0].y) * res;
        //  var x = nodeArray[i].endv[0].x - 10 + (nodeArray[i + 1].startv[v].x - nodeArray[i].endv[0].x + 10) * p;
        //var y = nodeArray[i].endv[0].y - 10 + (nodeArray[i + 1].startv[v].y - nodeArray[i].endv[0].y + 10) * res;
        vertex(x, y);
      }
      endShape();
    }
  } else if (Array.isArray(nodeArray[i + 1].startv) && Array.isArray(nodeArray[i].endv)) {

    //end to start.
    //stroke("rgba(244,128,93,0.7)");
    //stroke("rgba(181, 58, 48, 0.8)");
    stroke(light);
    strokeWeight(1);
    beginShape();
    for (var n = 0; n < currentM[i]; n++) {
      var p = n / m;
      var res = ease(p, g);
      var x = nodeArray[i].endv[0].x + (nodeArray[i + 1].startv[0].x - nodeArray[i].endv[0].x) * p;
      var y = nodeArray[i].endv[0].y + (nodeArray[i + 1].startv[0].y - nodeArray[i].endv[0].y) * res;
      //var x = nodeArray[i].endv[0].x - 10 + (nodeArray[i + 1].startv[0].x - nodeArray[i].endv[0].x + 10) * p;
      //var y = nodeArray[i].endv[0].y - 10 + (nodeArray[i + 1].startv[0].y - nodeArray[i].endv[0].y + 10) * res;
      vertex(x, y);
    }
    endShape();

  } else {

    strokeWeight(2);
    //   stroke("rgba(146, 9, 3, 0.8)");
    //stroke("rgba(146, 9, 3, 0.8)");
    stroke(dark);
    beginShape();
    for (var n = 0; n < currentM[i]; n++) { //section to section, end to start.
      var p = n / m;
      var res = ease(p, g);
      var x = nodeArray[i].endv.x + (nodeArray[i + 1].startv.x - nodeArray[i].endv.x) * p;
      var y = nodeArray[i].endv.y + (nodeArray[i + 1].startv.y - nodeArray[i].endv.y) * res;
      //var x = nodeArray[i].endv.x - 10 + (nodeArray[i + 1].startv.x - nodeArray[i].endv.x + 10) * p;
      //  var y = nodeArray[i].endv.y - 10 + (nodeArray[i + 1].startv.y - nodeArray[i].endv.y + 10) * res;
      vertex(x, y);
    }
    endShape();

  }
  currentM[i]++;
  if (currentM[i] > m) {
    currentM[i] = m;
  }
  //}

}

function modifyNodes() {
  var sumY = 0;
  for (var i = 0; i < keywords.length; i++) {
    var nodeArray = [];
    nodeArray = nodes[keywords[i]];
    for (var j = 0; j < nodeArray.length - 1; j++) {
      if (Array.isArray(nodeArray[j].startv)) {
        if (nodeArray[j].startv.length > 1) {
          var addv = {};
          for (var v = 0; v < nodeArray[j].startv.length; v++) {
            sumY += nodeArray[j].endv[v].y
          }
          addv.y = sumY / nodeArray[j].startv.length;
          //console.log(addv.y);
          if (Array.isArray(nodeArray[j + 1].startv)) {
            //console.log(nodeArray[j].endv[0].x);
            addv.x = (nodeArray[j].endv[0].x + nodeArray[j + 1].startv[0].x) / 2 + 3;
          } else {
            addv.x = (nodeArray[j].endv[0].x + nodeArray[j + 1].startv.x) / 2 + 3;
          }
          var thisV = {};
          thisV.startv = addv;
          thisV.endv = addv;
          nodeArray.splice(j + 1, 0, thisV);
          sumY = 0;
        }
      }
    }
  }
  //console.log(nodes);
}

function connectedNodes(node) {
  //shiftMode("titles");
  nodes[node] = [];

  for (var i = 0; i < fyps.length; i++) {
    for (var j = 0; j < fyps[i].sections.length; j++) {
      if (fyps[i].sections[j].tags == node) {
        var thisV = {};
        select("span", "#sectionContentDiv" + i + j).addClass("large-x"); //highlight the section tile.
        $("#sectionContentDiv" + i + j + " .section-content").show();
        for (var c = 0; c < fyps[i].sections[j].chapters.length; c++) {
          $("#chapterContentDiv" + i + j + c + " p").addClass("medium-s-x");
          $("#chapterContentDiv" + i + j + c + " .text-content").show();
        }
        var thisP = $("#sectionContentDiv" + i + j + " .section-title");
        var startx = thisP.offset().left;
        var starty = thisP.offset().top + thisP.innerHeight() / scaleSize / 2 - upperHeight - fypHeadHeight;
        var endx = thisP.offset().left + thisP.innerWidth() / scaleSize;
        var endy = thisP.offset().top + thisP.innerHeight() / scaleSize / 2 - upperHeight - fypHeadHeight;
        var endv = {
          x: endx,
          y: endy
        }
        var startv = {
          x: startx,
          y: starty
        }
        thisV.startv = startv;
        thisV.endv = endv;
        nodes[node].push(thisV); //put this section tilte position in the array.

      } else {
        var chapterV = {};
        chapterV.startv = [];
        chapterV.endv = [];
        for (var c = 0; c < fyps[i].sections[j].chapters.length; c++) {
          if (fyps[i].sections[j].chapters[c].tags == node) {

            select("span", "#chapterContentDiv" + i + j + c).addClass("medium-x");
            $("#chapterContentDiv" + i + j + c + " .text-content").show();
            var thisP = $("#chapterContentDiv" + i + j + c + " .chapter-title");
            var startx = thisP.offset().left;
            var starty = thisP.offset().top + thisP.innerHeight() / scaleSize / 2 - upperHeight - fypHeadHeight;
            var endx = thisP.offset().left + thisP.innerWidth() / scaleSize;
            var endy = thisP.offset().top + thisP.innerHeight() / scaleSize / 2 - upperHeight - fypHeadHeight;
            var endv = {
              x: endx,
              y: endy
            }
            var startv = {
              x: startx,
              y: starty
            }
            //  console.log(startv.x + ", " + startv.y);
            chapterV.startv.push(startv);
            chapterV.endv.push(endv);

          }
        }

        if (chapterV.startv.length > 0) {
          nodes[node].push(chapterV);
        }
      } //close else.

    } //sections.
  } //fyps.

  $("span").removeClass("large-x medium-x");
  $("p").removeClass("medium-s-x");
  $(".text-content").hide();
  $(".section-content").hide();

  return nodes;
}

function processingData() {
  var lastSectionNo;

  for (var i = 0; i < fypNum; i++) {
    var fyp = {};
    if (i == 0) {
      fyp.no = 1;
    } else {
      fyp.no = i + 6;
    }
    fyps.push(fyp);
  }

  for (var i = 0; i < fyps.length; i++) {
    fyps[i].sections = [];

    for (var j = 0; j < data.length; j++) {
      var section = {};
      if (data[j].fypNo == fyps[i].no) {
        var thisSectionNo = data[j].sectionNo;
        if (thisSectionNo != lastSectionNo) {
          section.no = thisSectionNo;
          section.title = data[j].sectionTitle;
          section.tags = data[j].tags;
          section.words = data[i].words;
          section.text = data[j].text;
          section.chapters = [];
          fyps[i].sections.push(section);
        }
        lastSectionNo = thisSectionNo;
      }
    }
  }

  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < fyps.length; j++) {
      for (var v = 0; v < fyps[j].sections.length; v++) {

        if (data[i].fypNo == fyps[j].no && data[i].sectionNo == fyps[j].sections[v].no) {

          var chapter = {};
          var thisChapterNo = data[i].chapterNo;
          chapter.no = thisChapterNo;
          chapter.title = data[i].ChapterTitle;
          chapter.tags = data[i].tags;
          chapter.words = data[i].words;
          chapter.text = data[i].text;

          fyps[j].sections[v].chapters.push(chapter);
        }
      }
    }
  }
}

function toTask() {
  resetSection();
  isKeywords["Task"] = true;
  createPointDiv("Task");

  //show all task points.
  $(".task-star").show();
  $("#task-star1").hover(function(e) {
    // var bottom = 400 + "px";
    // var left = e.pageX + 10 + "px";
    var bottom = 80 + "px";
    var left = 40 + "px";
    $("#task-text1").css({
      'position': 'absolute',
      'bottom': bottom,
      'left': left
    }).show("slow");
    $(".task-highlight").addClass("task-highlight-add");
  }, function() {
    $("#task-text1").hide();
    $(".task-highlight").removeClass("task-highlight-add");
  });
}

function toManufacturing() {
  resetSection();
  isKeywords["Manufacturing"] = true;
  setTimeout(function() {
    createPointDiv("Manufacturing");
    //show all manufacturing points.
    $(".manufacturing-star").show();
    $("#manufacturing-star1").hover(function(e) {
      var top = e.pageY + "px";
      var left = e.pageX + 10 + "px";
      $("#manufacture-text1").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("3s");
    }, function() {
      $("#manufacture-text1").hide();
      clearAnimation();
    });

    $("#manufacturing-star2").hover(function(e) {
      var top = e.pageY + 5 + "px";
      var left = e.pageX - 10 - hoverWidth + "px";
      $("#manufacture-text2").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("3s");
    }, function() {
      $("#manufacture-text2").hide();
      clearAnimation();
    });
  }, 800);


}

function textAnimation(sec) {
  //  console.log("happen");
  $(".text-highlight-span").markerAnimation({
    color: "rgb(255, 235, 59)",
    duration: sec,
    thickness: "1em",
    padding_bottom: "0em",
    font_weight: null
  });
}

function clearAnimation() {
  $(".text-highlight-span").css({
    "background": "transparent",
    "transition": "none"
  });
}

function toAgriculture() {
  resetSection();
  isKeywords["Agriculture"] = true;
  setTimeout(function() {
    createPointDiv("Agriculture");

    //show all agriculture points.
    $(".agriculture-star").show();
    $("#agriculture-star1").hover(function(e) {
      var top = e.pageY + "px";
      var left = e.pageX + 10 + "px";
      $("#agriculture-text1").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("3s");
    }, function() {
      $("#agriculture-text1").hide();
      clearAnimation();
    });
  }, 800);



}

function toDefence() {
  resetSection();
  isKeywords["Defence"] = true;
  setTimeout(function() {
    createPointDiv("Defence");
    //show all defence points.

    $(".defence-star").show();

    $("#defence-star1").hover(function(e) {
      //console.log(">>>>?????");
      var top = e.pageY + "px";
      var left = e.pageX + 10 + "px";
      $("#defence-text1").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("2s");
    }, function() {
      clearAnimation();
      $("#defence-text1").hide();
    });

    $("#defence-star2").hover(function(e) {
      var top = e.pageY + 5 + "px";
      var left = e.pageX - 10 - hoverWidth + "px";
      $("#defence-text2").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("3s");
    }, function() {
      clearAnimation();
      $("#defence-text2").hide();
    });

  }, 800);

}

function toEnvironment() {
  resetSection();
  isKeywords["Environment"] = true;

  setTimeout(function() {
    createPointDiv("Environment");
    //show all environment points.
    $(".environment-star").show();

    $("#environment-star1").hover(function(e) {
      var top = e.pageY + 5 + "px";
      var left = e.pageX - 10 - hoverWidth + "px";
      $("#environment-text1").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("2s");
    }, function() {
      clearAnimation();
      $("#environment-text1").hide();
    });

  }, 800)

}

function toTech() {
  resetSection();
  isKeywords["Tech"] = true;

  setTimeout(function() {
    createPointDiv("Tech");
    //show all r&d points.
    $(".rd-star").show();
    $("#rd-star1").hover(function(e) {
      var top = e.pageY + "px";
      var left = e.pageX + 10 + "px";
      $("#rd-text1").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("3s");
    }, function() {
      clearAnimation();
      $("#rd-text1").hide();
    });

    $("#rd-star2").hover(function(e) {
      var top = e.pageY + "px";
      var left = e.pageX + 10 + "px";
      $("#rd-text2").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("3s");
    }, function() {
      clearAnimation();
      $("#rd-text2").hide();
    });

    $("#rd-star3").hover(function(e) {
      var top = e.pageY + 5 + "px";
      var left = e.pageX - 10 - hoverWidth + "px";
      $("#rd-text3").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("3s");
    }, function() {
      clearAnimation();
      $("#rd-text3").hide();
    });

  }, 800)

}

function toTrade() {
  resetSection();
  isKeywords["Trade"] = true;

  setTimeout(function() {
    createPointDiv("Trade");

    //show all trade points.
    $(".trade-star").show();
    $("#trade-star1").hover(function(e) {
      var top = e.pageY + "px";
      var left = e.pageX + 10 + "px";
      $("#trade-text1").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("5s");
    }, function() {
      clearAnimation();
      $("#trade-text1").hide();
    });
    $("#trade-star2").hover(function(e) {
      var top = e.pageY + "px";
      var left = e.pageX + 10 + "px";
      $("#trade-text2").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("4s");
    }, function() {
      clearAnimation();
      $("#trade-text2").hide();
    });
    $("#trade-star3").hover(function(e) {
      var top = e.pageY + "px";
      var left = e.pageX + 10 + "px";
      $("#trade-text3").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("4s");
    }, function() {
      clearAnimation();
      $("#trade-text3").hide();
    });
  }, 800);
}

function toHealth() {
  resetSection();
  isKeywords["Health"] = true;
  setTimeout(function() {
    createPointDiv("Health");

    //show all health points.
    $(".health-star").show();
    $("#health-star1").hover(function(e) {
      // var top = e.pageY + "px";
      // var left = e.pageX + 10 + "px";
      var bottom = 80 + "px";
      var left = 40 + "px";
      $("#health-text1").css({
        'position': 'absolute',
        'bottom': bottom,
        'left': left
      }).show("slow");
    }, function() {
      clearAnimation();
      $("#health-text1").hide();
    });

    $("#health-star2").hover(function(e) {
      // var top = e.pageY + 5 + "px";
      // var left = e.pageX - 10 - hoverWidth + "px";
      var bottom = 80 + "px";
      var left = 40 + "px";
      $("#health-text2").css({
        'position': 'absolute',
        'bottom': bottom,
        'left': left
      }).show("slow");
    }, function() {
      clearAnimation();
      $("#health-text2").hide();
    });
  }, 800)

}

function toDemocracy() {
  resetSection();
  isKeywords["Democracy"] = true;
  setTimeout(function() {
    createPointDiv("Democracy");
    //show all health points.
    $(".democracy-star").show();
    $("#democracy-star1").hover(function(e) {
      //var top = e.pageY + "px";
      //var left = e.pageX + 10 + "px";
      var bottom = 80 + "px";
      var left = 40 + "px";
      $("#democracy-text1").css({
        'position': 'absolute',
        'bottom': bottom,
        'left': left
      }).show("slow");
      $(".minzhu").addClass("minzhu-highlight-add");

    }, function() {
      clearAnimation();
      $("#democracy-text1").hide();
      $(".minzhu").removeClass("minzhu-highlight-add");
    });
    $("#democracy-star2").hover(function(e) {
      // var bottom = 300 + "px";
      // var left = e.pageX - 10 - hoverWidth + "px";
      var bottom = 80 + "px";
      var left = 40 + "px";
      $("#democracy-text2").css({
        'position': 'absolute',
        'bottom': bottom,
        'left': left
      }).show("slow");
      $(".law-based").addClass("law-based-add");
      $(".rule-law").addClass("rule-law-add");

    }, function() {
      clearAnimation();
      $("#democracy-text2").hide();
      $(".law-based").removeClass("law-based-add");
      $(".rule-law").removeClass("rule-law-add");
    });

  }, 800);

}

function createPointDiv(keyword) {

  if (keyword == "Task") {
    var tsx1 = $("#sectionContentDiv11").offset().left - 35;
    var tsy1 = $("#sectionContentDiv11").offset().top + 5;
    createDiv().position(tsx1, tsy1).id("task-star1").class("star").style("position", "fixed").addClass("task-star");
  }

  if (keyword == "Manufacturing") {
    var mx1 = $("#chapterContentDiv031").offset().left + 5;
    var my1 = $("#chapterContentDiv031").offset().top + 15;
    var mx2 = $("#chapterContentDiv752").offset().left + 5;
    var my2 = $("#chapterContentDiv752").offset().top - 15;
    createDiv().position(mx1, my1).id("manufacturing-star1").class("star").style("position", "fixed").addClass("manufacturing-star");
    createDiv().position(mx2, my2).id("manufacturing-star2").class("star").style("position", "fixed").addClass("manufacturing-star");
  }

  if (keyword == "Agriculture") {
    var ax1 = $("#chapterContentDiv511").offset().left + 5;
    var ay1 = $("#chapterContentDiv512").offset().top - 10;
    createDiv().position(ax1, ay1).id("agriculture-star1").class("star").style("position", "fixed").addClass("agriculture-star");
  }

  if (keyword == "Health") {
    var hx1 = $("#chapterContentDiv593").offset().left - 35;
    var hy1 = $("#chapterContentDiv593").offset().top + 5;
    var hx2 = $("#sectionContentDiv714").offset().left - 35;
    var hy2 = $("#sectionContentDiv714").offset().top + 5;
    createDiv().position(hx1, hy1).id("health-star1").class("star").style("position", "fixed").addClass("health-star");
    createDiv().position(hx2, hy2).id("health-star2").class("star").style("position", "fixed").addClass("health-star");
  }

  if (keyword == "Democracy") {
    var dmx1 = $("#sectionContentDiv48").offset().left - 35;
    var dmy1 = $("#sectionContentDiv48").offset().top + 5;
    var dmx2 = $("#sectionContentDiv511").offset().left - 35;
    var dmy2 = $("#sectionContentDiv511").offset().top + 5;
    createDiv().position(dmx1, dmy1).id("democracy-star1").class("star").style("position", "fixed").addClass("democracy-star");
    createDiv().position(dmx2, dmy2).id("democracy-star2").class("star").style("position", "fixed").addClass("democracy-star");
  }

  if (keyword == "Tech") {
    //R&D cards.
    var rdx1 = $("#chapterContentDiv083").offset().left + 5;
    var rdy1 = $("#chapterContentDiv083").offset().top + 25;
    var rdx2 = $("#chapterContentDiv432").offset().left + 5;
    var rdy2 = $("#chapterContentDiv432").offset().top - 10;
    var rdx3 = $("#chapterContentDiv722").offset().left + 5;
    var rdy3 = $("#chapterContentDiv722").offset().top - 10;
    createDiv().position(rdx1, rdy1).id("rd-star1").class("star").style("position", "fixed").addClass("rd-star");
    createDiv().position(rdx2, rdy2).id("rd-star2").class("star").style("position", "fixed").addClass("rd-star");
    createDiv().position(rdx3, rdy3).id("rd-star3").class("star").style("position", "fixed").addClass("rd-star");
  }

  if (keyword == "Environment") {
    var ex1 = $("#chapterContentDiv661").offset().left + 10;
    var ey1 = $("#chapterContentDiv662").offset().top - 8;
    createDiv().position(ex1, ey1).id("environment-star1").class("star").style("position", "fixed").addClass("environment-star");
  }

  if (keyword == "Trade") {
    //trade star divs.
    var tx1 = $("#chapterContentDiv062").offset().left + 5;
    var ty1 = $("#chapterContentDiv062").offset().top + 5;
    var tx2 = $("#chapterContentDiv162").offset().left + 10;
    var ty2 = $("#chapterContentDiv162").offset().top - 5;
    var tx3 = $("#chapterContentDiv452").offset().left + 5;
    var ty3 = $("#chapterContentDiv452").offset().top + 25;
    createDiv().position(tx1, ty1).id("trade-star1").class("star").style("position", "fixed").addClass("trade-star");
    createDiv().position(tx2, ty2).id("trade-star2").class("star").style("position", "fixed").addClass("trade-star");
    createDiv().position(tx3, ty3).id("trade-star3").class("star").style("position", "fixed").addClass("trade-star");
  }

  if (keyword == "Defence") {
    var dx1 = $("#chapterContentDiv114").offset().left + 5;
    var dy1 = $("#chapterContentDiv114").offset().top + 5;
    var dx2 = $("#chapterContentDiv6152").offset().left + 10;
    var dy2 = $("#chapterContentDiv6152").offset().top + 40;
    createDiv().position(dx1, dy1).id("defence-star1").class("star").style("position", "fixed").addClass("defence-star");
    createDiv().position(dx2, dy2).id("defence-star2").class("star").style("position", "fixed").addClass("defence-star");
  }
}


function resetSection() {
  if (isResize) {
    for (var i = 0; i < keywords.length; i++) {
      connectedNodes(keywords[i]);
    }
    modifyNodes();
    resizeCanvas(canvasWidth, canvasHeight);
    isResize = false;
  }
  clear();
  clearAnimation();
  emptyNodes();
  $(".star").remove();
  $(".hover-text").hide();
  $(".hover-text-bottom").hide();

  shiftMode("titles", "quick");

  for (var i = 0; i < keywords.length; i++) {
    isKeywords[keywords[i]] = false;
  }

  //$(".quote-span").removeClass("text-highlight-span");
}

//create cover animation words.
function newWord(n) {
  var x = random(ww);
  var y = random(wh);
  var nm = floor(random(248));
  var thisf = rawWords[nm];
  var valid = true;

  return new Word(thisf, x, y, n);
}


pageable.on("scroll", barUpdate);

function barUpdate(data) {

  //  var scrolled = (winScroll / height) * 100;
  var scrolled = (data.scrolled / data.max) * 100;
  document.getElementById("upperBar").style.width = scrolled + "%";
}

function ease(p, g) {
  if (p < 0.5)
    return 0.5 * pow(2 * p, g);
  else
    return 1 - 0.5 * pow(2 * (1 - p), g);
}
