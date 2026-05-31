var embedOptions = { actions: false };
var linkedStateViews = {};
var selectedLinkedState = null;

function setLinkedState(state) {
    selectedLinkedState = state;
    Object.values(linkedStateViews).forEach(function(view) {
        if (view) {
            view.signal("selectedState", state).runAsync();
        }
    });
}

function attachLinkedStateInteraction(key, view) {
    linkedStateViews[key] = view;
    view.signal("selectedState", selectedLinkedState).runAsync();
    view.addEventListener("click", function(event, item) {
        var clickedState = item && item.datum && item.datum.state ? item.datum.state : null;
        if (clickedState === selectedLinkedState) {
            setLinkedState(null);
            return;
        }
        setLinkedState(clickedState);
    });
}

var vg_1 = "charts/line_chart.json";
vegaEmbed("#chart-income-time", vg_1, embedOptions).then(function(result) {
    if (window.registerChartView) {
        window.registerChartView("chart-income-time", result.view);
    }
}).catch(console.error);

var vg_2 = "charts/household_growth.json";
vegaEmbed("#chart-household-growth", vg_2, embedOptions).then(function(result) {
    if (window.registerChartView) {
        window.registerChartView("chart-household-growth", result.view);
    }
}).catch(console.error);

var vg_3 = "charts/income_map.json";
vegaEmbed("#chart-income-map", vg_3, embedOptions).then(function(result) {
    attachLinkedStateInteraction("map", result.view);
}).catch(console.error);

var vg_4 = "charts/income_ranking.json";
vegaEmbed("#chart-income-ranking", vg_4, embedOptions).then(function(result) {
    attachLinkedStateInteraction("ranking", result.view);
}).catch(console.error);

var vg_5 = "charts/poverty_map.json";
vegaEmbed("#chart-poverty-map", vg_5, embedOptions).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);

var vg_6 = "charts/income_poverty.json";
vegaEmbed("#chart-income-poverty", vg_6, embedOptions).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);

var vg_7 = "charts/gini_multi_linechart.json";
vegaEmbed("#chart-gini-multiline", vg_7, embedOptions).then(function(result) {
    var view = result.view;
    var insights = {
        "Johor": "Inequality eased from higher 1970s levels and has stabilized around 0.36 in recent years.",
        "Kedah": "The long-run decline is clear, but progress was not smooth and inequality still sits above some peers.",
        "Kelantan": "Starting from one of the highest levels, Kelantan improved substantially but still ends relatively elevated.",
        "Kuala Lumpur": "High incomes did not eliminate inequality; the capital still remains on the higher side by 2022.",
        "Labuan": "Labuan finishes with the lowest 2022 Gini, making it one of the most equal outcomes in the series.",
        "Melaka": "Melaka improved sharply over the long run, though inequality rose again after its 2014 low.",
        "Negeri Sembilan": "Its decline is gradual and steady, ending close to the national middle rather than the extremes.",
        "Pahang": "Pahang reaches its series low in 2022, marking one of the stronger late-period equalization outcomes.",
        "Perak": "Perak narrowed inequality over time, but recent readings suggest a mid-range rather than standout improvement.",
        "Perlis": "Recent inequality is comparatively low, though progress flattened after earlier declines.",
        "Pulau Pinang": "It fell steeply from a very unequal starting point, yet 2022 still lands in a moderate rather than low range.",
        "Putrajaya": "Unlike most states, Putrajaya does not show a clear long-run decline and ends near where it began.",
        "Sabah": "Sabah remains among the highest by 2022, showing that inequality stayed persistently difficult to narrow.",
        "Sarawak": "The trend is steadily downward, with the lowest reading arriving at the end of the series in 2022.",
        "Selangor": "Selangor grew richer, but inequality only eased gradually, reinforcing that wealth does not guarantee equality.",
        "Terengganu": "Terengganu shows one of the strongest long-run declines, reaching its most equal reading in 2022."
    };

    function updateInsight(state) {
        var el = document.getElementById("gini-insight-text");
        if (el) {
            el.innerHTML = insights[state] || "";
        }
    }

    // Initial load
    updateInsight(view.signal("FocusState"));

    // Add signal listener
    view.addSignalListener("FocusState", function(name, value) {
        updateInsight(value);
    });
}).catch(console.error);

var vg_8 = "charts/income_gini.json";
vegaEmbed("#chart-income-gini", vg_8, embedOptions).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);

var vg_9 = "charts/income_expenditure.json";
vegaEmbed("#chart-income-expenditure", vg_9, embedOptions).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);

var vg_10 = "charts/expenditure_ranking.json";
vegaEmbed("#chart-expenditure-ranking", vg_10, embedOptions).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);

var vg_11 = "charts/amenities_comparison.json";
vegaEmbed("#chart-amenities-comparison", vg_11, embedOptions).then(function(result) {
    var view = result.view;
    var insights = {
        "Piped Water": "<strong>Water Infrastructure Gap:</strong> Safe piped water is nearly universal in urban states, but rural East Malaysia (Sabah and Sarawak) faces a persistent infrastructure gap. Geographical isolation and remote inland settlements make centralized water systems challenging, leaving communities reliant on gravity-fed water or local wells.",
        "Sanitation": "<strong>Sanitation & Hygiene:</strong> Basic flush sanitation exceeds 98% across most states. However, rural areas in Kelantan, Sabah, and Sarawak require continued development to phase out traditional pit latrines and pour-flush toilets, bridging the final mile in human hygiene and public health.",
        "Electricity": "<strong>Universal Power Access:</strong> Grid electrification has reached a stellar 99.9% across Peninsular Malaysia. The remaining challenge sits in Sarawak and Sabah's deep interior, where rugged terrains require decentralized off-grid solutions like solar micro-grids and small river turbines."
    };

    var legendBands = {
        "Piped Water": ["Below 80%", "80% to 89.9%", "90% to 97.9%", "98% to 99.9%", "100%"],
        "Sanitation": ["Below 98%", "98% to 99.4%", "99.5% to 99.8%", "99.9%", "100%"],
        "Electricity": ["Below 90%", "90% to 98.9%", "99% to 99.8%", "99.9%", "100%"]
    };

    function updateAmenityInsight(amenity) {
        var el = document.getElementById("amenities-insight-text");
        if (el) {
            el.innerHTML = insights[amenity] || "";
        }
        
        var bands = legendBands[amenity];
        if (bands) {
            for (var i = 1; i <= 5; i++) {
                var lbl = document.getElementById("amenity-legend-text-" + i);
                if (lbl) {
                    lbl.textContent = bands[i - 1];
                }
            }
        }
    }

    // Initial load
    updateAmenityInsight(view.signal("Amenity"));

    // Add signal listener
    view.addSignalListener("Amenity", function(name, value) {
        updateAmenityInsight(value);
    });
}).catch(console.error);

var vg_12 = "charts/percentile_distribution.json";
vegaEmbed("#chart-percentile-distribution", vg_12, embedOptions).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);
