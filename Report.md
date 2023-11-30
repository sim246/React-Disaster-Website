# Performance of Impact of Natural Disasters on the Economy

## Introduction and Methodology
Browsers: google chrome
Browser versions: 116.0.5845.112
Device: desktop, mobile device (in the inspector)
OS: windows
Width and Height : 563 x 502
Tools used: Lighthouse, profiler, performance, network

## Baseline Performance
The map colors took a long time to load (network showed a large fetch, performance showed a long task). Components were rendered whenever there was a change (they re-rendered whenever there was a change to the app hooks) (results in profiler and performance).

## Areas to Improve
Fetches were made when typing in year (ex: fetch for year 2, year 20 year 201 and year 2012). Map fetch was too long (needed caching), app needed useEffect cleanup for displays when changing countries, type and year quickly (clicking on the map). 

## Summary of Changes 
Added useEffect cleanup for all the fetches, stops component from re-rendering when clicking on countries in the map quickly.
Added caching for the map …
Added set selected Year validation, stops unnecessary fetches that return 404 errors.
Used memo to provide the cached result when it's the same input.

### useEffect Cleanup
Lead: Simona

### Year Validation
Lead: Simona

### Caching Map
Lead: Vasilii Iurev

### Memo
Lead: Sila Ben Khelifa

## Conclusion
The year validation had a big impact because of the unnecessary fetches. It was also surprising since it was harder to notice (needed to see it in the console and tolls used). The map was very taxing for our app which was expected and the component we needed to improve the most.
Things we learned:
Large data sourced like the map coordinates are more taxing to fetch from servers and need to be optimized. Caching is important since it helps improve the api’s speed.
Separating the api into different routes helps reduce the amount of data the client needs to fetch (fetching by year and country instead of fetching the whole thing). This means that a lot of planning need to be put into all the api endpoints (planning out what we need).
Validation is important since it can help prevent unnecessaries calls to the api.
Memo is useful since it makes it so that the cached result are used instead of fetch when it's the same input.

screenshots of dev tool results are in ./screenshots