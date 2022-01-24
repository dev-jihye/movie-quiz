module.exports = {
  client: {
    includes: ["src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "Movie-Quiz-Deployed",
      url: "https://movie-quiz-madstone.herokuapp.com",
    },
    headers: {
      authorization: "Bearer HpFbOUyIxqUgkBowUSlWBg",
    },
    // optional disable SSL validation check
    skipSSLValidation: true,
  },
};
