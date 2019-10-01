# Get MREIDs from Google SERPs
![GitHub](https://img.shields.io/github/license/jpigla/MREIDs-from-SERPs) ![node](https://img.shields.io/node/v/puppeteer) ![npm](https://img.shields.io/npm/v/puppeteer) ![GitHub last commit](https://img.shields.io/github/last-commit/jpigla/MREIDs-from-SERPs)

<p align="center"><img src="https://user-images.githubusercontent.com/14932296/65971013-d6526800-e467-11e9-9ce3-322100f8a766.png" width=700></p>

## Requirements

**Local Environment**
* NodeJS (https://nodejs.org/de/)

**NPM-Packages**
* Puppeteer (https://www.npmjs.com/package/puppeteer)
* Minimist (https://www.npmjs.com/package/minimist)

## Installation

1. Download & install NodeJS (https://nodejs.org/de/)
  * Alternativ you can use Homebrew (https://brew.sh/index_de) to install node on Mac. Go to Terminal and paste `brew update && brew install node` to update **brew** and install **NodeJS**
2. Check if Node and NPM is installed properly
  * Type `node -v` in Terminal to check NodeJS (You should see a version number)
  * Type `npm -v` in Terminal to check NPM-Manager (You should see a version number)
3. Install required NPM-Packages
  * Type `npm install puppeteer minimist` in Terminal

## Usage

**Run script with arguments**
`node get_mreids.js --kw=<KEYWORD>`

**Examples**

* `node get_mreids.js --kw=firefox`
* `node get_mreids.js --kw=bmw`

**What happens here**

* Puppeteer (Headless Browser; Chromium) opens first SERP with input keyword
* We extract MREID if available and look for "Über XX weitere ansehen" Link in Knowledge-Graph
* We click that link and get a carousel of entities on next SERP
* We extract urls and names of entities from carousel
* We open each url in new tab, wait for load-event and extract MREID
* We clode Browser and export List to CSV / Terminal

## Help & Information

* If something breaks or errors occur during runtime, please ask Philipp at hello@jpigla.de.
* _This is **Version 1** of "Get MREIDs from Google SERPs"_


## License

All assets and code are under the GPL v3 License unless specified otherwise.
