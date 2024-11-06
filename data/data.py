import json
import pandas as pd

import numpy as np
from statsmodels.nonparametric.kde import KDEUnivariate

data = pd.read_csv("data.csv")
json_data = ""

texture_fulltime = "diamond"
texture_parttime = "diamond-box"
color_fulltime = "#ff2a7f"
color_parttime = "#ffd91e"
color_other = "#606898"

color_presencial = "#ff2a7f"
color_remoto = "#1f1954"
color_hibrido_libre = "#00ada0"
color_hibrido_obligatorio = "#2c5aa0"

color_p1 = "#2c5aa0"
texture_p1 = "line-vertical"
color_p2 = "#00ada0"
texture_p2 = "line"


def jsonify(name, data):
    global json_data
    output = f"const {name} = {json.dumps(data)};\n"
    json_data += output


print(f"Número de respuestas: {data.shape[0]}")
print(f"Práctica 1: {data[data['internship'] == 1].shape[0]}")
print(f"Práctica 2: {data[data['internship'] == 2].shape[0]}")

# region Response years
year_counts = data["year"].value_counts().sort_index()
values1_counts = (
    data[data["internship"] == 1]["year"].value_counts().sort_index()
)
values2_counts = (
    data[data["internship"] == 2]["year"].value_counts().sort_index()
)

all_years = [int(y) for y in sorted(data["year"].unique())]
values1 = [int(values1_counts.get(year, 0)) for year in all_years]
values2 = [int(values2_counts.get(year, 0)) for year in all_years]


jsonify(
    "responseYears",
    {
        "labels": all_years,
        "values1": values1,
        "values2": values2,
        "colors": [color_p1, color_p2],
        "patterns": [texture_p1, texture_p2],
    },
)
# endregion

# region Modalities


# WFH (Presencialidad)
wfh_key = {
    "remoto": "Remoto",
    "presencial": "Presencial",
    "hibrido_obligatorio": "Híbrido (Días obligatorios)",
    "hibrido_libre": "Híbrido (Flexible)",
}

wfh_colors = [
    color_remoto,
    color_hibrido_obligatorio,
    color_hibrido_libre,
    color_presencial,
]

wfh_counts = data["modality"].value_counts()
wfh_counts = wfh_counts.rename(index=wfh_key)
wfh_counts = wfh_counts.reindex(
    [
        "Remoto",
        "Híbrido (Días obligatorios)",
        "Híbrido (Flexible)",
        "Presencial",
    ]
)

jsonify(
    "wfh",
    {
        "labels": wfh_counts.index.tolist(),
        "values": wfh_counts.tolist(),
        "colors": wfh_colors,
        "patterns": ["zigzag", "weave", "zigzag-vertical", "dot"],
    },
)


# Years vs WFH (Presencial Percentage)
presencial_counts_per_year = (
    data[data["modality"] == "presencial"]["year"].value_counts().sort_index()
)
total_counts_per_year = data["year"].value_counts().sort_index()

# Compute percentage
years_vs_wfh1 = {
    year: (
        presencial_counts_per_year.get(year, 0)
        / total_counts_per_year.get(year, 1)
    )
    * 100
    for year in all_years
}

# Híbrido (Días obligatorios) Percentage
hibrido_obligatorio_counts_per_year = (
    data[data["modality"] == "hibrido_obligatorio"]["year"]
    .value_counts()
    .sort_index()
)
years_vs_wfh2 = {
    year: (
        hibrido_obligatorio_counts_per_year.get(year, 0)
        / total_counts_per_year.get(year, 1)
    )
    * 100
    for year in all_years
}

# Híbrido (Flexible) Percentage
hibrido_libre_counts_per_year = (
    data[data["modality"] == "hibrido_libre"]["year"]
    .value_counts()
    .sort_index()
)
years_vs_wfh3 = {
    year: (
        hibrido_libre_counts_per_year.get(year, 0)
        / total_counts_per_year.get(year, 1)
    )
    * 100
    for year in all_years
}

remoto_counts_per_year = (
    data[data["modality"] == "remoto"]["year"].value_counts().sort_index()
)
years_vs_wfh4 = {
    year: (
        remoto_counts_per_year.get(year, 0)
        / total_counts_per_year.get(year, 1)
    )
    * 100
    for year in all_years
}


# Convert to lists for JSON formatting
labels_years_wfh = list(years_vs_wfh1.keys())
values_years_wfh1 = list(years_vs_wfh1.values())
values_years_wfh2 = list(years_vs_wfh2.values())
values_years_wfh3 = list(years_vs_wfh3.values())
values_years_wfh4 = list(years_vs_wfh4.values())

jsonify(
    "yearsVsWFH",
    {
        "labels": labels_years_wfh,
        "sets": [
            "% Presenciales",
            "% Híbridas (días obligatorios)",
            "% Híbridas (flexible)",
            "% Full-remotas",
        ],
        "values": [
            values_years_wfh1,
            values_years_wfh2,
            values_years_wfh3,
            values_years_wfh4,
        ],
        "colors": [
            color_presencial,
            color_hibrido_obligatorio,
            color_hibrido_libre,
            color_remoto,
        ],
    },
)


# Schedule (Jornada)
schedule_key = {
    "full_time": "Full Time",
    "part_time": "Part Time",
    "other": "Otras",
}

schedule_counts = data["schedule"].value_counts()
schedule_counts = schedule_counts.rename(index=schedule_key)

jsonify(
    "schedule",
    {
        "labels": schedule_counts.index.tolist(),
        "values": schedule_counts.tolist(),
        "colors": [color_fulltime, color_parttime, color_other],
        "patterns": [texture_fulltime, texture_parttime, "dot"],
    },
)


# Duration
duration_1_counts = (
    data[data["schedule"] == "full_time"]["duration"]
    .value_counts()
    .sort_index()
)
duration_2_counts = (
    data[data["schedule"] == "part_time"]["duration"]
    .value_counts()
    .sort_index()
)

durations = [y for y in sorted(data["duration"].unique())]
values1 = [int(duration_1_counts.get(duration, 0)) for duration in durations]
values2 = [int(duration_2_counts.get(duration, 0)) for duration in durations]

jsonify(
    "duration",
    {
        "labels": durations,
        "values1": values1,
        "values2": values2,
        "colors": [color_fulltime, color_parttime],
        "patterns": [texture_fulltime, texture_parttime],
    },
)

# endregion


# region Job Search

source_key = {
    "u-cursos": "U-Cursos",
    "bolsas": "Bolsas de trabajo",
    "red_personal": "Red personal",
    "eventos": "Eventos",
    "telegram": "Telegram",
    "red_profesional": "Red profesional",
    "reclutamiento": "Reclutamiento",
    "directo": "Postulación directa",
    "otro": "Otros",
}

# data["source"] = data["source"].replace({"directo": "otro", "otro": "otro"})
source_counts = data["source"].value_counts()
source_counts = source_counts.rename(index=source_key)

jsonify(
    "jobSearch",
    {"labels": source_counts.index.tolist(), "values": source_counts.tolist()},
)

# print out the percentages of each category

source_counts = data["source"].value_counts(normalize=True)
source_counts = source_counts.rename(index=source_key)

for source in source_counts.index:
    print(f"{source}: {source_counts[source] * 100:.2f}%")

# endregion


# region Money KDE

max_value = 1000000

wages_first_internship = data[
    (data["internship"] == 1) & (data["schedule"] == "full_time")
]["salary"]
wages_second_internship = data[
    (data["internship"] == 2) & (data["schedule"] == "full_time")
]["salary"]
general_wages = data["salary"]


def compute_kde_at(data, x_vals):
    kde = KDEUnivariate(data)
    kde.fit(
        kernel="gau",
        bw="scott",
        fft=True,
        gridsize=1000,
        cut=3,
        clip=(0, max_value),
    )
    kde_vals = kde.evaluate(x_vals)
    return kde_vals


# Define common x-values for all KDEs
x_vals = np.linspace(0, max_value, num=101)

# Compute KDEs for each dataset
kde_general = compute_kde_at(general_wages, x_vals)
kde_second = compute_kde_at(wages_second_internship, x_vals)
kde_first = compute_kde_at(wages_first_internship, x_vals)

# Prepare data for JSON output
data = {
    "labels": x_vals.tolist(),
    "values": [
        kde_general.tolist(),
        kde_first.tolist(),
        kde_second.tolist(),
    ],
    "colors": [
        "#1a0856",
        color_p1,
        color_p2,
    ]
    # "datasets": [
    #     {
    #         "label": "Todas las prácticas",
    #         "data": kde_general.tolist(),
    #         "borderColor": "#00ada0",
    #         "backgroundColor": "rgba(0, 173, 160, 0.33)",
    #         "fill": True,
    #         "hidden": True,
    #     },
    #     {
    #         "label": "Solo práctica 1",
    #         "data": kde_first.tolist(),
    #         "borderColor": "#ff2a7f",
    #         "backgroundColor": "rgba(255, 42, 127, 0.33)",
    #         "fill": True,
    #     },
    #     {
    #         "label": "Solo práctica 2",
    #         "data": kde_second.tolist(),
    #         "borderColor": "#ffd91e",
    #         "backgroundColor": "rgba(255, 217, 30, 0.33)",
    #         "fill": True,
    #     },
    # ],
}

# Output JSON data
jsonify("kdeData", data)

# endregion


# Output data file
with open("../docs/js/data.js", "w", encoding="utf-8") as f:
    f.write(json_data)
    f.close()
