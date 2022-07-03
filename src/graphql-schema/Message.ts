export type MessageArgs = { content: string; author: string };

export class Message {
  public content: string;
  public author: string;
  constructor(public id: string, { content, author }: MessageArgs) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}
