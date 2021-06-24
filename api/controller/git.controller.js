const gitService = require("../services/git.service");

class GitController {
  async getUserByUsername(req, res, next) {
    try {
      const { userName } = req.query;

      const data = await gitService.getUserProjects(userName);

      res.status(200).json({ response: data });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new GitController();
