module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "movie-quiz",
      url: "https://movie-quiz-madstone.herokuapp.com/",
    },
  },
};
