var vg_1 = "charts/line_chart.json";
vegaEmbed("#chart-income-time", vg_1).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);

var vg_2 = "charts/household_growth.json";
vegaEmbed("#chart-household-growth", vg_2).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);

var vg_3 = "charts/income_map.json";
vegaEmbed("#chart-income-map", vg_3).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);