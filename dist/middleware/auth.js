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
exports.jwtParse = exports.firebaseAuthCheck = void 0;
const user_1 = __importDefault(require("../models/user"));
const firebase_config_1 = __importDefault(require("../config/firebase-config"));
const firebaseAuthCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.sendStatus(401);
    }
    const token = authorization.split(" ")[1];
    try {
        const decodedToken = yield firebase_config_1.default.auth().verifyIdToken(token);
        req.firebaseUID = decodedToken.uid;
        next();
    }
    catch (error) {
        console.error("Error verifying Firebase ID token:", error);
        return res.sendStatus(401);
    }
});
exports.firebaseAuthCheck = firebaseAuthCheck;
const jwtParse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firebaseUID } = req;
    try {
        const user = yield user_1.default.findOne({ uid: firebaseUID });
        if (!user) {
            console.error("User not found for firebaseUID:", firebaseUID);
            return res.sendStatus(401);
        }
        req.userID = user._id.toString();
        next();
    }
    catch (error) {
        console.error("Error parsing JWT:", error);
        return res.sendStatus(401);
    }
});
exports.jwtParse = jwtParse;
//# sourceMappingURL=auth.js.map