const API_HOST = 'https://api.zhuishushenqi.com'
const STATIC_HOST = 'https://statics.zhuishushenqi.com'
const BOOK_HOST = 'http://novel.juhe.im'

module.exports = {
	//获取大分类
	getCats: API_HOST+'/cats/lv2/statistics',   
	//获取小类
	getMinor: API_HOST+'/cats/lv2',
	//获取分类书籍  @param gender 性别排行（male）type 排行类型（host）major 大类 minor 小类  start 分页开始 
 	getCatsBooks: function(gender,type,major,minor,start) { 
     if (minor) {
       return `${API_HOST}/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=%{minor}&start=${start}&limit=20`
     }else {
       return `${API_HOST}/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`
     }
	}
}