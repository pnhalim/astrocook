from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets

from django_api.quickstart.serializers import GroupSerializer, UserSerializer
from django.views import View

from django.http import JsonResponse

from bs4 import BeautifulSoup
from newspaper import Article
import json
import os
import re

from django_api.quickstart.ingredients import *

TOOL_LIST = ["knife", "cutting board", "vegetable peeler", "paring knife", "cooking spoons", "whisk", "measuring cups", "mixing bowls", "baking sheets", "spatula", "tongs", "colander", "grater", "can opener", "rolling pin", "pepper mill", "salt shaker", "saucepan", "pot", "frying pan", "kitchen timer", "mixer", "strainer", "pastry brush", "thermometer", "kitchen scale", "mortar and pestle"]

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

def convert_units(amount, unit, target_unit):
    # Your conversion logic goes here
    # For now, let's just return a sample response
    return f"Converting {amount} {unit} to {target_unit}"

class ConvertView(View):
    def get(self, request, *args, **kwargs):
        # Capture parameters from the URL
        amount = request.GET.get('amount')
        unit = request.GET.get('unit')
        target_unit = request.GET.get('target_unit')

        # Validate parameters
        if not all([amount, unit, target_unit]):
            return JsonResponse({"error": "Missing required parameters"}, status=400)

        try:
            # Convert amount to a float
            amount = float(amount)
        except ValueError:
            return JsonResponse({"error": "Invalid amount"}, status=400)

        # Call the conversion function
        result = convert_units(amount, unit, target_unit)

        # Return the result as JSON
        return JsonResponse({"result": result})

def fetch_article(url):
    final_json = {
        "ingredients": [],
        "instructions": []
    }
    article = Article(url)
    article.download()
    article.parse()

    temp_name = url.replace('/', '')
    html_path = os.path.join("article_data", temp_name)
    data_path = os.path.join("article_data", "DATA"+temp_name)

    if not os.path.isfile(html_path) or not os.path.isfile(data_path): # Missing html data
        with open("{}".format(html_path), "w+") as file:
            file.write(article.html)
        
        with open("{}".format(data_path), "w+") as file:         
            soup = BeautifulSoup(article.html, 'html.parser')
            allrecipe_metadata = soup.find(id="allrecipes-schema_1-0")
            try:
                metadata_json = json.loads(allrecipe_metadata.string)
            except Exception as e:
                raise Exception("Couldn't parse json {}".format(e))
            json.dump(metadata_json, file)
            
    final_json.update(parse_json(data_path))

    INGREDIENT_LIST = []
    for ing in final_json['ingredients-raw']:   
        final_json['ingredients'].append(extract_ingredient_data(ing))
        INGREDIENT_LIST.append(final_json['ingredients'][-1]['name'])

    tools = set()
    for direc in final_json['directions-raw']:
        for word in TOOL_LIST:
            if word in direc.get('text'):
                tools.add(word)
        final_json['instructions'].append(extract_direction_data(direc, INGREDIENT_LIST))

    return JsonResponse({"result": final_json})

def parse_json(json_name):
    try:
        with open(json_name, "r") as json_file:
            json_obj = json.load(json_file)[0]
            recipe_info = {}
            recipe_info['ingredients-raw'] = json_obj.get('recipeIngredient', 'n/a')
            recipe_info['directions-raw'] = json_obj.get('recipeInstructions', 'n/a')
            recipe_info['title'] = json_obj.get('headline', 'n/a').replace("&#39;", "\'")
            recipe_info['description'] = json_obj.get('description', 'n/a')
            recipe_info['author'] = json_obj['author'][0].get('name', 'n/a') if 'author' in json_obj else 'n/a'
            recipe_info['servings'] = json_obj.get('recipeYield', ['n/a'])[0]
            recipe_info['nutrition'] = json_obj.get('nutrition', 'n/a')
            recipe_info['image'] = json_obj.get('image', {}).get('url', 'n/a')          
            recipe_info['time'] = {
                "prep": timestamp_regex(json_obj.get('prepTime', 'n/a')),
                "cook": timestamp_regex(json_obj.get('prepTime', 'n/a')),
                "total": timestamp_regex(json_obj.get('prepTime', 'n/a'))
            }
            return recipe_info
    except KeyError:
        print("Error getting json values")
    except Exception as e:
        print("Couldn't parse json {}".format(e))

def timestamp_regex(q):
    if not q: return "n/a"
    found = re.search("PT(\d+\w)", q).group(1)
    return found if found else "n/a"


def extract_ingredient_data(ingredient_str):
    ing_obj = {}
    # Regex matches decimal numbers, and we grab the first one 
    # (NOTE: may have issues with "1 pound (16 oz)" parentheses)
    match = re.search("(\d+\.?\d*)(?:\s\(.+\))?\s(cup|pound|teaspoon|tablespoon|ounce|bunch|can|package|gram|kilogram|tbsp|tsp|g|oz|lb|)?(?:s)?(.+)", ingredient_str)    
    ing_obj['amount'] = match.group(1) if match else "n/a"
    ing_obj['unit'] = match.group(2) if match else "n/a"
    ing_obj['name'] = match.group(3).strip() if match else "n/a"
    ing_obj['img'] = ""

    if "chicken breast" in ingredient_str:
        ing_obj['name'] = "chicken"

    return ing_obj

def extract_direction_data(direction_obj, INGREDIENT_LIST):
    dir_obj = {}
    dir_obj['description'] = add_ingredient_tags(direction_obj.get('text'), INGREDIENT_LIST)
    dir_obj['ingredients'] = add_ingredient_tags2(direction_obj.get('text'), INGREDIENT_LIST)
    try:
        dir_obj['image'] = direction_obj['image'][0]['url']
    except (KeyError, TypeError):
        dir_obj['image'] = ""
    
    return dir_obj

class RecipeView(View):

    def get(self, request, *args, **kwargs):
        # Capture parameters from the URL
        url = request.GET.get('url')

        # Validate parameters
        if not all([url]):
            return JsonResponse({"error": "Missing required parameters"}, status=400)

        # try:
        #     # Call the conversion function
        #     result = 
        # except Exception as ex:
        #     print("Error parsing article: {}".format(ex))

        # Return the result as JSON
        return fetch_article(url)