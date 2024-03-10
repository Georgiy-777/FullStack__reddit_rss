/* This code snippet is setting up a Redux store using Redux Toolkit and redux-persist for state
management in a TypeScript environment. Here's a breakdown of what each part is doing: */
const getArticle = () => (state: any) => state.article?.article;
const getArticles = () => (state: any) => state.article?.articles;



const articlesSelectors = {
  getArticle,
  getArticles
};

export default articlesSelectors;
