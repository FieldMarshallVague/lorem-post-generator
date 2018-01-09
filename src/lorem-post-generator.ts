export interface LoremPostGeneratorConfig {
    minContentLength: number,
    maxContentLength: number,
    minImages: number,
    maxImages: number
}

export class LoremPostGenerator {
    name: string = 'test';

    constructor(private config: LoremPostGeneratorConfig){
    }

    generate(numberOfPosts: number, config?: LoremPostGeneratorConfig){
        console.log('generating posts...');
    }

}