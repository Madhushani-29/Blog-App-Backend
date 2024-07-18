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
const user_1 = __importDefault(require("../models/user"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" }).send();
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error finding the user" });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.firebaseUID;
        const existingUser = yield user_1.default.findOne({ uid });
        if (existingUser) {
            return res.status(200).json({ message: "User already exists" }).send();
        }
        const newUser = new user_1.default(Object.assign(Object.assign({}, req.body), { uid }));
        yield newUser.save();
        res.status(201).json(newUser.toObject());
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
});
const updateCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" }).send();
        }
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        if (req.file) {
            const imageUrl = yield uploadImage(req.file);
            user.imageUrl = imageUrl;
        }
        const updatedUser = yield user_1.default.findByIdAndUpdate(user._id, user, {
            new: true,
        });
        res.status(201).json(updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user" });
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
    getCurrentUser,
    createUser,
    updateCurrentUser,
};
//# sourceMappingURL=UserController.js.map