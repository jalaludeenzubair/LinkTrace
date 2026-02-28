const ViewValidator = () => ({
  getLinks: (payload: any, user) => {
    const { limit, page } = payload;
    if (!limit) {
      throw new Error('Limit is required');
    }
    if (!page) {
      throw new Error('Page is required');
    }
  },
  getDetails: (id: string, user: any) => {
    if (!id) {
      throw new Error('ID is required');
    }
  },
});

export default ViewValidator;
