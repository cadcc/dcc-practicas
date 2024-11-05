import json
import pandas as pd

data = pd.read_csv("data.csv")
json_data = ""


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
        "colors": ["#2c5aa0", "#00ada0"],
    },
)
# endregion

# region Modalities

wfh_key = {
    "remoto": "Remoto",
    "presencial": "Presencial",
    "hibrido_obligatorio": "Híbrido (Días obligatorios)",
    "hibrido_libre": "Híbrido (Flexible)",
}

colors = ["#ff2a7f", "#00ada0", "#2c5aa0", "#ffd91e"]

wfh_counts = data["modality"].value_counts()
wfh_counts = wfh_counts.rename(index=wfh_key)
wfh_counts = wfh_counts.reindex([
    "Remoto",
    "Híbrido (Días obligatorios)",
    "Híbrido (Flexible)",
    "Presencial",
])

jsonify(
    "wfh",
    {
        "labels": wfh_counts.index.tolist(),
        "values": wfh_counts.tolist(),
        "colors": colors,
    },
)

schedule_key = {"full_time": "Full Time", "part_time": "Part Time", "other": "Otra"}

schedule_counts = data["schedule"].value_counts()
schedule_counts = schedule_counts.rename(index=schedule_key)

jsonify(
    "schedule",
    {
        "labels": schedule_counts.index.tolist(),
        "values": schedule_counts.tolist(),
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
    {
        "labels": source_counts.index.tolist(),
        "values": source_counts.tolist()
    },
)

# endregion


# Output data file
with open("../docs/js/data.js", "w", encoding="utf-8") as f:
    f.write(json_data)
    f.close()
