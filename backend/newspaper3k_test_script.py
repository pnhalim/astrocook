from newspaper import Article
import json

# url = "https://www.allrecipes.com/recipe/83549/angelas-awesome-enchiladas/"
# article = Article(url)

# article.download()
# article.parse()
# print(article.html)
# with open("test.html", "w+") as file:
#     file.write(article.html)

with open("test.html", "r") as file:
    html_doc = file.read()

from bs4 import BeautifulSoup
soup = BeautifulSoup(html_doc, 'html.parser')


allrecipe_metadata = soup.find(id="allrecipes-schema_1-0")
with open("test_metadata", "w+") as file:
    file.write(allrecipe_metadata.string)
try:
    metadata_json = json.loads(allrecipe_metadata.string)
    with open("output_json", "w+") as outfile:
        json.dump(metadata_json, outfile)
except Exception as e:
    print("Couldn't parse json {}".format(e))



