const getArticle = () => (state: any) => state.article?.article;
const getArticles = () => (state: any) => state.article?.articles;



const articlesSelectors = {
  getArticle,
  getArticles
};

export default articlesSelectors;
