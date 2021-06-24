class TestController {
  async getPing(req, res, next) {
    try {
      res.status(200).json({ data: "pong" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new TestController();
