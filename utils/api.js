const API_HOST = 'https://api.zhuishushenqi.com' //接口地址

module.exports = {
  STATIC_HOST: 'https://statics.zhuishushenqi.com', //静态资源地址
  classification: {
    //获取大分类
    getCats: API_HOST + '/cats/lv2/statistics',
    //获取小类
    getMinor: API_HOST + '/cats/lv2',
    //获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
    getCatsBooks: function (gender, type, major, minor, start) {
      if (minor) {
        return `${API_HOST}/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`
      } else {
        return `${API_HOST}/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`
      }
    }
  },
  book: {
    // 书籍详情
    bookInfo: function (book_id) { // @param book_id 书籍id
      return API_HOST + '/book/' + book_id
    },
    // 相关推荐
    relatedRecommendedBooks: function (book_id) { // @param book_id 书籍id
      return `${API_HOST}/book/${book_id}/recommend`
    },
    // 作者名下的书籍
    authorBooks: function (author) {   // @param author 作者名
      return `${API_HOST}/book/accurate-search?author=${author}`
    },
    // 书源  注意：第一个优质书源为收费源
    bookSources: function (book_id) {  // @param book_id 书籍id
      return `${API_HOST}/atoc?view=summary&book=${book_id}`
    },
    // 书籍章节 根据书源id
    bookChapters: function (id) {  // @param id 书源id
      return `${API_HOST}/atoc/${id}?view=chapters`
    },
    // 书籍章节 根据书id
    bookChaptersBookId: function (book_id) {
      return `${API_HOST}/mix-atoc/${book_id}?view=chapters`
    },
    // 章节内容
    chapterContent: function (link) {  // @param link 章节link
      return `https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`
    },
    //搜索热词
    hotWord: API_HOST + '/book/hot-word',
    // 书籍搜索 (分类，书名，作者名)
    bookSearch: function (content) { //@param content 搜索内容
      return `${API_HOST}/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`
    }
  },
  rank: {
    // 排名分类
    rankCategory: `${API_HOST}/ranking/gender`,
    // 排名详情
    rankInfo: function (rank_id) { //@param rank_id 分类ID
      return `${API_HOST}/ranking/${rank_id}`
    }
  },
  comment: {
    // 讨论
    discussions: function (book_id) {  // @param book_id 书籍id
      return `${API_HOST}/post/by-book?book=${book_id}`
    },
    // 短评
    shortReviews: function (book_id) {  // @param book_id 书籍id    完整接口 ?book=5816b415b06d1d32157790b1&limit=20&total=true&start=0&sortType=hottest
      return `${API_HOST}/post/short-review?book=${book_id}&total=true&sortType=newest`
    },
    //长评
    bookReviews: function (book_id) {  // @param book_id 书籍id
      return `${API_HOST}/post/review/by-book?book=${book_id}`
    },
  },
  bookList: {
    lists: `${API_HOST}/book-list`,
    detail: function (id) {  // @param id 书单id
      return `${API_HOST}/book-list/${book_id}`
    }
  }
}