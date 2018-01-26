import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';

import { LoremPostGeneratorConfig } from './lorem-post-generator-config';
import { Post } from './post';

export class LoremPostGenerator {
  private config: LoremPostGeneratorConfig = {
    startDate: new Date(2000, 0, 1),
    endDate: new Date(),
    textTemplate:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/>',
    minContentLength: 10,
    maxContentLength: 2000,
    minImages: 0,
    maxImages: 0.51,
    useLoremImages: true,
    minAsyncDelay: 10,
    maxAsyncDelay: 500,
    streamPageSize: 5
  };

  constructor(configOverride: object) {
    Object.assign(this.config, configOverride);
  }

  /**
   * get some posts synchronously
   */
  generate(numberOfPosts: number) {
    return this.generatePosts(numberOfPosts).sort(this.sortPosts);
  }

  /**
   * create an observable to use with async subscribers
   * @param numberOfPosts
   */
  generateAsync(numberOfPosts: number) {
    return Observable.create((observer: Observer<Post[]>) => {
      const genPosts = this.generatePosts(numberOfPosts);
      genPosts.sort(this.sortPosts);

      observer.next(genPosts);
    });
  }

  /**
   * stream a growing list of posts (i.e. simulate adding new posts in real time)
   */
  generateSubject(numberOfPosts: number): BehaviorSubject<Post[]> {
    // get all posts first and sort them by date
    const genPosts = this.generatePosts(numberOfPosts);
    genPosts.sort(this.sortPosts);

    // then split them by pages to a subject
    const postSubject = new BehaviorSubject<Post[]>([]);
    let posts: Post[] = [];

    for (let i = 0; i < genPosts.length; i += this.config.streamPageSize) {
      // oooh, edgy!
      setTimeout(() => {
        const pageOfPosts = genPosts.slice(i, i + this.config.streamPageSize);
        console.log(`${i} ${posts.length}`);
        posts = [...posts, ...pageOfPosts];
        postSubject.next(posts);
      }, this.config.maxAsyncDelay * (i === 0 ? 1 : i / 5));
    }

    return postSubject;
  }

  private sortPosts(a: Post, b: Post): number {
    if (a.creationDate > b.creationDate) {
      return -1;
    } else if (a.creationDate < b.creationDate) {
      return 1;
    } else {
      return 0;
    }
  }

  private generatePosts(numberOfPosts: number): Post[] {
    console.log(`generating ${numberOfPosts} posts...`);

    let posts: Post[] = [];

    for (let i = 0; i < numberOfPosts; i++) {
      posts.push(this.generatePost());
    }

    return posts;
  }

  private generatePost(): Post {
    const numImages = this.randomNumberBetween(
      this.config.minImages,
      this.config.maxImages
    );
    const textLength = this.randomNumberBetween(
      this.config.minContentLength,
      this.config.maxContentLength
    );

    return {
      creationDate: this.randomDate(this.config.startDate, this.config.endDate),
      author: 'Mr. Writer',
      body: this.getBodyContent(textLength, numImages),
      title: this.getLoremText(this.randomNumberBetween(10, 50)),
      tags: 'tag-1, tag-2, tag-3'
    };
  }

  /**
   * get text and splice the images in at random intervals
   */
  private getBodyContent(textLength: number, numImages: number): string {
    let contentPieces: string[] = [];
    let text = this.getLoremText(textLength);
    let imgIndex: number[] = new Array(numImages);
    imgIndex.fill(0);
    imgIndex = imgIndex
      .map(item => {
        return this.randomNumberBetween(0, textLength);
      })
      .sort();

    if (imgIndex.length === 0) {
      contentPieces.push(text);
    } else {
      let placeHolder = 0;

      for (let i = 0; i < imgIndex.length * 2; i++) {
        contentPieces.push(text.slice(placeHolder, imgIndex[i]));
        placeHolder = imgIndex[i];
        contentPieces.push(this.getLoremImage());
        i++;
      }
    }

    return contentPieces.join('</br>');
  }

  /**
   * Use the template text to generate a string matching [length]
   */
  private getLoremText(length: number): string {
    const templateLength = this.config.textTemplate.length;
    let templateMultiplier = 1;

    if (length > templateLength) {
      templateMultiplier = Math.ceil(length / templateLength);
    }

    return this.config.textTemplate.repeat(templateMultiplier).slice(0, length);
  }

  private getLoremImage(): string {
    if (this.config.useLoremImages) {
      return `<img src="//picsum.photos/600/400" width="600" height="400">`;
    } else {
      return `<img src="" width="600" height="400" style="background-color:red">`;
    }
  }

  private randomNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1) + min);
  }

  private randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
}
