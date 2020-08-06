
function trafficWeekdays(mon, tue, wed, thu, fri, sat, sun) {
    /* chart.js chart examples */

    // chart colors
    var colors = [
        '#007bff', //blue
        '#28a745', //green
        '#333333', //dark-gray
        '#c3e6cb', //pastell green
        '#dc3545', //cherry red
        '#6c757d'  //gray
    ];

    /* large line chart */
    var chLine = document.getElementById("loginweekday");
    var chartData = {
        labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
        datasets: [{
            data: [mon, tue, wed, thu, fri, sat, sun],
            backgroundColor: 'transparent',
            borderColor: colors[0],
            borderWidth: 4,
            pointBackgroundColor: colors[0]
        }, 
        {
            data: [mon, tue, wed, thu, fri, sat, sun],
            backgroundColor: colors[3],
            borderColor: colors[1],
            borderWidth: 4,
            pointBackgroundColor: colors[1]
        }]
    };

    if (chLine) {
        new Chart(chLine, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });
    }
}

function timeLineChart(
    array1 = [0, 0, 0, 0, 0, 0, 0],
    array2 = [0, 0, 0, 0, 0, 0, 0]
) {
    /* chart.js chart examples */

    // chart colors
    var colors = [
        '#007bff', //blue
        '#28a745', //green
        '#333333', //dark-gray
        '#c3e6cb', //pastell green
        '#dc3545', //cherry red
        '#6c757d'  //gray
    ];

    /* large line chart */
    var chLine = document.getElementById("chLine");
    var chartData = {
        labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
        datasets: [{
            data: array1,
            backgroundColor: 'transparent',
            borderColor: colors[0],
            borderWidth: 4,
            pointBackgroundColor: colors[0]
        },
        {
            data: array2,
            backgroundColor: colors[3],
            borderColor: colors[1],
            borderWidth: 4,
            pointBackgroundColor: colors[1]
        }]
    };

    if (chLine) {
        new Chart(chLine, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });
    }
}

function doughnutChart(id = "doughnutChart", admin = 0, service = 0, helper = 0) {
    var doughnutChart = document.getElementById(id).getContext('2d');

    var myDoughnutChart = new Chart(doughnutChart, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [admin, service, helper],
                backgroundColor: [
                    '#f3545d',//red
                    '#fdaf4b',//Yellow
                    '#1d7af3']//Blue
            }],

            labels: [
                'Admin',
                'Service',
                'Helper'
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                position: 'bottom'
            },
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 40
                }
            }
        }
    });
}
