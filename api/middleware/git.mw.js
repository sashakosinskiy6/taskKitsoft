const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

class GitMiddleware {
  async checkRedisData(req, res, next) {
    try {
      const { userName } = req.query;
      if (userName) {
        const isExist = await client.exists(userName);

        if (!isExist) return next();

        const userData = await client.get(userName);
        res.json({ response: JSON.parse(userData) });
      } else {
        res.status(404).send({ response: "Oops user name not entered :)" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new GitMiddleware();
