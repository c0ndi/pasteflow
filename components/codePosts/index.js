import { Box } from "@mantine/core";
import { onValue, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { db } from "../../config";
import { Prism } from "@mantine/prism";

function CodePosts() {
	const [codePosts, setCodePosts] = useState([]);

	useEffect(() => {
		onValue(ref(db, "/posts"), (snapshot) => {
			if (snapshot.val()) {
				const allPosts = [];
				Object.values(snapshot.val()).forEach((author) => {
					Object.values(author).forEach((post) => {
						allPosts.push(post);
					});
				});

				setCodePosts(allPosts);
			}
		});
	}, []);
	return (
		<div>
			{codePosts.map(({ author, date, postData, authorId }) => {
				return (
					<Box sx={{ margin: "4em 0", color: "#ced4da" }}>
						<p>{author}</p>
						<p>{new Date(date).toLocaleDateString()}</p>
						<Prism language="js" colorScheme="dark" withLineNumbers>
							{postData}
						</Prism>
						{/* todo */}
						{/* add dynamic routing */}
						{/* map codePost */}
					</Box>
				);
			})}
		</div>
	);
}

export default CodePosts;
