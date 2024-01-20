import pandas as pd
import difflib
import re
import pint

class Converter:
    def __init__(self) -> None:
        self.df = pd.DataFrame() 
        self.csvFile = "ingredient_density.csv"
        self.intialize_density_map()
    
    def intialize_density_map(self):
        self.df = pd.read_csv(self.csvFile)

    def find_density_of_string(self, input_str) -> float:
        best_match = -1
        best_density = 0
        best_str = ""
        for index, row in self.df.iterrows():
            match_str = row['ingredient']
            if match_str.find(',') != -1:
                match_str = match_str[:match_str.find(',')]

            similarity = difflib.SequenceMatcher(None, input_str, match_str).ratio()
            # if self.findWholeWord(input_str, row['ingredient']):
            #     similarity += 2
            if similarity > best_match:
                best_match = similarity
                best_density = row['density']
                best_str = row['ingredient']
        print(best_match, best_density, best_str)
        return best_density 
    
    def findWholeWord(self, w, s) -> bool:
        w = w.lower()
        s = s.lower()
        print(w, s)
        return (' ' + w + ',') in (' ' + s + ',')

    # First converts to mL if volume and g if mass
    def convert_to_grams(self, amount, unit, ingredient):
        unit = unit.lower()
        density = self.find_density_of_string(ingredient)
        ureg = pint.UnitRegistry()
        volume = 0
        if difflib.SequenceMatcher(None, unit, 'cup').ratio() > 0.6:
            volume = amount * ureg.cup
            return density * volume.to(ureg.mL).magnitude
        elif difflib.SequenceMatcher(None, unit, 'teaspoon').ratio() > 0.6 or unit == 'tsp':
            volume = amount * ureg.teaspoon
            return density * volume.to(ureg.mL).magnitude
        elif difflib.SequenceMatcher(None, unit, 'tablespoon').ratio() > 0.6 or unit == 'tbsp':
            volume = amount * ureg.tablespoon
            return density * volume.to(ureg.mL).magnitude
        elif difflib.SequenceMatcher(None, unit, 'pound').ratio() > 0.6 or unit == 'lb':
            weight = amount * ureg.pound
            return weight.to(ureg.gram).magnitude
        else:
            raise TypeError("Unit not recognized")
        



c = Converter()
# c.find_density_of_string('lime juice')
print(c.convert_to_grams(1, 'cup', 'rice'))
