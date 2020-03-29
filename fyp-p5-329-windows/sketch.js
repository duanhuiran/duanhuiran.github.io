//vars for processing data.
var fypsData;
var data;
var fyps = [];
var fypNum = 8;
//all sections.
var keywords = ["Task", "Manufacturing", "Agriculture", "Defence", "Environment", "Tech", "Trade", "Health", "Democracy"];
var isKeywords = {};
//vars for window layouts.
var ww = $(window).width(); //window width.
var wh = $(window).height(); //window height.
var hoverWidth = ww * 0.25; //hover text bound width.
var canvasHeight, upperHeight, bottomHeight, fypHeadHeight;
var canvas;
var canvasWidth = ww;
$(document).ready(function() {
  upperHeight = $("#upper").height();
  // bottomHeight = $("#footer").height();
  fypHeadHeight = $("#fyp-head").height();
  //canvasHeight = wh - upperHeight - bottomHeight - fypHeadHeight;
  canvasHeight = wh - upperHeight - fypHeadHeight;
  // console.log(upperHeight+ "," +bottomHeight+ "," +fypHeadHeight+ "," +canvasHeight);

  $("#styled-bars").css({
    "width": (ww - 2 * outerPadding) + "px",
    "left": outerPadding + "px"
  });

  $("#progress-container").css({
    "width": (ww - 2 * outerPadding) + "px",
    "left": outerPadding + "px"
  });
});

//cover animation setting.
var cover = true;
var words = [];
var wordsData, rawWords;
var initialNum = 100;

var couterPadding = 10;
var cinnerPadding = 0;
var cfypDiv = [];
var cfypDivWidth = (ww - couterPadding - couterPadding - cinnerPadding * 7) / fypNum;

//vars for container layouts.
var outerPadding = (ww / 50 > 35) ? ww / 50 : 35;
var innerPadding = ww / 35;
var margins = {
  left: outerPadding,
  top: 0,
  bottom: 0,
  right: outerPadding
}

var fypDivWidth = (canvasWidth - margins.left - margins.right - innerPadding * 7) / fypNum;

//fyp divs.
var fypDiv = [];
var fypDivMask = [];

//vars for nodes calculation.
var connectedArray = [];
var nodes = {};
var currentM;

//connecting animation.
var g = 2.5;
var m = 50;
//scale the whole card to 0.2, reduce the font size.
var scaleSize = 12.5;
//var scaleSize = 18;

//cover related.
var showCover = true;
var loading = true;

//trigger event.
//vars for trigger event.
var cardNum = 9;
var lastScrollTop = 0;
var IsDownscrolled = true;

var y_scroll_pos;
var element_in_view = [];
var element_position = [];
var element_height = [];
var activation_point = [];
var screen_height = wh;
var activation_offset = 1;
var max_scroll_height;
var first_reach_element;


var manufacture_offset = 0.4;
var agriculture_offset = 0.5;
var manufacture_position, agriculture_position;
var manufacture_height, agriculture_height;
var manufacture_activation_point, agriculture_activation_point;
var manufacture_in_view, agriculture_in_view;
var first_reach_manufacture = true;
// var first_reach_manufacture2 = true;
var first_reach_agriculture = true;

//resizing
var textMode = false;
var titleMode = false;

//color settings.
var manufactureLineDark;
var manufactureLine;
var agricultureLineDark;
var agricultureLine;
var taskLineDark;
var taskLine;
var othersLineDark;
var othersLine;

//resize layouts.
$(window).resize(function() {
  ww = $(window).width();
  wh = $(window).height();
  hoverWidth = ww * 0.25;

  upperHeight = $("#upper").height();
  // bottomHeight = $("#footer").height();
  fypHeadHeight = $("#fyp-head").height();
  canvasWidth = ww;
  canvasHeight = wh - upperHeight - fypHeadHeight;
  fypDivWidth = (canvasWidth - margins.left - margins.right - innerPadding * 7) / fypNum;

  for (var i = 0; i < fypNum; i++) {
    var thisPositionX = outerPadding + i * innerPadding + i * fypDivWidth;
    $("#fypHead" + i).css({
      "left": thisPositionX + "px",
      "width": fypDivWidth + "px",
      "height": fypHeadHeight + "px"
    });

    $("#fypDiv" + i).css({
      "left": thisPositionX + "px",
      "width": fypDivWidth + "px",
      "top": upperHeight + fypHeadHeight + "px",
      "height": canvasHeight + "px"
    });
  }

  $("#styled-bars").css({
    "width": (ww - 2 * outerPadding) + "px",
    "left": outerPadding + "px"
  });

  $("#progress-container").css({
    "width": (ww - 2 * outerPadding) + "px",
    "left": outerPadding + "px"
  });

  //menu bars.
  $("#menu").height(upperHeight);
  $("#menu").width(ww);

  for (var i = 0; i < keywords.length; i++) {
    connectedNodes(keywords[i]);
  }
  modifyNodes();
  //currentM.fill(0);

  if (textMode) {
    shiftMode("texts", "quick");
  }

  if (titleMode) {
    shiftMode("titles", "quick");
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
  console.log(fyps);

  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("theCanvas").style("position", "fixed");

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
    fypDiv[i] = createDiv().id("fypDiv" + i).class("fypDiv").parent("theCanvas").style("z-index", "-1");
    //fypDivMask[i] = createDiv().id("fypDivMask" + i).class("fypDivMask").parent("theCanvas").style("z-index", "99");
    var thisPositionX = outerPadding + i * innerPadding + i * fypDivWidth;
    fypDiv[i].position(thisPositionX, upperHeight + fypHeadHeight);
    //  fypDivMask[i].position(thisPositionX, upperHeight + fypHeadHeight);
    fypDiv[i].style("width", fypDivWidth + "px");
    //  fypDivMask[i].style("width", fypDivWidth + "px");
    fypDiv[i].style("position", "fixed");
    //  fypDivMask[i].style("position", "fixed");
    var fypDivHeight = canvasHeight - margins.top;
    fypDiv[i].style("height", fypDivHeight + "px");
    //  fypDivMask[i].style("height", fypDivHeight + "px");
  }


  //create divs for fyps content.
  for (var i = 0; i < fyps.length; i++) {
    //create the div for table of content.
    createDiv().id("fypContentDiv" + i).class("fyp-content").parent("fypDiv" + i);

    for (var j = 0; j < fyps[i].sections.length; j++) {
      //put the section titles on each cards,
      createDiv("<p class = 'section-title'><span class = 'section-title-bg'>" + fyps[i].sections[j].no + " " + fyps[i].sections[j].title + "</span></p>").id("sectionContentDiv" + i + j).parent("fypContentDiv" + i);
      if (fyps[i].sections[j].text != null) {
        createDiv(fyps[i].sections[j].text).class("section-content").parent("sectionContentDiv" + i + j);
      }

      for (var v = 0; v < fyps[i].sections[j].chapters.length; v++) {
        if (fyps[i].sections[j].chapters[v].no != null) {
          //then put the chapter titles under the section titles repectively.
          createDiv("<p class = 'chapter-title'><span class = 'chapter-title-bg'>" + fyps[i].sections[j].chapters[v].no + " " + fyps[i].sections[j].chapters[v].title + "</span></p>").id("chapterContentDiv" + i + j + v).parent("sectionContentDiv" + i + j);
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
  console.log(nodes);

  //create empty curretM array.
  currentM = new Array(13).fill(0);
  first_reach_element = new Array(9).fill(true);

  //scroll vars declares.
  max_scroll_height = $("#scroll-page").height() - screen_height - 5;
  for (var i = 0; i < cardNum; i++) {
    element_position[i] = $("#card" + i).offset().top;
    element_height[i] = $("#card" + i).height();
    activation_point[i] = element_position[i] - (screen_height * activation_offset);
  }
  manufacture_position = $("#card5").offset().top;
  manufacture_height = $("#card5").height();
  manufacture_activation_point = manufacture_position - (screen_height * manufacture_offset);
  // manufacture_activation_point2 = manufacture_position - (screen_height * manufacture_offset2);
  agriculture_position = $("#card7").offset().top;
  agriculture_height = $("#card7").height();
  agriculture_activation_point = agriculture_position - (screen_height * agriculture_offset);


  //initial all elments.
  shiftMode("texts", "quick");
  $("#menu").height(upperHeight);
  $("#menu").width(ww);
  $("#container, #upper").hide(); //hide all divs.
  $("#menu").hide();
  $(".hover-text").hide();
  $(".hover-text-bottom").hide();
  $(".fypDiv").hide();

  setCoverDiv();
  //skip to explore page.
  $("#toExplore").click(function() {
    //emptyNodes();
    hideAllTexts();
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
    textMode = true;
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


  // $("#test").textillate({
  //   in: {
  //     effect: 'fadeIn'
  //   }
  // });

  //color code.
  manufactureLineDark = color(53, 67, 54, 250);
  manufactureLine = color(111, 127, 111, 200);
  agricultureLineDark = color(246, 208, 46, 250);
  agricultureLine = color(217, 179, 97, 200);
  taskLineDark = color(146, 9, 3, 250);
  taskLine = color(181, 58, 48, 200);
  othersLineDark = color(146, 9, 3, 250);
  othersLine = color(181, 58, 48, 200);
  // othersLineDark = color(146, 9, 3, 250);
  // othersLine = color(181, 58, 48, 200);

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


  dialogBox();
}

function dialogBox() {
  //hover text to show infographics.
  $(".info-holder").hide();
  $("#gdp-growth").hover(function(e) {
    var top = e.pageY - $("#gdp-growth-card").height() - 30 + "px";
    var left = e.pageX - $("#gdp-growth-card").width() / 2 + "px";
    $("#gdp-growth-card").css({
      'position': 'absolute',
      'top': top,
      'left': left
    }).show();
  }, function() {
    $("#gdp-growth-card").hide();
  });

  $("#manufacturing1").hover(function(e) {
    var top = e.pageY - $("#manufacturing1-card").height() - 30 + "px";
    var left = e.pageX - $("#manufacturing1-card").width() / 2 + "px";
    $("#manufacturing1-card").css({
      'position': 'absolute',
      'top': top,
      'left': left
    }).show();
  }, function() {
    $("#manufacturing1-card").hide();
  });

  $("#manufacturing2").hover(function(e) {
    var top = e.pageY - $("#manufacturing2-card").height() - 30 + "px";
    var left = e.pageX - $("#manufacturing2-card").width() / 2 + "px";
    $("#manufacturing2-card").css({
      'position': 'absolute',
      'top': top,
      'left': left
    }).show();
  }, function() {
    $("#manufacturing2-card").hide();
  });

  $("#agriculture").hover(function(e) {
    var top = e.pageY - $("#agriculture-card").height() - 30 + "px";
    var left = e.pageX - $("#agriculture-card").width() / 2 + "px";
    $("#agriculture-card").css({
      'position': 'absolute',
      'top': top,
      'left': left
    }).show();
  }, function() {
    $("#agriculture-card").hide();
  });


}

//detect whether it is Downscrolled.
$(window).scroll(function(event) {
  var st = $(this).scrollTop();
  if (st > lastScrollTop) {
    IsDownscrolled = true;
  } else {
    IsDownscrolled = false;
  }
  lastScrollTop = st;
});


$(window).on("scroll", function() {
  y_scroll_pos = window.pageYOffset;

  for (var i = 0; i < cardNum; i++) {
    element_in_view[i] = (y_scroll_pos > activation_point[i]) && (y_scroll_pos < (element_position[i] + element_height[i]));
  }
  manufacture_in_view = (y_scroll_pos > manufacture_activation_point) && (y_scroll_pos < (manufacture_position + manufacture_height));
  // manufacture2_in_view = (y_scroll_pos > manufacture_activation_point2) && (y_scroll_pos < (manufacture_position + manufacture_height));
  agriculture_in_view = (y_scroll_pos > agriculture_activation_point) && (y_scroll_pos < (agriculture_position + agriculture_height));
})

var showAllTextsCtr = true;

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
        //  clear();
        emptyNodes();
        first_reach_element[2] = true;
        $(".text-content, section-content").removeClass("task-color");
        $(".fyp-content").css({
          "color": "rgba(153, 149, 132, 0.6)"
        });
        shiftMode("texts", "quick");
      }
      if (first_reach_element[1]) {
        first_reach_element[1] = false;
        first_reach_element[0] = true;
        textMode = true;
        titleMode = false;
        hideAllTexts();
        cover = false;
        $("#cover-bg").hide();
        $("#container, #upper").show();
        $(".fyp-content").css({
          "color": "rgba(153, 149, 132, 0.6)"
        });

      //  $(".section-title, .chapter-title").hide();
        //$(".fypDiv").slideDown(2000);
        $(".fypDiv").show();
        //shiftMode("texts", "slow"); // showing effect needs rethinking.
      }
    }

    if (y_scroll_pos > (element_position[1] + element_height[1]) && y_scroll_pos < activation_point[2] && IsDownscrolled) {
      //animationNodes("Task", 8);
      $(".fyp-content").css({
        "color": "rgba(153, 149, 132, 0.3)"
      });
      $(".section-title, .chapter-title").show();
      $(".section-content, .text-content").slideUp(1000);
    }

    if (y_scroll_pos > (element_position[1] + element_height[1]) && y_scroll_pos < activation_point[2] && !IsDownscrolled) {
      animationNodes("Task", 8);
    }

    if (element_in_view[2]) { // task 1. show task with lines.
      if (!first_reach_element[3]) { //upscrolled to task1.
        $(".task-highlight").removeClass("task-highlight-add");
        first_reach_element[3] = true;
      }
      if (first_reach_element[2]) {
        $(".section-content, .text-content").addClass("task-color");
        titleMode = true;
        textMode = false;
        shiftMode("titles", "quick");
        first_reach_element[1] = true;
        first_reach_element[2] = false;

      }
      animationNodes("Task", 8);
    }

    if (y_scroll_pos > (element_position[2] + element_height[2]) && y_scroll_pos < activation_point[3]) {
      animationNodes("Task", 8);
    }

    if (element_in_view[3]) { // task 2. show all the keywords.
      if (!first_reach_element[4]) { //upscrolled to task1.
        $(".text-content, section-content").removeClass("manufacturing-color");
        titleMode = true;
        textMode = false;
        shiftMode("titles", "quick");
        first_reach_element[4] = true;
      }
      if (first_reach_element[3]) {
        first_reach_element[3] = false;
        first_reach_element[2] = true;
      }
      animationNodes("Task", 8);
      $(".task-highlight").addClass("task-highlight-add"); //show task highlight words.
      //$(".text-highlight").removeClass("text-highlight-add"); //hide all other highlight words.
    }

    if (y_scroll_pos > (element_position[3] + element_height[3]) && y_scroll_pos < activation_point[4] && IsDownscrolled) {
      // $(".section-title, .chapter-title").show();
      // $(".section-content, .text-content").slideUp(1000);
      animationNodes("Task", 8);
    }

    if (element_in_view[4]) { // Manufacturing1. show all texts.
      if (!first_reach_element[5]) { //upscrolled to task1.
        first_reach_element[5] = true;
      }
      if (first_reach_element[4]) {
        first_reach_element[4] = false;
        first_reach_element[3] = true;
        $(".section-content, .text-content").removeClass("task-color");
        emptyNodes();
        textMode = true;
        titleMode = false;
        shiftMode("texts", "medium");

        highlightTexts("Manufacturing", "manufacturing-color");
      }

    }

    if (y_scroll_pos > (element_position[4] + element_height[4]) && y_scroll_pos < activation_point[5] && IsDownscrolled) {
      //  animationNodes("Manufacturing", 13);
      $(".section-title, .chapter-title").show();
      //$(".section-content, .text-content").slideUp(1000);
      $(".section-content, .text-content").hide();
    }

    if (y_scroll_pos > (element_position[4] + element_height[4]) && y_scroll_pos < activation_point[5] && !IsDownscrolled) {
      animationNodes("Manufacturing", 13);
    }

    if (element_in_view[5]) { // Manufacturing2. show titles and connections.
      if (!first_reach_element[6]) { //upscrolled to task1.
        //$(".text-content, section-content").removeClass("manufacturing-color"); //remove colored texts class.
        //  $(".text-content, section-content").removeClass("agriculture-color"); //remove colored texts class.
        //shiftMode("titles", "quick");
        first_reach_element[6] = true;
      }
      if (first_reach_element[5]) {
        titleMode = true;
        textMode = false;
        shiftMode("titles", "quick");
        first_reach_element[5] = false;
        first_reach_element[4] = true;


      }
      animationNodes("Manufacturing", 13);
    }

    if (manufacture_in_view) {

      if (first_reach_manufacture) {
        console.log("span1");
        $('.manufacture-highlight-span').markerAnimation({
          color: "rgb(255, 235, 59)",
          duration: "3.5s",
          thickness: "1em",
          padding_bottom: "0em",
          function: "linear"
        });
        // $('.manufacture-highlight-span2').markerAnimation({
        //   delay: '5s',
        //   color: "rgb(82, 95, 75)",
        //   duration: "8s",
        //   thickness: "1em",
        //   padding_bottom: "0em"
        // });
      }
      first_reach_manufacture = false;
    }

    if (y_scroll_pos > (element_position[5] + element_height[5]) && y_scroll_pos < activation_point[6] && IsDownscrolled) {
      animationNodes("Manufacturing", 13);
    }

    if (element_in_view[6]) { // agriculture1. show all texts , comparing with manufacture.
      if (!first_reach_element[7]) { //upscrolled to task1.
        first_reach_element[7] = true;
      }
      if (first_reach_element[6]) {
        first_reach_element[6] = false;
        first_reach_element[5] = true;
        emptyNodes();
        textMode = true;
        titleMode = false;
        shiftMode("texts", "medium");
        highlightTexts("Manufacturing", "manufacturing-color");
        highlightTexts("Agriculture", "agriculture-color");
      }
    }

    if (y_scroll_pos > (element_position[6] + element_height[6]) && y_scroll_pos < activation_point[7] && IsDownscrolled) {
      //  animationNodes("Manufacturing", 13);
      $(".section-title, .chapter-title").show();
      $(".section-content, .text-content").hide();
    }

    if (y_scroll_pos > (element_position[6] + element_height[6]) && y_scroll_pos < activation_point[7] && !IsDownscrolled) {
      animationNodes("Agriculture", 9);
    }


    if (element_in_view[7]) { // agriculture2. show titles and connections.
      if (first_reach_element[7]) {
        first_reach_element[7] = false;
        first_reach_element[6] = true;
        first_reach_element[8] = true;
        $(".text-content, section-content").removeClass("manufacturing-color"); //remove colored texts class.
        //  $(".text-content, section-content").removeClass("agriculture-color"); //remove colored texts class.
        titleMode = true;
        textMode = false;
        shiftMode("titles", "quick");
      }
      animationNodes("Agriculture", 9);
    }

    if (agriculture_in_view) {

      if (first_reach_agriculture) {

        $('.agriculture-highlight-span').markerAnimation({
          color: "rgb(255, 235, 59)",
          duration: "3s",
          thickness: "1em",
          padding_bottom: "0em"
        });

      }
      first_reach_agriculture = false;
    }

    if (y_scroll_pos > (element_position[7] + element_height[7]) && y_scroll_pos < activation_point[8]) {
      animationNodes("Agriculture", 9);
    }

    if (element_in_view[8]) { //jump to exlore page.
      //if (first_reach_element[8]) {
      //$(".fypDiv").show();
      $("#scroll-page").hide();
      $(".fyp-content").css({
        "color": "rgba(153, 149, 132, 0.6)"
      });
      $("#progress-container").hide();
      $(".text-content, section-content").removeClass("agriculture-color");

      textMode = true;
      titleMode = false;
      cover = false;
      hideAllTexts();
      shiftMode("texts", "medium");
      emptyNodes();
      $("#styled-bars").hide();

      $("#menu").show();
      //}
    }

    //explore page.
    if (isKeywords["Task"]) {
      drawingNodes("Task", 8, othersLineDark, othersLine);
      highlightNodes("Task", 8, "others-large", "others-medium");
    }

    if (isKeywords["Manufacturing"]) {
      drawingNodes("Manufacturing", 13, othersLineDark, othersLine);
      highlightNodes("Manufacturing", 8, "others-large", "others-medium");
    }

    if (isKeywords["Agriculture"]) {
      drawingNodes("Agriculture", 9, othersLineDark, othersLine);
      highlightNodes("Agriculture", 8, "others-large", "others-medium");
      //animationNodes("Agriculture", 9);
    }

    if (isKeywords["Defence"]) {
      drawingNodes("Defence", 6, othersLineDark, othersLine);
      highlightNodes("Defence", 8, "others-large", "others-medium");
    }

    if (isKeywords["Environment"]) {
      drawingNodes("Environment", 8, othersLineDark, othersLine);
      highlightNodes("Environment", 8, "others-large", "others-medium");
    }

    if (isKeywords["Tech"]) {
      drawingNodes("Tech", 8, othersLineDark, othersLine);
      highlightNodes("Tech", 8, "others-large", "others-medium");
    }

    if (isKeywords["Trade"]) {
      drawingNodes("Trade", 8, othersLineDark, othersLine);
      highlightNodes("Trade", 8, "others-large", "others-medium");
    }

    if (isKeywords["Health"]) {
      drawingNodes("Health", 6, othersLineDark, othersLine);
      highlightNodes("Health", 8, "others-large", "others-medium");
    }

    if (isKeywords["Democracy"]) {
      drawingNodes("Democracy", 7, othersLineDark, othersLine);
      highlightNodes("Democracy", 8, "others-large", "others-medium");
    }
  }
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

function shiftMode(s, speed) {
  if (s == "texts") {

    if (speed == "quick") {
      $(".fyp-content").css("transform", "scale(0.055)");
      $(".fyp-content").css("width", "1800%");
      $(".section-title, .chapter-title").hide();
      $(".section-content, .text-content").show();
    } else if (speed == "slow") {
    //  $(".fyp-content").css("transform", "scale(0.055)");
      //$(".fyp-content").css("width", "1800%");
      $(".section-title, .chapter-title").hide();
      //$(".fypDiv").slideDown(2000);
      $(".fypDiv").show();
    } else if (speed == "medium") {
      $(".fyp-content").css("transform", "scale(0.055)");
      $(".fyp-content").css("width", "1800%");
      $(".section-title, .chapter-title").hide();
      //$(".section-content, .text-content").slideDown(1000);
      $(".section-content, .text-content").show();
    }
  }
  if (s == "titles") {
    // $(".fyp-content").css("transform", "scale(0.08)");
    // $(".fyp-content").css("width", "1250%");
    // $(".section-content, .text-content").hide();
    if (speed == "quick") {
      $(".fyp-content").css("transform", "scale(0.08)");
      $(".fyp-content").css("width", "1250%");
      $(".section-content, .text-content").hide();
      $(".section-title, .chapter-title").show();
    } else if (speed == "slow") {
      // $(".fyp-content").animate({
      //      "transform": "scale(0.08)",
      //      "width": "1250%"
      // });
      //$(".fyp-content").addClass("animate");
      $(".fyp-content").css("transform", "scale(0.08)");
      $(".fyp-content").css("width", "1250%");
      $(".section-content, .text-content").hide();
      $(".section-title, .chapter-title").show();
      // $(".section-title, .chapter-title").animate({
      //     width: "show"
      // }, 1000);
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
        $("#sectionContentDiv" + i + j + " .section-content").slideDown(800);

        for (var c = 0; c < fyps[i].sections[j].chapters.length; c++) {
          //console.log("siiii");
          //  $("#chapterContentDiv" + i + j + c + " p").addClass("medium-s");
          //select(".text-content", "#chapterContentDiv" + i + j + c).show();
          $("#chapterContentDiv" + i + j + c + " .text-content").hide();
          $("#chapterContentDiv" + i + j + c + " .text-content").addClass(addc);
          $("#chapterContentDiv" + i + j + c + " .text-content").slideDown(800);
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
            $("#chapterContentDiv" + i + j + c + " .text-content").slideDown(800);
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
            addv.x = (nodeArray[j].endv[0].x + nodeArray[j + 1].startv[0].x) / 2 + 10;
          } else {
            addv.x = (nodeArray[j].endv[0].x + nodeArray[j + 1].startv.x) / 2 + 10;
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
      //  clearAnimation();
    });

    $("#manufacturing-star2").hover(function(e) {
      var top = e.pageY + 5 + "px";
      var left = e.pageX - 10 - hoverWidth + "px";
      $("#manufacture-text2").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("5s");
    }, function() {
      $("#manufacture-text2").hide();
      //  clearAnimation();
    });
  }, 800);


}

function textAnimation(sec) {
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
      //clearAnimation();
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
      console.log(">>>>?????");
      var top = e.pageY + "px";
      var left = e.pageX + 10 + "px";
      $("#defence-text1").css({
        'position': 'absolute',
        'top': top,
        'left': left
      }).show();
      textAnimation("2s");
    }, function() {
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
      //clearAnimation();
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
      textAnimation("3s");
    }, function() {
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
      textAnimation("3s");
    }, function() {
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
      textAnimation("3s");
    }, function() {
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
    var ty3 = $("#chapterContentDiv452").offset().top + 15;
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
  clear();
  clearAnimation();
  emptyNodes();
  $(".star").remove();
  $(".hover-text").hide();
  $(".hover-text-bottom").hide();
  // $(".text-highlight").removeClass("text-highlight-add");
  // $(".fyp-title").css("transform", "scale(0.08)");
  // $(".fyp-title").css("width", "1250%");
  titleMode = true;
  textMode = false;
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
  var nm = floor(random(100));
  var thisf = rawWords[nm];
  var valid = true;

  return new Word(thisf, x, y, n);
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() {
  scrollBar()
};

function scrollBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("upperBar").style.width = scrolled + "%";
}

function ease(p, g) {
  if (p < 0.5)
    return 0.5 * pow(2 * p, g);
  else
    return 1 - 0.5 * pow(2 * (1 - p), g);
}
