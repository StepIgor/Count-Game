//preparing
var score = 0;
var warmup_seconds = 3;
var game_timer = 100;
var lost = false;
var validated = false;

//tasks
var num1 = 0;
var num2 = 0;
var result = 0;
var action = 0;
var valid_id = 0;

//warmup seconds
var audio_prep = new Audio();
audio_prep.preload = 'auto';
audio_prep.src = 'snd/prepare.wav';
//you dont have time!
var audio_time = new Audio();
audio_time.preload = 'auto';
audio_time.src = 'snd/time.wav';
//game over
var audio_over = new Audio();
audio_over.preload = 'auto';
audio_over.src = 'snd/over.wav';
//valid answer
var valid_answ_audio = new Audio();
valid_answ_audio.preload = 'auto';
valid_answ_audio.src = 'snd/valid.wav';

document.getElementById('black_screen').addEventListener('click',function(){
  $('#prepate_tip').text('Подготовьтесь...');
  $('#prepare_seconds').text(warmup_seconds);
  audio_prep.play();
  hide_scr = setInterval(function(){
    warmup_seconds -= 1;
    if (warmup_seconds != -1){
      $('#prepare_seconds').text(warmup_seconds);
      audio_prep.play();
    }
    if (warmup_seconds == -1){
      document.getElementById('black_screen').style.display = 'none';
      clearInterval(hide_scr);
      start_game();
    }
  },1000);
});


//game engine
function start_game(){
  generate_task();
  game_timer_int = setInterval(function(){
    game_timer -= 1;
    $('#timer_line').css({'width':game_timer + '%'});
    $('#time_show').text(game_timer);
    if (game_timer == 20){
      document.getElementById('timer_line').classList.add('red');
      document.getElementById('timer_line').classList.remove('orange');
      document.getElementById('time_show').classList.remove('orange-text');
      document.getElementById('time_show').classList.add('red-text');
      audio_time.play();
    }
    if (game_timer == 10 || game_timer == 5) audio_time.play();
    if (game_timer == 0){
      audio_over.play();
      lost = true;
      sessionStorage.setItem('last_result', score);
      setTimeout(function(){document.location.href = 'gameover.html'},2000);
      clearInterval(game_timer_int);
    }
  },1000);
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function generate_task(){
  document.getElementById('place_1').style.background = '#fff';
  document.getElementById('place_2').style.background = '#fff';
  document.getElementById('place_3').style.background = '#fff';
  document.getElementById('place_4').style.background = '#fff';

  action = randomInteger(1,4);
  valid_id = randomInteger(1,4);
  fake_answers = [0,0,0];
  fake_step = 0;

  if (action == 1){
    //plus
    num1 = randomInteger(0,99);
    num2 = randomInteger(0,99);

    result = num1 + num2;

    $('#solve').text(num1 + ' + ' + num2);

    while (fake_step != 3){
      new_el = result + randomInteger(-15,15);
      if (fake_answers.indexOf(new_el) == -1 && new_el != result){
        fake_answers[fake_step] = new_el;
        fake_step++;
      }
    }

  } else if (action == 2){
    //minus
    num1 = randomInteger(0,99);
    num2 = randomInteger(0,99);

    result = num1 - num2;

    $('#solve').text(num1 + ' - ' + num2);

    while (fake_step != 3){
      new_el = result + randomInteger(-15,15);
      if (fake_answers.indexOf(new_el) == -1 && new_el != result){
        fake_answers[fake_step] = new_el;
        fake_step++;
      }
    }

  } else if (action == 3){
    //multiply
    num1 = randomInteger(0,10);
    num2 = randomInteger(0,99);

    result = num1 * num2;

    $('#solve').text(num1 + ' * ' + num2);

    while (fake_step != 3){
      what_to_do = randomInteger(0,1);
      if (what_to_do == 0){
        new_el = result + randomInteger(-15,15);
        if (fake_answers.indexOf(new_el) == -1 && new_el != result){
          fake_answers[fake_step] = new_el;
          fake_step++;
        }
      } else {
        new_el = (num1 + randomInteger(-3,3)) * num2;
        if (fake_answers.indexOf(new_el) == -1 && new_el != result){
          fake_answers[fake_step] = new_el;
          fake_step++;
        }
      }

    }

  } else {
    //divide
    num1 = randomInteger(0,99);
    num2 = randomInteger(0,99);

    result = Math.floor(num1 / num2);

    $('#solve').text(num1 + ' / ' + num2);

    while (fake_step != 3){
      what_to_do = randomInteger(0,1);
      if (what_to_do == 0){
        new_el = result + randomInteger(-15,15);
        if (fake_answers.indexOf(new_el) == -1 && new_el != result){
          fake_answers[fake_step] = new_el;
          fake_step++;
        }
      } else {
        new_el = (num1 + randomInteger(-3,3)) * num2;
        if (fake_answers.indexOf(new_el) == -1 && new_el != result){
          fake_answers[fake_step] = new_el;
          fake_step++;
        }
      }

    }

  }

  step = 0;

  for (k = 1; k<= 4; k++){
    if (k!= valid_id){
      $('#answ_'+k).text(fake_answers[step]);
      step++;
    }
  }
  $('#answ_'+valid_id).text(result);
}

function give_answer(id){
  if (lost == true || validated == true){ return; }
  if (id.split('_')[1] == valid_id){
    validated = true;
    score++;
    $('#score_show').text(score);
    document.getElementById('place_'+id.split('_')[1]).classList.add('green');
    valid_answ_audio.play();
    setTimeout(function(){generate_task(); document.getElementById('place_'+id.split('_')[1]).classList.remove('green'); validated = false;},750);
  } else {
    lost = true;
    sessionStorage.setItem('last_result', score);
    document.getElementById('place_'+id.split('_')[1]).classList.add('red');
    audio_over.play();
    setTimeout(function(){document.location.href = 'gameover.html'},2000);
    clearInterval(game_timer_int);
  }
}
