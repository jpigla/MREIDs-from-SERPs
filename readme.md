# Get MREIDs from Google SERPs
![GitHub](https://img.shields.io/github/license/jpigla/MREIDs-from-SERPs) ![node](https://img.shields.io/node/v/puppeteer) ![npm](https://img.shields.io/npm/v/puppeteer) ![GitHub last commit](https://img.shields.io/github/last-commit/jpigla/MREIDs-from-SERPs)

<p align="center"><img src="https://user-images.githubusercontent.com/14932296/65971013-d6526800-e467-11e9-9ce3-322100f8a766.png" width=700></p>

## ⚠ Disclaimer
> This software is not authorized by Google and doesn't follow Google's
> robots.txt. Scraping without Google explicit written permission is a violation of thei
> terms and conditions on scraping and can potentially cause a lawsuit

## Requirements

**Local Environment**
* NodeJS (https://nodejs.org/de/)

**NPM-Packages**
* Puppeteer (https://www.npmjs.com/package/puppeteer)
* Minimist (https://www.npmjs.com/package/minimist)

## Installation

1. Download [latest project release](https://github.com/jpigla/MREIDs-from-SERPs/releases/latest), extract and (if desired) move folder to your home directory
2. Check if Node and NPM are already installed
  * Open Terminal
  * Type `node -v` in Terminal to check NodeJS version number (and if installed already)
  * Type `npm -v` in Terminal to check NPM-Manager version number (and if installed already)
  * **If not**, install Homebrew (from https://brew.sh/index_de; Mac) and then NodeJS with `brew update && brew install node`
3. In Terminal move to project folder (type `cd folder/` if you named the project folder "folder")
4. Install required NPM packages, type `npm install` in Terminal


## Usage

**Run script with arguments**
* `npm run scrape -- --kw=<KEYWORD> (--headless=false)`
* `node get_mreids.js --kw=<KEYWORD> (--headless=false)`

**Examples**

* `npm run scrape -- --kw=firefox --headless=false`
* `node get_mreids.js --kw=firefox --headless=false`
* `npm run scrape -- --kw=barack+obama`
* `node get_mreids.js --kw=barack+obama`

**What happens here**

* Puppeteer (Headless Browser; Chromium) opens first SERP with input keyword
* We extract MREID if available and look for "Über XX weitere ansehen" link in Knowledge-Graph
* We click that link and get a carousel of entities on next SERP
* We extract urls and names of entities from carousel
* We open each url in new tab, wait for load-event and extract MREID
* We close Browser and export list to CSV / Terminal

## Help & Information

* If something breaks or errors occur during runtime, please ask Philipp at hello@jpigla.de.
* Please use https://knowledgegraphsearch.com/ for ultimate verification of MREID


### Changelog

**22.10.2019** (1.1.3, 1.2.3)
* Fix Xpath for carousel extraction
* Add argument for headless (optional)

**16.10.2019** (1.1.2)
* Fix Xpath for carousel extraction

**11.10.2019** (1.1.1)
* Enhance extraction of MREID from SERP (some entity SERPs show MREID differently, now catch 'em all!) 

**04.10.2019** (1.0.1)
* Fix extraction of MREID from SERP (different approach because of layout change in SERP)

**02.10.2019** (1.0)
* Initial Upload
* Functional version


## License

All assets and code are under the GPL v3 License unless specified otherwise.
