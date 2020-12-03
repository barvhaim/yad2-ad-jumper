# yad2-ad-jumper
Yad2 ad jumper

## Getting Started
Configure your credentials and link to your ad in creds.js


### Prerequisites
```
npm install puppeteer

npm install node-cron

npm install pm2 -g
```
## Running the application
run once: 

```
node index.js
```

for lunch pm2, will now start the app.js (Every 4 hour the script run automatically)

```
pm2 start index.js
```
