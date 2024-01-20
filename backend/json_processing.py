import json
import re

def parse_json(json_name):
    try:
        with open(json_name, "r") as json_file:
            json_obj = json.load(json_file)
            ingredients = json_obj[0]['recipeIngredient']
            directions = json_obj[0]['recipeInstructions']
            return ingredients, directions
    except Exception as e:
        print("Couldn't parse json {}".format(e))

def extract_ingredient_data(ingredient_str):
    ing_obj = {}
    # Regex matches decimal numbers, and we grab the first one 
    # (NOTE: may have issues with "1 pound (16 oz)" parentheses)
    match = re.search("(\d+\.?\d*)(?:\s\(.+\))?\s(cup|pound|teaspoon|tablespoon|ounce|bunch|can|package|gram|kilogram|tbsp|tsp|g|oz|lb|)?(?:s)?(.+)", ingredient_str)
    ing_obj['amount'] = match.group(1)
    ing_obj['unit'] = match.group(2)
    ing_obj['name'] = match.group(3).strip()
    ing_obj['img'] = ""
    return ing_obj

def extract_direction_data(direction_obj):
    dir_obj = {}
    dir_obj['description'] = direction_obj.get('text')
    dir_obj['image'] = direction_obj.get('image')
    return dir_obj

ingredients, directions = parse_json("output_json")
final_json = {
    "ingredients": [],
    "instructions": []
}

for ing in ingredients:   
    final_json['ingredients'].append(extract_ingredient_data(ing))

for direc in directions:
    final_json['instructions'].append(extract_direction_data(direc))

print(final_json)
    
