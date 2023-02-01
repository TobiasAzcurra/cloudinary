import React, { useState } from "react";
import axios from "axios";
import Img from "./Img";
//to make a server request

const App = () => {
	const [file, setFile] = useState("");
	//after we finish making the reader read our file and turn it into an image we will update the image
	const [image, setImage] = useState("");
	const [uploadedImg, setUploadedImg] = useState("");

	function previewFiles(file) {
		//we need first to set up a reader. The reader is the integration the api that enable you to read a file like an image like any file thats coming from the input, you always need a FileReader to turn it into a url return it to a buffer or turn it to anything that you need to preview on your application.
		// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
		// in the page we can see the amount of things that we can do with the FileReader. We gonna need de method readAsDataUrl()
		const reader = new FileReader();
		reader.readAsDataURL(file);

		//we need to wait for when it loads (reader.on and we can see a lot of functions). We will wait until the load of the file ends and after it ends, this is actually an event listener so it will give me a function
		reader.onloadend = () => {
			//we will take the results, and as we seen in the mozilla, the results has a ready state of 0 and 1 and 2 and onloadended the result of course will be 2. This has our file already transmitted it
			setImage(reader.result);
			console.log(image);
		};
	}

	const handleChange = (e) => {
		//the files will be on the files of the target, the 0 key is the one we need
		// console.log(e.target.files);
		const file = e.target.files[0];
		//to use 'file' we need to convert it into something readable by javascript. We need a reading file system, which is actually provided by file system api from the mdn mozilla developer network
		setFile(file);
		previewFiles(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await axios.post("http://localhost:8001", {
			//we gonna sent something called image which is actually coming from the state, so image is a string which will be sent with a property of image. We can actually just put image here but I dont want that because I want a property to store the image because the image itself is actually just like an imagebase64 and u saw how big is that, so we need a property to hold this image inside it
			image: image,
		});
		try {
			//we just need the data bc u know that axios send a lot of things
			// console.log(result.data);

			//I need the public_id. This component will return me back an image
			const uploadedImage = result.data.public_id;
			setUploadedImg(uploadedImage);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="container mt-5 align-items-center justify-content-center">
				<h2>Hello, Welcome on this Cloudinary course</h2>
				<form onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor="fileInput">Upload your photo here</label>
					<input
						type="file"
						id="fileInput"
						onChange={(e) => handleChange(e)}
						required
					/>
					<button className="btn btn-primary">Submit</button>
				</form>
			</div>
			<img src={image} alt="" />
			<Img uploadedImage={uploadedImg} />
		</>
	);
};

export default App;
