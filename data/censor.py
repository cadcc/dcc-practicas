# Para censurar los datos crudos para que no sean identificables
# Si eres cadcc y quieres los datos crudos, busca en la lista de repos del github cadcc

import pandas as pd

data = pd.read_csv("rawdata.csv")

data = data.drop(columns=["description"])

data = data.sample(frac=1).reset_index(drop=True)

data = data.drop(columns=["timestamp"])
data.insert(0, "id", range(1, 1 + len(data)))

data.to_csv("data.csv", index=False)
