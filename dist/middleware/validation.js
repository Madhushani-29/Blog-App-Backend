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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMyBlogRequest = exports.validateMyUserRequest = void 0;
const express_validator_1 = require("express-validator");
//middleware designed to handle validation errors generated by the Express Validator library
const handleValidationErrors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});
exports.validateMyUserRequest = [
    (0, express_validator_1.body)("firstName").isString().notEmpty().withMessage("first name must be a string"),
    (0, express_validator_1.body)("lastName").isString().notEmpty().withMessage("last name must be a string"),
    (0, express_validator_1.body)("email").isString().notEmpty().withMessage("email must be a string"),
    handleValidationErrors,
];
exports.validateMyBlogRequest = [
    (0, express_validator_1.body)("title").isString().notEmpty().withMessage("Country is required"),
    (0, express_validator_1.body)("content")
        .isString()
        .notEmpty()
        .withMessage("Restaurant Name is required"),
    handleValidationErrors,
];
//# sourceMappingURL=validation.js.map