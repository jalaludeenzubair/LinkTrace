interface LinkInterface {}

const LinkController = () => ({
  createLink: (payload, ip, ch) => {
    console.log(ip);
    const { url } = payload;
    const queuePayload = {
      url,
      ip,
    };
    console.log(queuePayload);
  },
  deleteLink: () => {},
  getLink: () => {},
  updateLink: () => {},
});

export default LinkController;
