# Lorem Post Generator

Simple tool for creating a json file of posts containing lorem ipsum text and lorempixel images, to act as a test dataset for UI prototyping feeds.

## Usage

Instantiate LoremPostGenerator with a config object then call .generate() with a number of posts.

    const config = {
        startDate: new Date(2000,0,1),
        endDate: new Date(2018,0,11),
        textTemplate: "blah ",
        minContentLength: 100,
        maxContentLength: 10000,
        minImages: 0,
        maxImages: 5,
        useLoremImages: true
        minAsyncDelay: 0,
        maxAsyncDelay: 200,
        streamPageSize: 5
    }

    const postGenerator = new LoremPostGenerator(config);

    let posts = postGenerator.generate(1000);

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