const axios = require("axios");
const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();
require("dotenv").config();

class GitService {
  /**
   *
   * @param {string} userName
   * @returns User projects
   */
  async getUserProjects(userName) {
    try {
      const { data } = await axios.get(
        `${process.env.GIT_LUB_API}users?username=${userName}`
      );

      if (data.length === 0) {
        return "We cannot find a user with this name or it does not exist :)";
      }
      const userProjects = await axios.get(
        `${process.env.GIT_LUB_API}users/${data[0].id}/projects`
      );

      let filterDataArray = userProjects.data.map((elem) => {
        return {
          name: elem.name,
          description: elem.description,
          links: {
            ssh: elem.ssh_url_to_repo,
            http: elem.http_url_to_repo,
            web: elem.web_url,
          },
          readme: elem.readme_url,
        };
      });

      await client.set(userName, JSON.stringify(filterDataArray), "EX", 60);

      return filterDataArray;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new GitService();
