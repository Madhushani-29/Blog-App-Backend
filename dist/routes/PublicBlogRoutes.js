"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PublicBlogController_1 = __importDefault(require("../controller/PublicBlogController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/", auth_1.firebaseAuthCheck, auth_1.jwtParse, PublicBlogController_1.default.getAllBlogs);
exports.default = router;
//# sourceMappingURL=PublicBlogRoutes.js.map