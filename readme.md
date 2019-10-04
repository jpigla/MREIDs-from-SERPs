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

1. Download main file [get_mreids.js](https://raw.githubusercontent.com/jpigla/MREIDs-from-SERPs/master/get_mreids.js) with "Right save as..." in new folder called "**mreids**" within your home directory
2. Check if Node and NPM are already installed
  * Open Terminal
  * Type `node -v` in Terminal to check NodeJS version number (and if installed already)
  * Type `npm -v` in Terminal to check NPM-Manager version number (and if installed already)
  * **If not**, install Homebrew (from https://brew.sh/index_de) and then NodeJS with `brew update && brew install node`
3. Within Terminal move to that folder (type `cd mreids/`)
4. Install required NPM packages, type `npm install puppeteer minimist` in Terminal


## Usage

**Run script with arguments**
`node get_mreids.js --kw=<KEYWORD>`

**Examples**

* `node get_mreids.js --kw=firefox`
* `node get_mreids.js --kw=barack+obama`

**What happens here**

* Puppeteer (Headless Browser; Chromium) opens first SERP with input keyword
* We extract MREID if available and look for "Über XX weitere ansehen" Link in Knowledge-Graph
* We click that link and get a carousel of entities on next SERP
* We extract urls and names of entities from carousel
* We open each url in new tab, wait for load-event and extract MREID
* We clode Browser and export List to CSV / Terminal

## Help & Information

* If something breaks or errors occur during runtime, please ask Philipp at hello@jpigla.de.
* Please use https://knowledgegraphsearch.com/ for ultimate verification of MREID


### Changelog

**04.10.2019**
* Fixed extraction of MREID from SERP (**new way** because Google changed data available in SERPs)

**02.10.2019**
* Initial Upload
* Functional version


## License

All assets and code are under the GPL v3 License unless specified otherwise.
