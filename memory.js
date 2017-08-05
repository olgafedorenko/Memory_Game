var score=0
var score1=0
var game_interval;
var MatchCounter
var t;
var level=0
var memory_arr=["./images/fish1.png","./images/fish2.png","./images/fish3.jpg","./images/fish4.png","./images/fish5.png","./images/fish1.png","./images/fish2.png","./images/fish3.jpg","./images/fish4.png","./images/fish5.png","./images/fish6.png","./images/fish6.png"]
$(function(){
    $("#container").hide();
    $("#timer").hide();
    $("#Level2").hide()
    $("#stop").hide()
    $(".reset").hide()
    $("#p").hide()
});

function set(key, value) { 
    localStorage.setItem(key, value);
} 
set("timer", 30)
function newBoard(){  
    randomizeImages()
    var guess1 = "";
    var guess2 = "";
    var count=0;
    MatchCounter = memory_arr.length/2
    var output=""
  
    for (var i=0; i<memory_arr.length; i++){
        
        output+='<div class="game">' +'<img src="' + memory_arr[i] + '"/>' +"</div>";
    }

    document.getElementById("container").innerHTML=output
    $("img").hide();                                                    

    $(".game").click(function(){
   
    if((count<2)&& ($(this).children("img").hasClass("face-up")) === false) {
        count++;
        $(this).children("img").show();
        $(this).children("img").addClass("face-up");
    
    if(count===1){
        guess1=$(this).children("img").attr("src")
        
    }
    else{
        guess2=$(this).children("img").attr("src")
     
        if(guess1===guess2){
             $(".game").children("img[src='" + guess2 + "']").addClass("match");
            score+=5
            
            document.getElementById("points").innerHTML=score+" Points"
            MatchCounter -=1
             
        }
        else{
            setTimeout(function() {
              $("img").not(".match").hide();
              $("img").not(".match").removeClass("face-up");
            }, 500);
            score-=2
            document.getElementById("points").innerHTML=score +" Points"
        }
    count = 0; 
      
    }
        
      if (MatchCounter === 0){
            set("score_value", score)
          
            window.clearInterval(t);
            $(".game").hide();
            $("#p").hide()
            $("#start").html("Try again").show()
            $("#stop").hide()
            $("#container").html("You have  " +score +" points" + "<br>" + '<img class="fish" src="' + "./images/happy_fish.png" + '"/>');

            MatchCounter = memory_arr.length/2
            level+=1
          if(level===1){
             $("#Level2").show() 
          }
        }
}

});

}

function randomizeImages(){
    Array.prototype.memory_shuffle=function(){
        var i=this.length, j , temp;
        while(--i){
            j=Math.floor(Math.random()*(i-1))

            temp=this[j];
            this[j]=this[i];
            this[i]=temp;
        }
    }
    memory_arr.memory_shuffle()
}


function updateTimer(MatchCounter){
    var isPaused = false;   
    var time = parseInt($("#timer").html());;
    var perform_task=function(){
            window.clearInterval(t);
            $("#timer").hide()
            $(".game").hide();
            $("#stop").hide()
            $("#points").hide()
            $("#p").hide()
            $("#start").html("Try again").show()
             $("#container").html("Game over" + "<br>" + " You have "+ score1 +" points" +"<br>" + '<img  src="' + "./images/fish_crying.gif" + '"/>');
            $( "#id_but" ).removeClass('buttons2').addClass('buttons');
            $("#start").removeClass('start').addClass("start1") 
     }   
    t = window.setInterval(function() {
        if(!isPaused) {
            $("#timer").html("Seconds: " + time).show()
            --time;
        }
        if ( time === 0 ){
            perform_task()
        }
    }, 1000);


    $('#p').click(function(e){
        if($(this).hasClass('pause')){
            e.preventDefault();
            isPaused = true;
            $(this).removeClass('pause');
            $(this).addClass('play');
            $("#p").html("Continue")
            $(".game").hide();
        }
        else{
         e.preventDefault();
            isPaused = false;
            $(this).addClass('pause');
            $(this).removeClass('play');
            $("#p").html("Pause")
            $(".game").show();
         }
      });
    $('#stop').on('click', function() {
        perform_task()
    });
}
function Start(){
    
    document.getElementById("timer").innerHTML= localStorage.getItem("timer")
    $("#container").show()
    //$("#timer").show()
    $("#logo").hide()
    $("#start").hide()
    $("#stop").show()
    $("#p").show()
    $("#points").show()
    $( "#id_but" ).removeClass('buttons').addClass('buttons2');
    $("#start").removeClass('start1').addClass("start")
    $("#start").html("Start")
    score=score1
    document.getElementById("points").innerHTML=score +" Points"
    updateTimer()
    newBoard()
    $("#points").show()
    
}

function level2(){
    
    memory_arr=["./images/car.jpg","./images/digger.jpg","./images/excavator2.jpg","./images/digger2.jpg","./images/excavator.jpeg","./images/sand_digger.jpg","./images/truck.jpeg","./images/truck2.jpg","./images/car.jpg","./images/digger.jpg","./images/excavator2.jpg","./images/digger2.jpg","./images/excavator.jpeg","./images/truck.jpeg","./images/truck2.jpg","./images/sand_digger.jpg"]
    $("#container").show() 
    $("#Level2").hide()
    $("#points").show()
    score1 = localStorage.getItem("score_value")
    score=score1
    set("timer", 45)
    Start()
}