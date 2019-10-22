const puppeteer = require('puppeteer');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');

// ========================== Declare Variables ==========================

const keyword = argv.kw;
const depth = argv.depth;
const output = argv.output;

let time = new Date().toLocaleString("de-DE",{year: 'numeric', month: '2-digit', day: '2-digit'});
let timestamp = new Date().getTime();

// const entity_link_selector = `//a[@class='EbH0bb']/@href`;
const entity_link_selector = `#rhs_block > div.g.rhsvw.kno-kp.mnr-c.g-blk > div.kp-blk.knowledge-panel.Wnoohf.OJXvsb > div > div.ifM9O > div:nth-child(2) > div.NFQFxe.yp1CPe.mod > div.AAXrR.lfNb6b > div.hKuTtf > a`;

let dataToWrite;

// ========================== Declare Functions ==========================

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));


async function go_and_extract_entity_1(browser,page,url,keyword){

    await page.goto(url, {waitUntil: 'load'});
    // await page.waitFor(1000);

    const data_from_page = await page.evaluate(keyword => {
        let entities_tmp = new Object();
        let name_of_entity;
        let mreid;
        let dataAttribute;

        try {
            try {
                dataAttribute_tmp = document.getElementsByClassName("DssFqf OIQuDd")[0];
                dataAttribute_tmp = dataAttribute_tmp.getAttribute('href');
                dataAttribute_tmp = dataAttribute_tmp.match("%3D%2F(.*?)%26hl");
                dataAttribute = dataAttribute_tmp[1];
            } catch (e) { dataAttribute = "No MREID found!";}

            if (dataAttribute == "_"){
                try {
                    dataAttribute_tmp = document.getElementsByClassName("bia")[0].getAttribute('href');
                    dataAttribute = dataAttribute_tmp.split('%252C')[2].split('&vet')[0];
                } catch (e) {
                    dataAttribute = "No MREID found!";
                }
            }

            name_of_entity = document.getElementsByClassName('kno-ecr-pt kno-fb-ctx PZPZlf gsmt')[0].innerText;
            if (name_of_entity.includes('\n') == true) {
                name_of_entity = name_of_entity.replace('\n', ' ');
            }

            if (dataAttribute)
                mreid = dataAttribute.replace(/%2F/g, '/');
        } catch (e) {
            name_of_entity = keyword;
            mreid = "0";
        }

        return {
            entity: mreid,
            entity_name: name_of_entity
        };

    },keyword);

    await page.waitFor(1000);
    const entity = data_from_page.entity;
    const entity_name = data_from_page.entity_name;
    
    return {
        entity: entity,
        entity_name: entity_name
    };

};

async function go_and_extract_entity(browser,url,keyword){

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36');

    await page.setViewport({
        width: 1920,
        height: 1080
    });

    await page.goto(url, {waitUntil: 'load'});
    // await page.waitFor(1000);

    const data_from_page = await page.evaluate(keyword => {
        let entities_tmp = new Object();
        let name_of_entity;
        let mreid;
        let dataAttribute;

        try {
            try {
                dataAttribute_tmp = document.getElementsByClassName("DssFqf OIQuDd")[0];
                dataAttribute_tmp = dataAttribute_tmp.getAttribute('href');
                dataAttribute_tmp = dataAttribute_tmp.match("%3D%2F(.*?)%26hl");
                dataAttribute = dataAttribute_tmp[1];
            } catch (e) { dataAttribute = "No MREID found!";}

            if (dataAttribute == "_"){
                try {
                    dataAttribute_tmp = document.getElementsByClassName("bia")[0].getAttribute('href');
                    dataAttribute = dataAttribute_tmp.split('%252C')[2].split('&vet')[0];
                } catch (e) {
                    dataAttribute = "No MREID found!";
                }
            }
            
            name_of_entity = document.getElementsByClassName('kno-ecr-pt kno-fb-ctx PZPZlf gsmt')[0].innerText;
            if (name_of_entity.includes('\n') == true) {
                name_of_entity = name_of_entity.replace('\n', ' ');
            }

            if (dataAttribute)
                mreid = dataAttribute.replace(/%2F/g, '/');
        } catch (e) {
            name_of_entity = keyword;
            mreid = "0";
        }

        return {
            entity: mreid,
            entity_name: name_of_entity
        };

    },keyword);

    await page.waitFor(1000);
    const entity = data_from_page.entity;
    const entity_name = data_from_page.entity_name;

    await page.close();

    return {
        entity: entity,
        entity_name: entity_name
    };

};


async function click_carousel_link(page,entity_link_selector) {

    let response;
    await page.waitFor(1000);

    try {
        const [response] = await Promise.all([
            page.waitForNavigation({waitUntil: 'load'}),
            page.click(entity_link_selector),
        ]);
        return response;
    } catch (e) {
        return response = false;
    }

};



async function get_entity_links(page) {

    const xpath_expression_url = '//g-scrolling-carousel/div[1]/div/a/@href';

    await page.waitForXPath(xpath_expression_url);
    const carousel_urls = await page.$x(xpath_expression_url);

    const carousel_links = await page.evaluate((...carousel_urls) => {

        return carousel_urls.map(e => 'https://www.google.de'+e.nodeValue);

    }, ...carousel_urls);

    return carousel_links;

};

async function get_entity_name(page) {

    const xpath_expression_name = '//g-scrolling-carousel/div[1]/div/a';

    await page.waitForXPath(xpath_expression_name);
    const carousel_names1 = await page.$x(xpath_expression_name);

    const carousel_names = await page.evaluate((...carousel_names1) => {
        
        return carousel_names1.map(e => e.innerText);

    }, ...carousel_names1);

    for(var i = 0; i < carousel_names.length; i++){
        carousel_names[i] = carousel_names[i].replace('\n', ' ');
    }

    return carousel_names;

};



// ========================== Main Functions ==========================

(async function() {
    const keyword = argv.kw;
    let headless_arg = argv.headless;

    if (headless_arg == undefined || headless_arg !== "false") {
        headless_value = true;
    } else if (headless_arg == "false") {
        headless_value = false;
    }

    await puppeteer.launch({headless: headless_value, args: ['--incognito']}).then(async browser => {

        entities = new Object();

        let url = 'https://www.google.de/search?pws=0&no_sw_cr=1&q='+keyword;

        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36');

        await page.setViewport({
            width: 1920,
            height: 1080
        });

        const entity_1 = await go_and_extract_entity_1(browser,page,url,keyword);
        console.log('Starting Point: '+entity_1.entity_name+' ('+entity_1.entity+')');
        entities[entity_1.entity_name] = entity_1.entity;

        const entity_link_check = await click_carousel_link(page,entity_link_selector);
        if (entity_link_check == false){
            console.log(entities);
            console.log('No (more) Entities found!');
            await page.close();
            await browser.close();
            process.exit(0);
        }

        const carousel_links = await get_entity_links(page);
        const carousel_names = await get_entity_name(page);

        // console.log(carousel_names);
        // console.log(carousel_links);

        i=0;
        await asyncForEach(carousel_links, async (link) => {
            await waitFor(1000);
            const data_tmp = await go_and_extract_entity(browser,link,carousel_names[i]);
            entities[data_tmp.entity_name] = data_tmp.entity;
            console.log('New Entity found: '+data_tmp.entity_name+' ('+data_tmp.entity+')');
            i++;
        });

        await page.waitFor(1000);

        await page.close();
        await browser.close();

        // console.log(entities);
        return entities;
    });

    console.log('\n');

    let names = Object.keys(entities);
    let mreids = Object.values(entities);
    let count_entities = names.length;
    let entity;
    let csv_filename = 'entity_list_'+keyword+'_'+timestamp+'.csv';

    console.log(count_entities+' MREIDs were collected.');

    i=0;
    names.forEach(name => {
        entity += decodeURIComponent(name+';'+mreids[i]+'\n');
        i++;
    });

    entity = entity.slice(9);
    entity = 'Entity-Name;MREID\n'+entity;

    fs.writeFile(csv_filename, entity, 'utf8', function (err) {
        if (err) {
          console.log('Some error occured while trying to save data to CSV!');
        } else{
          console.log('Data was saved successfully to CSV! ('+csv_filename+')');
        }
      });

})();