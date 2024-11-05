const colBlue = "#2c5aa0";
const colGreen = "#00ada0";

const backgroundColors = [
	"#00ada0",
	"#2c5aa0",
	"#ff2a7f",
	"#ffd91e",
	"#403c8a",
	"#606898",
	"#ff914d",
	"#8b2eff",
	"#fafafa",
];

//#region Section 1 - Respuestas
const total = document.getElementById("respuestas-total");
const p1 = document.getElementById("respuestas-p1");
const p2 = document.getElementById("respuestas-p2");
const options = {
	startSocket: "bottom",
	endSocket: "top",
	path: "grid",
	color: "var(--text-on-light)",
	endPlug: "arrow2",
};

// new LeaderLine(total, p1, options);
// new LeaderLine(total, p2, options);
new Chart(document.getElementById("response-years"), {
	type: "bar",
	data: {
		labels: responseYears.labels,
		datasets: [
			{
				label: "Práctica 1",
				data: responseYears.values1,
				backgroundColor: [colBlue],
				borderWidth: 0,
			},
            {
				label: "Práctica 2",
				data: responseYears.values2,
				backgroundColor: [colGreen],
				borderWidth: 0,
			},
		],
	},
	options: {
		responsive: true,
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
					text: "Prácticas",
				},
			},
		},
	},
});
//#endregion
