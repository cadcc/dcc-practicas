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

# Response years
year_counts = data["year"].value_counts().sort_index()
values1_counts = data[data['internship'] == 1]['year'].value_counts().sort_index()
values2_counts = data[data['internship'] == 2]['year'].value_counts().sort_index()

all_years = [int(y) for y in sorted(data['year'].unique())]
values1 = [int(values1_counts.get(year, 0)) for year in all_years]
values2 = [int(values2_counts.get(year, 0)) for year in all_years]



jsonify("responseYears", {
    "labels": all_years,
    "values1": values1,
    "values2": values2,    
})


# Output data file
with open("../docs/js/data.js", "w") as f:
    f.write(json_data)
    f.close()
