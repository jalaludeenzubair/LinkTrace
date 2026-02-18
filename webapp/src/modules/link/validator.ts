const LinkValidator = () => ({
  createLink: (payload) => {
    const { url } = payload;
    if (!url) {
      throw new Error('URL is required');
    }
  },
  deleteLink: (payload) => {
    const { id } = payload;
    if (!id) {
      throw new Error('ID is required');
    }
  },
  getLink: (id) => {
    if (!id) {
      throw new Error('ID is required');
    }
  },
});

export default LinkValidator;
