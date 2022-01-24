module.exports = {
  client: {
    includes: ["src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "Movie-Quiz-Deployed",
      url: "https://movie-quiz-madstone.herokuapp.com",
    },
  },
};
