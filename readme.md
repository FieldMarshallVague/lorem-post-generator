Lorem Post Generator
===========

Simple tool for creating a json file of posts containing lorem ipsum text and lorempixel images, to act as a test dataset for UI prototyping feeds.

Usage
-----

Instantiate LoremPostGenerator with a config object then call .generate() with a number of posts.

    const config = {
        startDate: new Date(2000,0,1),
        endDate: new Date(2018,0,11),
        minContentLength: 100,
        maxContentLength: 10000,
        minImages: 0,
        maxImages: 5,
        useLoremImages: true
    }

    const postGenerator = new LoremPostGenerator(config);

    let posts = postGenerator.generate(1000);
