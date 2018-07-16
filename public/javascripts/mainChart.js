plotAllGraphs();
async function plotAllGraphs() {
    await plotGraph("payment", "chart1");
    await plotGraph("refund", "chart2");
}

$.getJSON('/notifications', { name: "all" }, function (results) {
    Highcharts.chart('chart5', {
    chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Real Time Event Monitor'
    },
    legend: {
        layout: 'vertical',
        align: 'center',
        verticalAlign: 'bottom',
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    xAxis: {
        categories: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],
    },
    yAxis: {
        title: {
            text: 'Events Count'
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' units'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{
        name: 'event1',
        data: [3, 4, 3, 5, 4, 10, 12]
    }, {
        name: 'event2',
        data: [1, 3, 4, 3, 3, 5, 4]
    }]
    });
});
function plotGraph(eventCategory, chartId) {
    var graph = {
        name: eventCategory,
    };
    $.getJSON('/notifications', graph, function (results) {
        var totalPayment = Object.values(results.paymentDetail).reduce((a,b) => a + b, 0);
        Highcharts.chart(chartId, {
        chart: {
            type: 'areaspline'
        },
        title: {
            text: '<b>Payment</b>',
        },
        legend: {
            layout: 'vertical',
            align: 'center',
            verticalAlign: 'top',
            // x: 150,
            // y: 100,
            // floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        labels: {
                enabled: false
            },
        xAxis: {
            categories: Object.keys(results.paymentDetail),
            
        },
        yAxis: {
            title: {
                text: 'Amount Captured'
            }
        },
        tooltip: {
            shared: true,
            formatter: function() { 
                return 'Date: <b>' + this.x + '</b><br>Amount: <b>'+ this.y + ' Dollars</b>';
                }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'Total Amount = ' + totalPayment,
            data: Object.values(results.paymentDetail),
        },]

        });
    });
}
