import requests
import difflib

def add_ingredient_tags(input_f, ingredients_f):
    """
    Adds ingredient tags to input.

    input_f = string
    ingredients_f = ["string", "string"]

    Ex.
    put chicken into pot
    put <div class=”chicken”>chicken<div> into pot
    """
    input_f = input_f.split()
    similar_words = get_similar_words(input_f, ingredients_f)

    for word, ingredient, start_index, end_index in similar_words:
        del input_f[start_index:end_index]
        span = '<span style="" onClick={OnNextButtonClicked} class="ingredient">' + f'{word}</span>'
        input_f.insert(start_index, span)

    return " ".join(input_f)

def add_ingredient_tags2(input_f, ingredients_f):
    """
    Adds ingredient tags to input.

    input_f = string
    ingredients_f = ["string", "string"]

    Ex.
    put chicken into pot
    put <div class=”chicken”>chicken<div> into pot
    """
    input_f = input_f.split()
    similar_words = get_similar_words(input_f, ingredients_f)
    out = []
    for word, ingredient, start_index, end_index in similar_words:
        out.append(word)

    return out

def get_ngrams(input_f, n=2):
    """
    Returns ngram list.
    """
    return [" ".join(input_f[i:i+n]) for i in range(0, len(input_f)-n+1)]

def get_similar_from_ngrams(input_f, ingredients_f, n=2):
    """
    Returns the most similar result from ngrams.
    """
    n_grams = get_ngrams(input_f, n=n)
    n_ingredients = [ingredient for ingredient in ingredients_f if len(ingredient.split()) == n]
    
    similar = {}
    for index, word in enumerate(n_grams):
        best_match = "" 
        best_match_score = 0
        for ingredient in n_ingredients:
            similarity = difflib.SequenceMatcher(None, word, ingredient).ratio()
            if similarity > best_match_score:
                best_match = ingredient
                best_match_score = similarity

        if best_match_score > 0.8:
            for i in range(n):
                similar[index + i] = (word, best_match, index, index + n)

    return similar


def get_similar_words(input_f, ingredients_f):
    """
    Returns a list of words to be tagged.

    input_f = string
    ingredients_f = ["string", "string"]

    [("word", "ingredient", start_index, end_index), ...]
    """
    similar = {}
    for n in range(5, 0, -1):
        ngrams_similar = get_similar_from_ngrams(input_f, ingredients_f, n=n)
        for index, val in ngrams_similar.items():
            if index not in similar:
                similar[index] = val

    similar = list(set(similar.values()))
    similar.sort(key=lambda k: k[-1])
    return similar


# if __name__ == "__main__":
    
#     INGREDIENTS = ["chicken", "potato", "onion", "green onion"]
#     example = "put the onion in the pot and stir in the green onion"

#     print(add_ingredient_tags(example, INGREDIENTS))
