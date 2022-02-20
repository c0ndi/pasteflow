import { onValue, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { db } from "../../../config";
import CodePost from "../codePost";

function PreviewCodePost({ authorId }) {
	const [codePosts, setCodePosts] = useState([]);

	useEffect(() => {
		onValue(ref(db, "posts/" + authorId), (snapshot) => {
			if (snapshot.val()) {
				const allPosts = [];
				Object.values(snapshot.val()).forEach((post) => {
					allPosts.push(post);
				});

				allPosts.sort((a, b) => a.date - b.date);
				setCodePosts(allPosts.reverse());
			}
		});

		return () => setCodePosts();
	}, []);

	return (
		<div>
			{codePosts.map(({ author, date, postData, authorId }) => (
				<CodePost author={author} date={date} postData={postData} authorId={authorId} />
			))}
		</div>
	);
}

export default PreviewCodePost;
