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
const cloudinary_1 = __importDefault(require("cloudinary"));
const user_1 = __importDefault(require("../models/user"));
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userID);
        let imageUrl = "";
        if (!user) {
            return res.status(400).json({ message: "User not found" }).send();
        }
        if (req.file) {
            imageUrl = yield uploadImage(req.file);
        }
        const newBlog = new blog_1.default(Object.assign(Object.assign({}, req.body), { imageUrl, user: req.userID }));
        yield newBlog.save();
        res.status(201).json(newBlog.toObject());
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating blog" });
    }
});
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" }).send();
        }
        const blogs = yield blog_1.default.find({ user: req.userID });
        res.status(200).json(blogs);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching blogs" });
    }
});
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" }).send();
        }
        const blog = yield blog_1.default.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" }).send();
        }
        blog.title = req.body.title;
        blog.content = req.body.content;
        if (req.file) {
            const imageUrl = yield uploadImage(req.file);
            blog.imageUrl = imageUrl;
        }
        const updatedBlog = yield blog_1.default.findByIdAndUpdate(req.params.id, blog, {
            new: true,
        });
        res.status(201).json(updatedBlog);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating blog" });
    }
});
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" }).send();
        }
        const blog = yield blog_1.default.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" }).send();
        }
        if (blog.user.toString() != req.userID) {
            res.status(403);
            throw new Error("User doesn't have permission to delete that contact");
        }
        yield blog_1.default.deleteOne({ _id: req.params.id });
        res.status(200).json();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting blog" });
    }
});
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = yield cloudinary_1.default.v2.uploader.upload(dataURI);
    return uploadResponse.url;
});
exports.default = {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
};
//# sourceMappingURL=BlogController.js.map