export class IPost {
    constructor(
      public userId: string,
      public id: string,
      public title: string,
      public body: string,
      public url: string,
      public thumbnailUrl: string
    ) {
        
    }
  }
  