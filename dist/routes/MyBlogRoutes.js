"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BlogController_1 = __importDefault(require("../controller/BlogController"));
const multer_1 = __importDefault(require("multer"));
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
router.post("/", upload.single("imageFile"), auth_1.firebaseAuthCheck, auth_1.jwtParse, validation_1.validateMyBlogRequest, BlogController_1.default.createBlog);
router.get("/", auth_1.firebaseAuthCheck, auth_1.jwtParse, BlogController_1.default.getBlogs);
router.put("/:id", upload.single("imageFile"), auth_1.firebaseAuthCheck, auth_1.jwtParse, BlogController_1.default.updateBlog);
router.delete("/:id", auth_1.firebaseAuthCheck, auth_1.jwtParse, BlogController_1.default.deleteBlog);
exports.default = router;
//# sourceMappingURL=MyBlogRoutes.js.map