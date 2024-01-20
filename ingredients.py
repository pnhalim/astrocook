import requests
import difflib

# API_KEY = "TsBkPnuzgZzDQbFDHYBVGPUSMVJcDSFltaWfwMTM"
# url = "https://api.nal.usda.gov/fdc/v1/foods/list/?api_key=TsBkPnuzgZzDQbFDHYBVGPUSMVJcDSFltaWfwMTM"

# response = requests.get(url)
# ingredients = response.json()

# print(ingredients)

INGREDIENTS = ["chicken", "potato", "onion", "green onion"]
example = "put the onion in the pot and stir in the green onion"

def add_ingredient_tags(input_f, ingredients_f):
    """
    Adds ingredient tags to input.

    input_f = string
    ingredients_f = ["string", "string"]

    Ex.
    put chicken into pot
    put <div class=”chicken”>chicken<div> into pot
    """
    similar_words = get_similar_words(input_f, ingredients_f)
    input_f = input_f.split()

    for word, index, ingredient in similar_words:
        input_f[index] = f'<div class="{ingredient}">{word}<div>'

    return " ".join(input_f)

def get_ngrams(input_f, n=2):
    """
    Returns ngram list.
    """
    return [" ".join(input_f[i:i+n]) for i in range(0, len(input_f)-n+1)]

def get_similar_from_ngrams(input_f, ingredients_f, n=2):
    """
    Returns the most similar result from ngrams.
    """
    ngrams = get_ngrams(input_f, n=n)
    
    similar = {}
    for index, word in enumerate(ngrams):
        best_match = "" 
        best_match_score = 0
        for ingredient in ingredients_f:
            similarity = difflib.SequenceMatcher(None, word, ingredient).ratio()
            if similarity > best_match_score:
                best_match = ingredient
                best_match_score = similarity

        if best_match_score > 0.8:
            for i in range(n):
                similar[index + i] = (word, index, best_match)

    return similar


def get_similar_words(input_f, ingredients_f):
    """
    Returns a list of words to be tagged.

    input_f = string
    ingredients_f = ["string", "string"]

    [("word", "ingredient"), ...]
    """

    similar = {}
    for n in range(5, 0, -1):
        ngrams_similar = get_similar_from_ngrams(input_f, ingredients_f, n=2)
        for index, val in ngrams_similar.items():
            if index not in similar:
                similar[index] = val
    # triples = get_ngrams(input_f, n=3)
    # quads = get_ngrams(input_f, n=4)
    

    return similar


# print(add_ingredient_tags(example, INGREDIENTS))
print(get_similar_words(example.split(), INGREDIENTS))