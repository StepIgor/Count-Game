//check localstorage max score
var last_scores = [0,0,0,0,0];

if (localStorage.getItem('max_score') == null){
  localStorage.setItem('max_score',0);
  localStorage.setItem('last_scores', JSON.stringify(last_scores));
}

var shows_now = 0;

//show player max score
$(document).ready(function(){
  show_result = setInterval(function(){
    if (localStorage.getItem('max_score') == null){clearInterval(show_result);}
    if (shows_now != localStorage.getItem('max_score')){
      shows_now++;
      $('#user_max_score').text(shows_now);
    } else {
      clearInterval(show_result);
    }
  },30);
});


//start game button
document.getElementById('start_game_but').addEventListener('click', function(){
  this.style.visibility = 'hidden';
  var audio = new Audio();
  audio.preload = 'auto';
  audio.src = 'snd/play_but.wav';
  audio.play();
  setTimeout(function(){document.location.href = 'play.html'}, 2000);
});

document.getElementById('go_to_stats').addEventListener('click', function(){
  this.style.visibility = 'hidden';
  var audio = new Audio();
  audio.preload = 'auto';
  audio.src = 'snd/stats_but.wav';
  audio.play();
  setTimeout(function(){document.location.href = 'stats.html'}, 750);
});
