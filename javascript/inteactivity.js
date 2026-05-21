var section1Years = [1974, 1976, 1979, 1984, 1987, 1989, 1992, 1995, 1997, 1999, 2002, 2004, 2007, 2009, 2012, 2014, 2016, 2019, 2022];
var section1ChartIds = ["chart-income-time", "chart-household-growth"];
var section1Views = {};

function closestSection1Year(rawYear) {
    return section1Years.reduce(function(bestYear, currentYear) {
        return Math.abs(currentYear - rawYear) < Math.abs(bestYear - rawYear) ? currentYear : bestYear;
    });
}

function updateSection1Year(rawYear) {
    var snappedYear = closestSection1Year(Number(rawYear));
    var slider = document.getElementById("section1-year-slider");
    var label = document.getElementById("section1-year-value");

    if (slider) {
        slider.value = snappedYear;
    }

    if (label) {
        label.textContent = snappedYear;
    }

    section1ChartIds.forEach(function(chartId) {
        if (section1Views[chartId]) {
            section1Views[chartId].signal("SelectedYear", snappedYear).run();
        }
    });
}

window.registerChartView = function(chartId, view) {
    section1Views[chartId] = view;

    if (section1ChartIds.indexOf(chartId) !== -1) {
        var slider = document.getElementById("section1-year-slider");
        if (slider) {
            updateSection1Year(slider.value);
        }
    }
};

var section1Slider = document.getElementById("section1-year-slider");
if (section1Slider) {
    section1Slider.addEventListener("input", function(event) {
        updateSection1Year(event.target.value);
    });
    updateSection1Year(section1Slider.value);
}
