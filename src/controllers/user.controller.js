import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, username, email, password } = req.body;
  console.log("email:", email, password);

  if (
    [fullName, email, username, password].some((filed) => {
      return filed?.trim() === "";
    })
  ) {
    throw new ApiError(400, "all the fields  is required");
  }
  //now lets check if user exist on both fullname and email it will return .
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log(existedUser)
  if (existedUser) {
    throw new ApiError(409, "user with username or email exist");
  }

  //handle files get localpath from multer middleware as we used uload method in route the req has files

  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log(avatarLocalPath);
  //const coverImageLocalePath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverImageLocalPath = req.files.coverImage[0].path
  }
  if (!avatarLocalPath) {
    throw (new ApiError(400, "avatar is required"));
  }

  //upload in cloudnary , it will take time use await so we made the main method async

  const avatar = await uploadCloudinary(avatarLocalPath);
  const coverImage = await uploadCloudinary(coverImageLocalPath);
  
  if (!avatar) {
    throw new ApiError(400, "avatar image is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", //if coverImage? if present then give me url if not then make it empty.
    username: username.toLowerCase(),
    password,
    email
  });
  //another db call it will return an object minus password and refresh token
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
 return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
)
});

export { registerUser };
