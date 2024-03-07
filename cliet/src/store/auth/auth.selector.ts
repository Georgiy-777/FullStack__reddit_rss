const getIsAdmin = () => (state: any) => state.admin ? state.admin.isAdmin : false;

const adminSelectors = {
  getIsAdmin
};

export default adminSelectors;
