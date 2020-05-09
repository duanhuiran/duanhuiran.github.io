function Word(f, x, y, n) {
  this.no = n;
  this.x = x;
  this.y = y;
  this.size = floor(random(36));
  this.scale = random(6);
  this.lightness = random(50, 97);
  this.growing = true;
  this.text = f.Keyword;
  this.large = f.size;
  this.vanishing = true;


  this.grow = function() {
    // }
    if (this.large == "large") {
      this.size += 0.2;

    } else {
      this.size -= 0.2;
      if (this.size < 16) {
        this.reLocate();
      }
    }
  }


  this.show = function() {
    $("#div" + this.no).css({
      "font-size": this.size + "px",
      "color": "hsla(3, 95%," + this.lightness + "%, 0.8)"
    });

  }

  this.create = function() {
    createSpan(this.text).parent("cover-para").id("div" + this.no).addClass("text-div")
      .style("font-size", this.size + "px")
      .style("color", "hsla(3, 95%," + this.lightness + "%, 0.8)");
  }

  this.removeDiv = function() {
    $("#div" + this.no).remove();
  }

  this.reLocate = function() {
    this.lightness = random(50, 97);
    this.size = random(36);
    var num = floor(random(100));
    var changeWords = rawWords[num];
    $("#div" + this.no).css({
      "font-size": this.size + "px",
      "color": "hsla(3, 95%," + this.lightness + "%, 0.8)"
    }).text(changeWords.Keyword);
  }


}
