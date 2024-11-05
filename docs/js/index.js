const colBlue = "#2c5aa0";
const colGreen = "#00ada0";
// const colTextLight = "#222";
const colTextLight = "#0d082b";
const colTextDark = "#040115";

const backgroundColors = [
	"#ff2a7f",
	"#ffd91e",
    "#00ada0",
	"#2c5aa0",
	"#403c8a",
	"#606898",
	"#ff914d",
	"#8b2eff",
	"#fafafa",
];

Chart.defaults.font.family = "Nunito";
Chart.defaults.color = colTextLight;
Chart.defaults.set("plugins.datalabels", {
	color: colTextDark,
});

new Chart(document.getElementById("response-years"), {
	type: "bar",
	data: {
		labels: responseYears.labels,
		datasets: [
			{
				label: "Práctica 1",
				data: responseYears.values1,
				backgroundColor: responseYears.colors[0],
				borderWidth: 0,
			},
			{
				label: "Práctica 2",
				data: responseYears.values2,
				backgroundColor: responseYears.colors[1],
				borderWidth: 0,
			},
		],
	},
	options: {
		responsive: true,
        maintainAspectRatio: false,
		scales: {
			x: {
				stacked: true,
				title: {
					display: true,
					text: "Año",
				},
				grid: {
					display: false,
				},
			},
			y: {
				stacked: true,
				beginAtZero: true,
			},
		},
	},
});

const colPattern = "rgba(0, 0, 0, 0.2)";
const defaultDatalabels = {
    formatter: (value, context) => {
        let total = context.chart.data.datasets[0].data.reduce(
            (sum, data) => sum + data,
            0
        );
        let percentage = ((value / total) * 100).toFixed(2);
        return percentage + "%";
    },
    font: {
        weight: "bold",
    },
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 5,
    textAlign: "center",
    anchor: "end",
    align: "start",
    offset: 10,
    display: 'auto',
}
function responsiveLegend(chart, size) {
    if (size.width < 2000) {
        chart.options.plugins.legend.position = "top";
        chart.options.plugins.legend.align = "center";
    } else {
        chart.options.plugins.legend.position = "right";
        chart.options.plugins.legend.align = "start";
    }
}

const defaultPieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onResize: responsiveLegend,
    plugins: {
        datalabels: defaultDatalabels,
        legend: {
            // fullSize: false
        }
    },    
}


new Chart(document.getElementById("schedule"), {
	type: "pie",
	data: {
		labels: schedule.labels,
		datasets: [
			{
				data: schedule.values,
				backgroundColor: [
					pattern.draw("dot", wfh.colors[0], colPattern),
					pattern.draw("zigzag", wfh.colors[1], colPattern),
					pattern.draw("diamond-box", wfh.colors[2], colPattern),
					pattern.draw("diagonal-right-left", wfh.colors[3], colPattern),
				],
				borderWidth: 0,
                hoverOffset: 16,
			},
		],
	},
	plugins: [ChartDataLabels],
	options: defaultPieOptions,
});


new Chart(document.getElementById("wfh"), {
	type: "pie",
	data: {
		labels: wfh.labels,
		datasets: [
			{
				data: wfh.values,
				backgroundColor: [
					pattern.draw("dot", wfh.colors[0], colPattern),
					pattern.draw("zigzag", wfh.colors[1], colPattern),
					pattern.draw("diamond-box", wfh.colors[2], colPattern),
					pattern.draw("diagonal-right-left", wfh.colors[3], colPattern),
				],
				borderWidth: 0,
                hoverOffset: 16,
			},
		],
	},
	plugins: [ChartDataLabels],
	options: defaultPieOptions,
});

new Chart(document.getElementById("jobsearch"), {
	type: "pie",
	data: {
		labels: jobSearch.labels,
		datasets: [
			{
				data: jobSearch.values,
                backgroundColor: backgroundColors,
				borderWidth: 0,
                hoverOffset: 16,
                datalabels: {

                }
			},
		],
	},
	plugins: [ChartDataLabels],
	options: {
		responsive: true,
        // interaction: {
        //     mode: 'nearest',
        //     intersect: false,
        //     onHover: function (e, item) {
        //         if (item.length) {
        //             const data = item[0]._chart.config.data.datasets[0].data[item[0]._index];
        //             console.log(item, data);
        //         }
        //     }
        // },
        onHover: function (e, item) {
            // highlight the hovered index
            if (item.length) {
                const data = item[0]._chart.config.data.datasets[0].data[item[0]._index];
                console.log(item, data);
            }
        },
		plugins: {
			tooltip: {
				enabled: false,
			},
			datalabels: {
				formatter: (value, context) => {
					let total = context.chart.data.datasets[0].data.reduce(
						(sum, data) => sum + data,
						0
					);
					let percentage = ((value / total) * 100).toFixed(2);
					return context.chart.data.labels[context.dataIndex] + '\n' + percentage + '%';
					// return percentage + "%";
				},
				font: {
					weight: "bold",
				},
				color: "#fff",
				backgroundColor: "rgba(0, 0, 0, 0.8)",
				borderRadius: 5,
				textAlign: "center",
                anchor: "end",
                align: "start",
                offset: 10,
                display: 'auto'
			},
		},
	},
});