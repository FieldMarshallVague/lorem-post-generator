Lorem Post Generator
===========

Simple tool for creating a json file of posts containing lorem ipsum text and lorempixel images, to act as a test dataset for UI prototyping feeds.

Usage
-----

Instantiate LoremPostGenerator with a config object then call .generate() with a number of posts.  Alternatively, you can pass the config into the generate method itself, along with the number of posts required.

    const config = {
        minContentLength: 100,
        maxContentLength: 10000,
        minImages: 0,
        maxImages: 5
    }

    const postGenerator = new LoremPostGenerator(config);

    let results = postGenerator.generate(1000);
