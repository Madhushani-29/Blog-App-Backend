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
const blog_1 = __importDefault(require("../models/blog"));
const user_1 = __importDefault(require("../models/user"));
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" }).send();
        }
        const blogs = yield blog_1.default.find({}).populate("user", "firstName lastName imageUrl email");
        res.status(200).json(blogs);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching blogs" });
    }
});
exports.default = { getAllBlogs };
//# sourceMappingURL=PublicBlogController.js.map