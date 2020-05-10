var shows_now = 0;

if (sessionStorage.getItem('last_result') == null){ sessionStorage.setItem('last_result', 0) == null; }

$(document).ready(function(){
  show_result = setInterval(function(){
    if (shows_now != sessionStorage.getItem('last_result')){
      shows_now++;
      $('#last_result').text(shows_now);
    } else {
      clearInterval(show_result);
    }
  },30);

  $('#my_record').text(localStorage.getItem('max_score'));
  $('#previous_result').text(JSON.parse(localStorage.getItem('last_scores'))[4]);

  if (sessionStorage.getItem('last_result') > localStorage.getItem('max_score')){
    $('#record_diff').text('+' + (sessionStorage.getItem('last_result') - localStorage.getItem('max_score')));
    document.getElementById('record_diff').classList.add('green-text');
  } else if (sessionStorage.getItem('last_result') == localStorage.getItem('max_score')){
    $('#record_diff').text(0);
  } else {
    $('#record_diff').text(sessionStorage.getItem('last_result') - localStorage.getItem('max_score'));
    document.getElementById('record_diff').classList.add('red-text');
  }

  if (sessionStorage.getItem('last_result') > JSON.parse(localStorage.getItem('last_scores'))[4]){
    $('#previous_diff').text('+' + (sessionStorage.getItem('last_result') - JSON.parse(localStorage.getItem('last_scores'))[4]));
    document.getElementById('previous_diff').classList.add('green-text');
  } else if (sessionStorage.getItem('last_result') == JSON.parse(localStorage.getItem('last_scores'))[4]){
    $('#previous_diff').text(0);
  } else {
    $('#previous_diff').text(sessionStorage.getItem('last_result') - JSON.parse(localStorage.getItem('last_scores'))[4]);
    document.getElementById('previous_diff').classList.add('red-text');
  }

  if (sessionStorage.getItem('last_result') > localStorage.getItem('max_score')){
    localStorage.setItem('max_score', sessionStorage.getItem('last_result'));
    $('#new_record').css({'display':'block'});
  }

  var lst_scores = JSON.parse(localStorage.getItem('last_scores'));

  for (k = 0; k<= 3; k++){
    lst_scores[k] = lst_scores[k+1];
  }
  lst_scores[4] = parseInt(sessionStorage.getItem('last_result'));

  localStorage.setItem('last_scores', JSON.stringify(lst_scores));

});

document.getElementById('to_menu_but').addEventListener('click',function(){
  this.style.visibility = 'hidden';
  var audio = new Audio();
  audio.preload = 'auto';
  audio.src = 'snd/stats_but.wav';
  audio.play();
  setTimeout(function(){document.location.href = 'index.html'}, 2000);
});
