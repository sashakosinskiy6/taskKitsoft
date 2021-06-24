const { Router } = require("express");
const router = Router();
const GitController = require("../controller/git.controller");
const GitMiddleware = require("../middleware/git.mw");
const TestController = require("../controller/test.controller");
/**
 * Route for test like Redis Ping->Pong
 */
router.get("/test", TestController.getPing);
/**
 * Route for get users project
 */
router.get(
  "/gitlab/projects",
  GitMiddleware.checkRedisData,
  GitController.getUserByUsername
);

module.exports = router;
