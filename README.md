# Cooking Space
The _ultimate cooking assistant_ by [Patrick Halim](https://github.com/pnhalim), [Nathan Yap](https://github.com/Nathan-Yap), [Adhav Rajesh](https://github.com/radhav04)

Recipe websites are filled with so much unnecessary information and ads, which make them really annoying and confusing to use. **We wanted to make a web app that puts the user experience first by keeping things simple, straightforward, and efficient**! Users can enter a recipe URL and see all necessary ingredients and tools from the get-go. Then, they click through each of the steps one at a time with pictures for more information. Relevant ingredients in each step are highlighted, and the user can hover over the word to see the required quanitity. Users can also easily convert quantities to be measured in different units (ex. grams -> cups).  

## The Design
Full-stack cooking web app!
- **Back end built with Python django.** We made an API to scrape a specified recipe input and return the parsed data as json using newspaper3k. The back end also handles ingredient highlighting and unit conversion. Due to the time constraint of the hackathon, we focused on scraping from a specific website https://www.allrecipes.com/; however, most recipe websites already have a common JSON format, so the scraper may work on other websites too. 
- **Front end built with ReactJS.** Our front end sends API requests based on which recipe the user inputs and then displays the relevant information. The goal is to be as user-friendly and simple as possible!

## The Product
<p align="center">
  <img src="https://github.com/pnhalim/cooking-space/assets/90876112/f096d97f-c49c-4035-a850-86fde5972e17" alt="home page" width="500"/>
</p>
<p align="center">
  <img src="https://github.com/pnhalim/cooking-space/assets/90876112/9ea7c6b8-708e-48b9-8e1a-c168bd3d45ae" alt="recipe page" width="500"/>
</p>
<p align="center">
  <img src="https://github.com/pnhalim/cooking-space/assets/90876112/94326bfa-24ba-4a8d-a7ec-ea7790168d41" alt="step page" width="500"/>
</p>

## Instructions
### Setup
```
chmod +x ./bin/setup.sh
```
### Run 
```
./bin/run_all.sh
```
## The Team
- Patrick Halim -> https://github.com/pnhalim
- Nathan Yap -> https://github.com/Nathan-Yap
- Adhav Rajesh -> https://github.com/radhav04
