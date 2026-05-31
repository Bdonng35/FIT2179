var embedOptions = { actions: false, tooltip: true, renderer: "svg" };
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
        "Johor": "<strong>Johor:</strong> Inequality eased from higher 1970s levels and has stabilized around <strong>0.36</strong> in recent years.",
        "Kedah": "<strong>Kedah:</strong> The long-run Gini decline is clear, but progress was not smooth and inequality still sits <strong>above some peninsular peers</strong>.",
        "Kelantan": "<strong>Kelantan:</strong> Starting from one of the most unequal levels, Kelantan improved substantially but still ends the series <strong>relatively elevated</strong>.",
        "Kuala Lumpur": "<strong>Kuala Lumpur:</strong> High household incomes did not eliminate inequality; the capital remains on the <strong>higher end</strong> (0.38) by 2022.",
        "Labuan": "<strong>Labuan:</strong> Labuan finishes with the series' <strong>lowest 2022 Gini (0.30)</strong>, making it the most equal outcome in the country.",
        "Melaka": "<strong>Melaka:</strong> Melaka improved sharply over the long run, though household inequality rose again after reaching its <strong>2014 series low</strong>.",
        "Negeri Sembilan": "<strong>Negeri Sembilan:</strong> Spacing and Gini decline are gradual and steady, ending close to the national middle rather than the extremes.",
        "Pahang": "<strong>Pahang:</strong> Pahang reaches its series low in 2022, marking one of the <strong>strongest late-period equalization</strong> outcomes (0.308).",
        "Perak": "<strong>Perak:</strong> Perak successfully narrowed inequality over time, but recent readings suggest a <strong>moderate, mid-range</strong> outcome.",
        "Perlis": "<strong>Perlis:</strong> Recent inequality is <strong>comparatively low</strong>, though equalization flattened after earlier rapid declines.",
        "Pulau Pinang": "<strong>Pulau Pinang:</strong> It fell steeply from an extremely unequal starting point, yet 2022 still lands in a <strong>moderate</strong> rather than low range.",
        "Putrajaya": "<strong>Putrajaya:</strong> Unlike most states, Putrajaya does not show a clear long-run Gini decline and ends <strong>near where it began</strong>.",
        "Sabah": "<strong>Sabah:</strong> Sabah remains among the <strong>highest in inequality (0.395)</strong> by 2022, showing that Gini narrowing has stayed persistently difficult.",
        "Sarawak": "<strong>Sarawak:</strong> The household trend is steadily downward, with the <strong>lowest Gini reading</strong> arriving at the end of the series in 2022 (0.382).",
        "Selangor": "<strong>Selangor:</strong> Selangor grew much richer, but inequality only eased gradually, reinforcing that <strong>wealth does not guarantee equality</strong>.",
        "Terengganu": "<strong>Terengganu:</strong> Terengganu shows one of the <strong>strongest long-run declines</strong> in the country, reaching its most equal reading in 2022."
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

var vg_8 = "charts/income_gini.json?v=" + new Date().getTime();
vegaEmbed("#chart-income-gini", vg_8, embedOptions).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);

var vg_9 = "charts/income_expenditure.json?v=" + new Date().getTime();
vegaEmbed("#chart-income-expenditure", vg_9, embedOptions).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);

var vg_10 = "charts/expenditure_ranking.json?v=" + new Date().getTime();
vegaEmbed("#chart-expenditure-ranking", vg_10, embedOptions).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);

var vg_11 = "charts/amenities_comparison.json?v=" + new Date().getTime();
vegaEmbed("#chart-amenities-comparison", vg_11, embedOptions).then(function(result) {
    var view = result.view;
    var insights = {
        "Piped Water": {
            2016: "<strong>Piped Water Access (2016):</strong> A clear regional divide is visible: <strong>Kelantan</strong> recorded the lowest access at <strong>65.4%</strong>, while Sabah and Sarawak sat at <strong>83.4%</strong> and <strong>86.0%</strong>. This reflects the heavy reliance on alternative water sources (such as tube wells or gravity-fed systems) in rural Kelantan, compared to the universal, centralized pipelines of urban Selangor and Kuala Lumpur.",
            2019: "<strong>Piped Water Progress (2019):</strong> Regional gaps persisted as <strong>Kelantan</strong> remained low at <strong>67.9%</strong> access, and East Malaysia made only modest gains (Sabah: <strong>84.7%</strong>, Sarawak: <strong>86.4%</strong>). Developing centralized water networks across wide, geographically dispersed rural populations remains a severe infrastructural constraint.",
            2022: "<strong>Piped Water Access (2022):</strong> While urban states maintained perfect <strong>100%</strong> coverage, <strong>Kelantan</strong> remained low at <strong>70.2%</strong>, meaning that over a quarter of its households consistently lacked piped water across all three years. This shows the long-term challenge of replacing informal community-managed water systems with official state grids."
        },
        "Sanitation": {
            2016: "<strong>Basic Sanitation (2016):</strong> Most states enjoyed near-universal sanitation above 99.6%. The primary outlier was <strong>Sabah</strong>, which lagged behind at <strong>96.1%</strong> flush sanitation access, reflecting slower rural sewer infrastructure development.",
            2019: "<strong>Sanitation Expansion (2019):</strong> Almost all peninsular states reached 99.9% to 100% sanitation coverage. <strong>Sabah</strong> remained the nation's lowest at <strong>95.6%</strong>, while Kelantan achieved a perfect <strong>100.0%</strong> alongside KL and Selangor.",
            2022: "<strong>Sanitation Universal (2022):</strong> Flush sanitation reached a remarkable <strong>100.0%</strong> across 12 states. <strong>Sabah</strong> closed its gap significantly to reach <strong>98.8%</strong>, Pahang sat at 99.4%, and Kelantan maintained near-universal access at 99.8%."
        },
        "Electricity": {
            2016: "<strong>Grid Electrification (2016):</strong> Almost the entire nation achieved flawless 100.0% electrification. Only East Malaysia had minor off-grid rural areas, with Sabah at <strong>99.5%</strong> and Sarawak at <strong>99.6%</strong>, showing the early success of rural grid extension programs.",
            2019: "<strong>Grid Power Access (2019):</strong> Grid connectivity remained nearly universal across almost all states. Sabah and Sarawak successfully narrowed their remaining gaps to <strong>99.7%</strong> and <strong>99.8%</strong>, reflecting intensive government efforts to wire up remote interior villages.",
            2022: "<strong>Grid Power Access (2022):</strong> The map highlights a stark contrast in grid integration, particularly across <strong>Kelantan (70.2%)</strong>, <strong>Sabah (87.6%)</strong>, and <strong>Sarawak (90.0%)</strong>. In these states, the combination of mountainous terrain, dense rainforests, and extremely remote rural settlements presents major physical and economic barriers to centralized power lines."
        }
    };

    var legendBands = {
        "Piped Water": ["Below 80%", "80% to 89.9%", "90% to 97.9%", "98% to 99.9%", "100%"],
        "Sanitation": ["Below 98%", "98% to 99.4%", "99.5% to 99.8%", "99.9%", "100%"],
        "Electricity": ["Below 90%", "90% to 98.9%", "99% to 99.8%", "99.9%", "100%"]
    };

    function updateAmenityInsight(amenity, year) {
        var el = document.getElementById("amenities-insight-text");
        if (el) {
            el.innerHTML = (insights[amenity] && insights[amenity][year]) || "";
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
    updateAmenityInsight(view.signal("Amenity"), view.signal("Year"));

    // Add signal listeners for BOTH signals
    view.addSignalListener("Amenity", function(name, value) {
        updateAmenityInsight(value, view.signal("Year"));
    });
    view.addSignalListener("Year", function(name, value) {
        updateAmenityInsight(view.signal("Amenity"), value);
    });
}).catch(console.error);

var vg_12 = "charts/percentile_distribution.json?v=" + new Date().getTime();
vegaEmbed("#chart-percentile-distribution", vg_12, embedOptions).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);
