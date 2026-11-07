const PROXY_CONFIG = [
  {
    context: ["/weatherforecast", "/api"],
    target: "https://localhost:7217",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  }
];

module.exports = PROXY_CONFIG;
