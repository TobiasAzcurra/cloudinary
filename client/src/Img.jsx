import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

// Import required qualifiers.

import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

const Img = ({ uploadedImage }) => {
	// Create and configure your Cloudinary instance.
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dqgz49ox3",
		},
	});

	// Use the image with public ID, 'front_face'.

	//remember, the uploadedImage is just an id, its not an image, because we will not handle that offline, we will handle that from a cloud in the internet. There is no size
	const myImage = cld.image(uploadedImage);

	myImage.resize(
		thumbnail().width(100).height(100).gravity(focusOn(FocusOn.face()))
	);

	return (
		<>
			{/* its like an <img/>, cld is what sustitutes the src=''. It takes the cloudinary image, with the id*/}
			<AdvancedImage cldImg={myImage} />
		</>
	);
};

export default Img;
