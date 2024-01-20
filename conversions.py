import pandas as pd

class Converter:
    def __init__(self) -> None:
        self.densityMap = {}
        self.csvFile = "ingredient_density.csv"
        self.intialize_density_map()
    
    def intialize_density_map(self):
        df = pd.read_csv(self.csvFile)
        for index, row in df.iterrows():
            print(row['density'], row['ingredient'])
