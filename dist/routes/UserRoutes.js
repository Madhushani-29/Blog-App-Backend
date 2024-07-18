"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
});
router.get("/", auth_1.firebaseAuthCheck, auth_1.jwtParse, UserController_1.default.getCurrentUser);
router.post("/", auth_1.firebaseAuthCheck, UserController_1.default.createUser);
router.put("/", upload.single("imageFile"), auth_1.firebaseAuthCheck, auth_1.jwtParse, validation_1.validateMyUserRequest, UserController_1.default.updateCurrentUser);
exports.default = router;
//# sourceMappingURL=UserRoutes.js.map