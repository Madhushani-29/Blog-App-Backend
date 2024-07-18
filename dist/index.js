"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const MyBlogRoutes_1 = __importDefault(require("./routes/MyBlogRoutes"));
const PublicBlogRoutes_1 = __importDefault(require("./routes/PublicBlogRoutes"));
const cloudinary_1 = require("cloudinary");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
(0, dbConnection_1.default)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "Success ok" });
}));
app.get("/healthz", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "Health is ok" });
}));
app.use("/api/my/user", UserRoutes_1.default);
app.use("/api/my/blogs", MyBlogRoutes_1.default);
app.use("/api/public/blogs", PublicBlogRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=index.js.map