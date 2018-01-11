
/**
 * A single post, comprising date, title, body, author etc.
 */
export interface Post {
    creationDate: Date,
    author: string,
    title: string,
    body: string,
    tags: string
}

export interface LoremPostGeneratorConfig {
    startDate: Date,
    endDate: Date,
    minContentLength: number,
    maxContentLength: number,
    minImages: number,
    maxImages: number,
    useLoremImages: boolean
}

export class LoremPostGenerator {
    private lorem: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/>";

    constructor(private config: LoremPostGeneratorConfig){
    }

    generate(numberOfPosts: number){
        return this.generatePosts(numberOfPosts);
    }

    private generatePosts(numberOfPosts: number): Post[] {
        console.log(`generating ${numberOfPosts} posts...`);

        let posts: Post[] = [];

        for (let i = 0; i < numberOfPosts; i++){
            posts.push(this.generatePost());
        }

        return posts;
    }

    private generatePost(): Post {
        
        const numImages = this.randomNumberBetween(this.config.minImages, this.config.maxImages)
        const textLength = this.randomNumberBetween(this.config.minContentLength, this.config.maxContentLength);

        return {
            creationDate: this.randomDate(this.config.startDate, this.config.endDate),
            author: "Mr. Writer",
            body: this.getBodyContent(textLength, numImages),
            title: this.getLoremText(this.randomNumberBetween(10, 50)),
            tags: "tag-1, tag-2, tag-3"
        }
    }

    private getBodyContent(textLength: number, numImages: number): string {
        // get text and splice the images in at random intervals
        let contentPieces: string[] = [];
        let text = this.getLoremText(textLength);
        let imgIndex: number[] = new Array(numImages);
        imgIndex.map(() => this.randomNumberBetween(0, textLength)).sort();

        for (let i=0, j=0; i<imgIndex.length*2; i++, j++){
            contentPieces[i] = text.slice(0, imgIndex[i]);
            contentPieces[i++] = this.getLoremImage();
        }

        return contentPieces.join("</br>");
    }

    /**
     * Use the template text to generate a string matching [length]
     */
    private getLoremText(length: number): string {
        const templateLength = this.lorem.length;
        let templateMultiplier = 1;

        if (length > templateLength){
            templateMultiplier = Math.ceil(length / templateLength);
        }

        return this.lorem.repeat(templateMultiplier).slice(0, length);
    }

    private getLoremImage(): string {
        if (this.config.useLoremImages){
            return `<img src="//picsum.photos/600/400" width="600" height="400">`
        }
        else{
            return `<img src="" width="600" height="400" style="background-color:red">`
        }
    }

    private randomNumberBetween(min: number, max: number){
        return Math.floor((Math.random() * max + 1) + min);
    }

    private randomDate(start: Date, end: Date) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
}