module.exports = class PostStore {
  constructor() {
    this.posts = [];
    console.log("loading...")
  }

  all() {
    return this.posts;
  }
}
