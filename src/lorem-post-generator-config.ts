
export interface LoremPostGeneratorConfig {
    startDate: Date,
    endDate: Date,
    textTemplate: string;
    minContentLength: number,
    maxContentLength: number,
    minImages: number,
    maxImages: number,
    useLoremImages: boolean
}