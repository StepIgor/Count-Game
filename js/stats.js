var ctx = document.getElementById('stat_chart').getContext('2d');
var stat_chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['#1', '#2', '#3', '#4', '#5'],
        datasets: [{
            label: 'Верных ответов',
            data: JSON.parse(localStorage.getItem('last_scores')),
            backgroundColor: [
                'rgba(255, 106, 0, 0.2)',
                'rgba(255, 106, 0, 0.2)',
                'rgba(255, 106, 0, 0.2)',
                'rgba(255, 106, 0, 0.2)',
                'rgba(255, 106, 0, 0.2)'
            ],
            borderColor: [
                'rgba(255, 106, 0, 1)',
                'rgba(255, 106, 0, 1)',
                'rgba(255, 106, 0, 1)',
                'rgba(255, 106, 0, 1)',
                'rgba(255, 106, 0, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }]
        }
    }
});
