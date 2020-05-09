//check localstorage max score
var last_scores = [];

if (localStorage.getItem('max_score') == null){
  localStorage.setItem('max_score',0);
  localStorage.setItem('last_scores', json.stringify(last_scores));
}

//show player max score
$('#user_max_score').text(localStorage.getItem('max_score'));
