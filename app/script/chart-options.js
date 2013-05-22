var themeOptions = {
    colors: [
        '#058DC7', 
        '#50B432', 
        '#ED561B', 
        '#DDDF00', 
        '#24CBE5', 
        '#64E572', 
        '#FF9655', 
        '#FFF263', 
        '#6AF9C4'
    ],
    chart: {
        renderTo: 'chartContainer',
        borderWidth: 1,
        borderColor: 'rgba(200,200,200,0.9)',
        plotBackgroundColor: 'rgba(255, 255, 255, .9)',
        plotShadow: true,
        plotBorderWidth: 1,
        type: "spline",
        zoomType: 'xy'
    },
    title: {
        style: {
            color: '#000',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    subtitle: {
        style: {
            color: '#666666',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    xAxis: {
        gridLineWidth: 1,
        lineColor: '#000',
        tickColor: '#000',
        labels: {
            style: {
                color: '#000',
                font: '11px Trebuchet MS, Verdana, sans-serif'
            }
        },
        title: {
            style: {
                color: '#333',
                fontWeight: 'bold',
                fontSize: '12px',
                fontFamily: 'Trebuchet MS, Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        minorTickInterval: 'auto',
        lineColor: '#000',
        lineWidth: 1,
        tickWidth: 1,
        tickColor: '#000',
        labels: {
            style: {
                color: '#000',
                font: '11px Trebuchet MS, Verdana, sans-serif'
            }
        },
        title: {
            style: {
                color: '#333',
                fontWeight: 'bold',
                fontSize: '12px',
                fontFamily: 'Trebuchet MS, Verdana, sans-serif'
            }
        }
    },
    legend: {
        align: 'right',
        verticalAlign: 'top',
        x: 0,
        y: 50,
        layout: 'vertical',
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: 'black'
        },
        itemHoverStyle: {
            color: '#039'
        },
        itemHiddenStyle: {
            color: 'gray'
        }
    },
    labels: {
        style: {
            color: '#99b'
        }
    },
    navigation: {
        buttonOptions: {
            theme: {
                stroke: '#CCCCCC'
            }
        }
    },
    plotOptions: {
        series: {
            marker: {
                enabled: false
            }
        }
    },
    exporting: {
        sourceHeight: 500,
        sourceWidth: 950
    }
};
//@ sourceMappingURL=chart-options.js.map
