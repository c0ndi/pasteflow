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
	}, [authorId]);

	return (
		<div>
			{codePosts.map(({ author, date, postData, authorId, key }) => (
				<CodePost author={author} date={date} postData={postData} authorId={authorId} key={key} />
			))}
		</div>
	);
}

export default PreviewCodePost;
