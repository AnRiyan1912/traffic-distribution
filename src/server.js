const expressApp = require("./expressApp");

const PORT = process.env.PORT || 1919;
const StartServer = async () => {
  expressApp.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    console.log(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("Server is up");
});
