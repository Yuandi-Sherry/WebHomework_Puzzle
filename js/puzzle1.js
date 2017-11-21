var totalRow = 4;
var lastIndex = totalRow - 1;
var total = totalRow*totalRow - 1;
var step = 0;
var start = 0;
var time = 0;
var width = 400/totalRow;
var play = 0;
var pic = "img/p1.jpg";
$(document).ready(function(){
    $("#play").click(function () {
        if(play == 0) {
            $(".part").remove();
              $("#Tused").text(0);
              $("#Sused").text(0);
              $("#start").text("Restart");
              $("#play").text("OK");

            initialize(totalRow,totalRow);
            for(var i = 0; i < 50 || ($("#part" + lastIndex + lastIndex).attr("currentX") !=  lastIndex 
                || $("#part" + lastIndex + lastIndex).attr("currentY") !=  lastIndex) ; i++) {
                shuffle();
            }
            directSet(300);
            start = 1;    
            time = window.setInterval(timeFly, 1000);
            step = 0;
            play = 1;
        }
        $("#info").hide(300);
        
    });

    //startClick: initialize() + shuffle()
    $("#start").click(function () {
        if(play == 1) {
            start = 1;    
            //new puzzle
            $(".part").remove();
            initialize(totalRow,totalRow);
            for(var i = 0; i < 50 || ($("#part" + lastIndex + lastIndex).attr("currentX") !=  lastIndex 
                || $("#part" + lastIndex + lastIndex).attr("currentY") !=  lastIndex) ; i++) {
                shuffle();
            }
            directSet(300);
            //new label
              $("#Tused").text(0);
              $("#Sused").text(0);
              $("#start").text("Restart");

            //new data
            step = 0;
            clearInterval(time);
            $("#Tused").text(0);
            time = window.setInterval(timeFly, 1000);
        }
    });

    //resetClick: initialize()
    $("#reset").click(function () {
        if(play == 1) {
        	start = 0;
            for(var i = 0; i <= total; i++) {
	    		var tempX = $("#part" +  parseInt(i/totalRow) + i%totalRow). attr("currentX");
	    		var tempY = $("#part" +  parseInt(i/totalRow) + i%totalRow). attr("currentY");
	    		//alert(i);
	    		$("#part" +  parseInt(i/totalRow) + i%totalRow)
	    		.animate({top: '-=' + (parseInt(tempX)-parseInt(i/totalRow))*width+"px"
		            ,left: '-=' + (parseInt(tempY)-i%totalRow)*width+"px"}, 300)
	    		.attr("currentX",parseInt(i/totalRow))
	    		.attr("currentY",i%totalRow);

    		}
            step = 0;
            $("#Sused").text(step);        
            //initialize(totalRow,totalRow);
            start = 0;
            clearInterval(time);
            $("#Tused").text(0);
            $("#start").text("Start");
        }
    });    

    $("#gamePart").on('click','.part', function () {//move in game
        if(start == 1) {
            if((parseInt($(this).attr("currentY")) == parseInt($("#part" + lastIndex + lastIndex).attr("currentY")))
            && (parseInt($(this).attr("currentX")) - parseInt($("#part" + lastIndex + lastIndex).attr("currentX")) == 1
            ||parseInt($(this).attr("currentX")) - parseInt($("#part" + lastIndex + lastIndex).attr("currentX")) == -1)) {
                //alert(this.id);
                swap2(parseInt($(this).attr("currentX")),parseInt($(this).attr("currentY")),
                    parseInt($("#part" + lastIndex + lastIndex).attr("currentX")),parseInt($("#part" + lastIndex + lastIndex).attr("currentY")),300);
                step++;
            }
            //left & right
            if((parseInt($(this).attr("currentX")) == parseInt($("#part" + lastIndex + lastIndex).attr("currentX")))
                && (parseInt($(this).attr("currentY")) - parseInt($("#part" + lastIndex + lastIndex).attr("currentY")) == -1
                ||parseInt($(this).attr("currentY")) - parseInt($("#part" + lastIndex + lastIndex).attr("currentY")) == 1)) {
                swap2(parseInt($(this).attr("currentX")),parseInt($(this).attr("currentY")),
                    parseInt($("#part" + lastIndex + lastIndex).attr("currentX")),parseInt($("#part" + lastIndex + lastIndex).attr("currentY")),300);
                step++;
            }
            
            $("#Sused").text(step);
            win();
        }
        else {
            $("#alertWindow").text("Click START so that you can move the puzzle.");
            $("#info").show(300);
        }
        
    });

    $("#difficulty").on('click',".difficulty",function () {
        if(start == 0) {
            if($(this).attr("id") == "easy")
                totalRow = 3;
            if($(this).attr("id") == "medium")
                totalRow = 4;
            if($(this).attr("id") == "difficult")
                totalRow = 5;
            lastIndex = totalRow - 1;
            total = totalRow*totalRow - 1;
            width = 400/totalRow;    
            $(".part").remove();
            initialize(totalRow,totalRow);
        }
        else {
            $("#alertWindow").text("You can't change the difficulty level when IN THE GAME. (RESET to do it)");
            $("#info").show(300);
        }
    });
   
    $("img").click (function () {
        if(start == 0) {
            pic = $(this).attr("src");
            $(".part").remove();
            initialize(totalRow,totalRow);
        }
        else {
            $("#alertWindow").text("You can't change the picture when IN THE GAME. (RESET to do it)");
            $("#info").show(300);
        }
        
    })

     //func: reset == initialize
    function initialize(totalRow,totalRow) {
        for(var i = 0; i < total; i++) {
            addNewPart(parseInt(i/totalRow), i%totalRow);
        }
        //add blank part
        $("#gamePart").prepend("<div class = \"part\" id = \"part" + lastIndex + lastIndex + "\"></div>");
        $("#part" + lastIndex + lastIndex).attr("currentX", totalRow - 1)
            .attr("currentY",totalRow - 1)
            .css("position", "absolute")
            .css("top", (totalRow - 1)*width + "px")
            .css("left", (totalRow - 1)*width + "px")
            .css("width", width+"px")
            .css("height", width+"px")
            .css("background", "none")
            .css("box-shadow", "0 0px 0px 0px #F36EA2 inset");
        // for each part
        // id: "partxy", mark initial position
        // currentX, currentY: mark current position
        // css: "top" following X, "left" following Y
        // css: "background"  adjusting the position and scale of the picture on each part
    }

    function addNewPart(x,y) {
        $("#gamePart").prepend("<div class = \"part\" id = \"part"+ x + y + "\"></div>");
        $("#part"+x+y).attr("currentX", x)
            .attr("currentY",y)
            .css("position", "absolute")
            .css("top", width*x+"px")
            .css("left", width*y+"px")
            .css("width", width+"px")
            .css("height", width+"px")
            .css("background", "url(" + pic +") " + width + "px " + width + "px")
            .css("background-position", y*(-width) + "px " + x*(-width) +"px");
    }

    function swap1(part1X, part1Y, part2X, part2Y, second) {
        var temp1X = -1, temp1Y = -1,temp2X = -1, temp2Y = -1;

        //locate Part1
        for(var i = 0; i <= total; i++) {
            if($("#part" + parseInt(i/totalRow) + i%totalRow).attr("currentX") ==  part1X 
                && $("#part" + parseInt(i/totalRow) + i%totalRow).attr("currentY") == part1Y ) {
                temp1X = parseInt(i/totalRow);
                temp1Y = i%totalRow;
            }
        }
        //locate Part2
        for(var i = 0; i <= total; i++) {
            if($("#part" + parseInt(i/totalRow) + i%totalRow).attr("currentX") == part2X 
                && $("#part" + parseInt(i/totalRow) + i%totalRow).attr("currentY") == part2Y ) {
                temp2X = parseInt(i/totalRow);
                temp2Y = i%totalRow;
            }
        }

        $("#part" + temp1X + temp1Y)
            .attr("currentX", part2X) 
            .attr("currentY", part2Y);
        $("#part" + temp2X + temp2Y)
            .attr("currentX", part1X) 
            .attr("currentY", part1Y);
          // directSet(0);

    }

    function directSet(second) {
    	for(var i = 0; i <= total; i++) {
    		var tempX = parseInt($("#part" +  parseInt(i/totalRow) + i%totalRow). attr("currentX"));
    		var tempY = parseInt($("#part" +  parseInt(i/totalRow) + i%totalRow). attr("currentY"));
    		
    		$("#part" +  parseInt(i/totalRow) + i%totalRow)
    		.animate({top: '+=' + (parseInt(tempX)-parseInt(i/totalRow))*width+"px"
	            ,left: '+=' + (parseInt(tempY)-i%totalRow)*width+"px"}, second);
    	}
    }
    //func: swap 2 parts
    function swap2(part1X, part1Y, part2X, part2Y, second) {
        var temp1X = -1, temp1Y = -1,temp2X = -1, temp2Y = -1;

        //locate Part1
        for(var i = 0; i <= total; i++) {
            if($("#part" + parseInt(i/totalRow) + i%totalRow).attr("currentX") ==  part1X 
                && $("#part" + parseInt(i/totalRow) + i%totalRow).attr("currentY") == part1Y ) {
                temp1X = parseInt(i/totalRow);
                temp1Y = i%totalRow;
            }
        }
        //locate Part2
        for(var i = 0; i <= total; i++) {
            if($("#part" + parseInt(i/totalRow) + i%totalRow).attr("currentX") == part2X 
                && $("#part" + parseInt(i/totalRow) + i%totalRow).attr("currentY") == part2Y ) {
                temp2X = parseInt(i/totalRow);
                temp2Y = i%totalRow;
            }
        }

        $("#part" + temp1X + temp1Y)
            .attr("currentX", part2X) 
            .attr("currentY", part2Y)
            .animate({top: '-=' + (part1X - part2X)*width+"px"
            }, second)
            .animate({left: '-=' + (part1Y - part2Y)*width+"px"
            }, second);
        $("#part" + temp2X + temp2Y)
            .attr("currentX", part1X) 
            .attr("currentY", part1Y)
            .animate({top: '-=' + (part2X - part1X)*width+"px"
            }, second)
            .animate({left: '-=' + (part2Y - part1Y)*width+"px"
            }, second);

    }
    //func: shuffle
    function shuffle() {
        // random [0:up, 1:down, 2:left, 3:right]
        var random = parseInt(Math.random() * 4);
        switch (random) {
            case 0:
            //swap with up
            if($("#part" + lastIndex + lastIndex).attr("currentX") != 0) {
                //locate up
                swap1(parseInt($("#part" + lastIndex + lastIndex).attr("currentX")), parseInt($("#part" + lastIndex + lastIndex).attr("currentY")),
                    parseInt($("#part" + lastIndex + lastIndex).attr("currentX")) - 1, parseInt($("#part" + lastIndex + lastIndex).attr("currentY")),0);
            }
            break;
            case 1:
            //swap with down
            if($("#part" + lastIndex + lastIndex).attr("currentX") != lastIndex) {
                swap1(parseInt($("#part" + lastIndex + lastIndex).attr("currentX")), parseInt($("#part" + lastIndex + lastIndex).attr("currentY")),
                    parseInt($("#part" + lastIndex + lastIndex).attr("currentX")) + 1, parseInt($("#part" + lastIndex + lastIndex).attr("currentY")),0);
            }
            break;
            case 2:
            //swap with left
            if($("#part" + lastIndex + lastIndex).attr("currentY") != 0) {
                swap1(parseInt($("#part" + lastIndex + lastIndex).attr("currentX")), parseInt($("#part" + lastIndex + lastIndex).attr("currentY")),
                    parseInt($("#part" + lastIndex + lastIndex).attr("currentX")), parseInt($("#part" + lastIndex + lastIndex).attr("currentY")-1),0);
            }
            break;
            case 3:
            //swap with right
            if($("#part" + lastIndex + lastIndex).attr("currentY") != lastIndex) {
                swap1(parseInt($("#part" + lastIndex + lastIndex).attr("currentX")), parseInt($("#part" + lastIndex + lastIndex).attr("currentY")),
                    parseInt($("#part" + lastIndex + lastIndex).attr("currentX")), parseInt($("#part" + lastIndex + lastIndex).attr("currentY"))+1,0);
            }
            break;
        }
    }

    function win() {
        //judge win
        for(var i = 0; i <= total; i++) {
            if($("#part" + parseInt(i/totalRow) + i%totalRow).attr("currentX") ==  parseInt(i/totalRow) 
                && $("#part" + parseInt(i/totalRow) + i%totalRow).attr("currentY") == i%totalRow ) {
            }
            else {
                return;
            }
        }
        //when win
        start = 0;
        $("#alertWindow").html("CONGRATULTION!<br>You win with " + step + " steps in " + $('#Tused').text() + " seconds.");
        $("#play").text("OK");
        $("#info").show(300);
        $("#start").text("Start");
        clearInterval(time);
    }

    function timeFly() {
        var currentTime =  parseInt($('#Tused').text());
        currentTime++;
        $('#Tused').text(currentTime);
    }

});
