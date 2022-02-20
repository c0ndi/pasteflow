import { onValue, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { db } from "../../config";
import CodePost from "./codePost";

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

				allPosts.sort((a, b) => a.date - b.date);
				setCodePosts(allPosts.reverse());
			}
		});
	}, []);
	return (
		<div>
			{codePosts.map(({ author, date, postData, authorId }) => (
				<CodePost author={author} date={date} postData={postData} authorId={authorId} />
			))}
		</div>
	);
}

export default CodePosts;
