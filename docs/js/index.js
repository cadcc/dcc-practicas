const colBlue = "#2c5aa0";
const colGreen = "#00ada0";
const colViolet = "#1a0856";
const colTextLight = "#0d082b";
const colTextDark = "#040115";
const colPattern = "rgba(0, 0, 0, 0.2)";
const colPatternLight = "rgba(255, 255, 255, 0.1)";

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
				backgroundColor: pattern.draw(
					responseYears.patterns[0],
					responseYears.colors[0],
					colPatternLight
				),
				borderWidth: 0,
			},
			{
				label: "Práctica 2",
				data: responseYears.values2,
				backgroundColor: pattern.draw(
					responseYears.patterns[1],
					responseYears.colors[1],
					colPatternLight
				),
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
				title: {
					display: true,
					text: "Respuestas",
				},
			},
		},
	},
});

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
	display: "auto",
};
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
	},
};

new Chart(document.getElementById("wfh"), {
	type: "pie",
	data: {
		labels: wfh.labels,
		datasets: [
			{
				data: wfh.values,
				backgroundColor: [
					pattern.draw(wfh.patterns[0], wfh.colors[0], colPatternLight),
					pattern.draw(wfh.patterns[1], wfh.colors[1], colPattern),
					pattern.draw(wfh.patterns[2], wfh.colors[2], colPattern),
					pattern.draw(wfh.patterns[3], wfh.colors[3], colPattern),
				],
				borderWidth: 0,
				hoverOffset: 16,
			},
		],
	},
	plugins: [ChartDataLabels],
	options: defaultPieOptions,
});

const defaultLineOptions = {
	borderWidth: 0,
	cubicInterpolationMode: "monotone",
};

new Chart(document.getElementById("wfh-years"), {
	type: "line",
	data: {
		labels: yearsVsWFH.labels,
		datasets: yearsVsWFH.sets.map((set, index) => ({
			label: set,
			// borderColor: yearsVsWFH.colors[index],
			backgroundColor: pattern.draw(
				wfh.patterns[index],
				yearsVsWFH.colors[index],
				colPattern
			),
			fill: true,
			data: yearsVsWFH.values[index],
			// hidden: index !== 0,
			...defaultLineOptions,
		})),
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
			},
			y: {
				stacked: true,
				ticks: {
					stepSize: 10,
					callback: function (value) {
						return value + "%";
					},
				},
				title: {
					display: true,
					text: "% de prácticas",
				},
			},
		},
		elements: {
			point: {
				radius: 0,
			},
		},
	},
});

new Chart(document.getElementById("schedule"), {
	type: "pie",
	data: {
		labels: schedule.labels,
		datasets: [
			{
				data: schedule.values,
				backgroundColor: [
					pattern.draw(schedule.patterns[0], schedule.colors[0], colPattern),
					pattern.draw(schedule.patterns[1], schedule.colors[1], colPattern),
					pattern.draw(schedule.patterns[2], schedule.colors[2], colPattern),
				],
				borderWidth: 0,
				hoverOffset: 16,
			},
		],
	},
	plugins: [ChartDataLabels],
	options: defaultPieOptions,
});

new Chart(document.getElementById("duration"), {
	type: "bar",
	data: {
		labels: duration.labels,
		datasets: [
			{
				label: "Prácticas Part-time",
				data: duration.values2,
				backgroundColor: pattern.draw(
					duration.patterns[1],
					duration.colors[1],
					colPattern
				),
				borderWidth: 2,
			},
			{
				label: "Prácticas Full-time",
				data: duration.values1,
				backgroundColor: pattern.draw(
					duration.patterns[0],
					duration.colors[0],
					colPattern
				),
				borderWidth: 2,
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
					text: "Meses",
				},
				grid: {
					display: false,
				},
			},
			y: {
				stacked: true,
				beginAtZero: true,
				title: {
					display: true,
					text: "Respuestas",
				},
			},
		},
	},
});

new Chart(document.getElementById("density"), {
	type: "line",
	data: {
		labels: kdeData.labels,
		datasets: [
			{
				label: "General",
				data: kdeData.values[0],
				borderColor: kdeData.colors[0],
				backgroundColor: kdeData.colors[0] + '55',
				fill: true,
				hidden: true,
			},
			{
				label: "Solo práctica 1",
				data: kdeData.values[1],
				borderColor: kdeData.colors[1],
				backgroundColor: pattern.draw(
					responseYears.patterns[0],
					kdeData.colors[1] + 'aa',
					colPatternLight
				),
				fill: true,
			},
			{
				label: "Solo práctica 2",
				data: kdeData.values[2],
				borderColor: kdeData.colors[2],
				backgroundColor: pattern.draw(
					responseYears.patterns[1],
					kdeData.colors[2] + 'aa',
					colPatternLight
				),
				fill: true,
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				type: "linear",
				beginAtZero: true,
				title: {
					display: true,
					text: "Sueldo liquido mensual (full-time)",
				},
				ticks: {
					stepSize: 50000,
					callback: function (value, index, values) {
						if (value == 0) {
							return "$0";
						}

						if (value >= 1000000) {
							return `$${value / 1000000}M`;
						}

						return `$${value / 1000}k`;
					},
				},
				grid: {
					display: true,
					drawBorder: true,
					color: "rgba(0, 0, 0, 0.1)",
				},
			},
			y: {
				beginAtZero: true,
				display: false, // Remove the y-axis ticks and labels
				grid: {
					display: false,
				},
			},
		},
		plugins: {
			legend: {
				display: true,
				position: "top",
			},
		},
		elements: {
			line: {
				tension: 0.4,
			},
			point: {
				radius: 0,
			},
		},
	},
});
