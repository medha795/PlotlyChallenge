function guage(wash_freq){
    // Enter a speed between 0 and 180
    var level = wash_freq*20;

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
    // Path: may have to change to create a better triangle
    var mainPath = path1,
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
    x: [0], y:[0],
        marker: {size: 14, color:'850000'},
        showlegend: false,
        name: ' Wash per Week',
        text: wash_freq,
        hoverinfo: 'text+name'},
    { values: [1,1,1,1,1,1,1,1,1,9],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['#83b588', '#88bc8d', '#8ac085', '#b7cd8f', '#d5e59a', '#e5e8b1', '#e9e7c9',
                            '#f4f1e4', '#f8f3ec', '#ffffff']},
    hoverinfo: 'text',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];

    var layout = {
        title: '<b>Belly Button Wash Frequency</b> <br> Scrubs per Week',
        "titlefont": {
            "size": 16,
          },
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
            color: '850000'
        }
        }],
    height: 400,
    width: 400,
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);
};