module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  generateBuildId: () => "freeboard_frontend",
  exportPathMap: () => ({
    "/": { page: "/" },
    "/boards": { page: "/boards" },
    "/404": { page: "/404" },
  }),
};
