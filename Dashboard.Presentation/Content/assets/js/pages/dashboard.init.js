var options = {
    chart: {
        height: 300,
        type: "bar",
        stacked: !0,
        toolbar: {
            show: !1
        },
        zoom: {
            enabled: !0
        }
    },
    plotOptions: {
        bar: {
            horizontal: !1,
            columnWidth: "15%",
            endingShape: "rounded"
        }
    },
    dataLabels: {
        enabled: !1
    },
    series: [{
        name: "Tuyến dưới",
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
    }, {
        name: "Android",
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
    }, {
        name: "IOS",
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
    }],
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    colors: ["#556ee6", "#f1b44c", "#34c38f"],
    legend: {
        position: "bottom"
    },
    fill: {
        opacity: 1
    }
},
    chart = new ApexCharts(document.querySelector("#stacked-column-chart"), options);
chart.render();
