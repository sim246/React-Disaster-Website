## Impact of Natural Disasters on the Economy
The app is an interactive map used for viewing different GDP and natural disasters that occur per year and country. It is meant to demonstrate the impact of natural disasters on the economy through the damages in USD they cause compared to the GDP. 

## Run
git clone the reposetory
cd into root project directory
cd into server
creat a .env file
    - ATLAS_URI="mongodb+srv://<username>:<password>@cluster0.zpjyxwb.mongodb.net/?retryWrites=true&w=majority"
    - DB_NAME=cluster0
use comand:node seed.js
cd back into root project directory
use command: npm run build
use command: npm run start

## Test
cd into server
use command: npm run test

## Deploy
after having downloaded artifact: scp -r -i 2023-520-Sila.pem 520-project-benkhelifa-dragomir-iurev.tar.gz bitnami@35.182.36.143:~
download artifact from ci

create db and add users
    - db = db.getSiblingDB('project_db')
    - db.createUser( {user: "user1", pwd: "password", roles [ "readWrite", "dbAdmin" ]} )

outside of db
    - tar -xfv 520-project-benkhelifa-dragomir-iurev.tar.gz
    - NODE_ENv=produtionc forever start bin/www

## Attributions
- Country Polygons - https://datahub.io/core/geo-countries
- Natural disasters from 1970-2022 - https://www.kaggle.com/datasets/brsdincer/all-natural-disasters-19002021-eosdis
- World, Region, Country GDP/GDP per capita in USD - https://www.kaggle.com/datasets/tmishinev/world-country-gdp-19602021/data
- Map Legend colours - https://colorbrewer2.org/#type=sequential&scheme=YlGn&n=8
- Legend component based on example from https://leafletjs.com/examples/choropleth/