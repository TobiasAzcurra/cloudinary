require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const cloudinary = require("./cloudinary/cloudinary");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", (req, res) => {
	res.send("welcome to this page");
});

app.post("/", async (req, res) => {
	// console.log(req.body);
	//I will start to upload this image inside Cloudinary
	const { image } = req.body;

	const uploadedImage = await cloudinary.uploader.upload(
		image,
		{
			upload_preset: "unsigned_uploads",
			//if u have a form and u have a username it will be a good practice that the public id has the username plus the word avatar. Also we gonna need it because the public id is what we will send to the database and the frontend
			// public_id: `${username}Avatar`,
			public_id: `Avatar`,
			//here we prevents the user from uploading any files other than images
			allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
		},
		function (error, result) {
			if (error) {
				console.log(error);
			}
			console.log(result);
		}
	);

	try {
		//if we see what we got in the console of google we have an object where is a public_id: 'User_Avatar/Avatar'. User_Avatar is the folder and Avatar the public id we set above. We can send it to the database and save the user with this
		res.status(200).json(uploadedImage);
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, (_) => console.log(`app is listening on port ${port}`));
