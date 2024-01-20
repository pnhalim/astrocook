from newspaper import Article

url = "https://www.allrecipes.com/recipe/83549/angelas-awesome-enchiladas/"
article = Article(url)

article.download()
article.parse()
print(article.html)
with open("test.html", "w+") as file:
    file.write(article.html)
