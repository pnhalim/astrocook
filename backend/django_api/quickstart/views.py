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
    
    ingredients, directions = parse_json(data_path)

    for ing in ingredients:   
        final_json['ingredients'].append(extract_ingredient_data(ing))

    for direc in directions:
        final_json['instructions'].append(extract_direction_data(direc))

    return JsonResponse({"result": final_json})

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