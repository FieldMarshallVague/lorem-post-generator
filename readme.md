# Lorem Post Generator

Simple tool for creating a json file of posts containing lorem ipsum text and lorempixel images, to act as a test dataset for UI prototyping feeds.

## Usage

Instantiate LoremPostGenerator with a config object then call .generate() with a number of posts.

    // choose one of the following imports depending on your use case
    var lpg = require("lorempostgen");                  // NodeJS (Imports not support yet)
    import {LoremPostGenerator} from 'lorempostgen';    // Typescript/Babel-fied JS

    const config = {
        startDate: new Date(2000,0,1),
        endDate: new Date(2018,0,11),
        textTemplate: "blah blah blah...",
        minContentLength: 100,
        maxContentLength: 10000,
        minImages: 0,
        maxImages: 5,
        useLoremImages: true,
        minAsyncDelay: 0,
        maxAsyncDelay: 200,
        streamPageSize: 5
    }

    // choose one of the following instantiations depending on your use case
    const postGenerator = new lpg.LoremPostGenerator(config);   // NodeJS
    const postGenerator = new LoremPostGenerator(config);       // Typescript

    // Synchronous
    let posts = postGenerator.generate(1000);

    // Rx Observable
    let asyncPosts = postGenerator.generateAsync(100);

    // Rx BehaviorSubject with [maxAsyncDelay] between pages of [streamPageSize]
    let streamedPosts = postGenerator.generateSubject(100);

### startDate and endDate

The date range boundaries to generate posts within.

### textTemplate

The source text to use for the post body.  This defaults to the first paragraph of Lorem Ipsum text.

### min and maxContentLength

The textTemplate is repeated as necessary to have a length between min and maxContentLength.

### min and maxImages

Images are placed randomly within the post body, to give the overall feed an authentic look.

### useLoremImages

You can use Lorem images from Picsum or just default to empty image placeholders.

### minAsyncDelay

Not implemented yet

### maxAsyncDelay

Used for the delay in each page being emitted by generateSubject's stream

### streamPageSize

The size of each page emitted by generateSubject
