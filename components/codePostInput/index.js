import { Button, Textarea, Box, Text } from "@mantine/core";
import { useState, useRef } from "react";
import { useAuth } from "../../pages/_app";
import { db } from "../../config";
import { ref, push, serverTimestamp } from "firebase/database";

function CodePostInput() {
	const [codePostData, setPostCodeData] = useState();
	const textarea = useRef(null);

	const { user } = useAuth();

	function addPost(codePostData) {
		textarea.current.value = "";
		push(ref(db, "/posts/" + user.uid), {
			postData: codePostData,
			author: user.email,
			authorId: user.uid,
			date: serverTimestamp(),
		});
	}
	return (
		<Box>
			<Text sx={{ color: "white", fontSize: "1.5rem", paddingBottom: "0.25em" }}>Your code!</Text>
			<Textarea
				minRows={10}
				maxRows={10}
				maxLength={1000}
				placeholder="np. console.log('Hello world')"
				size="lg"
				style={{ color: "red" }}
				onChange={(e) => setPostCodeData(e.target.value)}
				ref={textarea}
				autosize
			/>
			{codePostData && codePostData.length > 999 && <Text sx={{ color: "#fff" }}>Too long!</Text>}
			<Text sx={{ color: "#fff" }}>{codePostData ? 1000 - codePostData.length : 1000} / 1000</Text>
			<Button
				sx={{ marginTop: "1em" }}
				onClick={() => addPost(codePostData)}
				radius="md"
				disabled={codePostData ? (codePostData.length > 999 ? true : false) : true}
			>
				Add post
			</Button>
		</Box>
	);
}

export default CodePostInput;
