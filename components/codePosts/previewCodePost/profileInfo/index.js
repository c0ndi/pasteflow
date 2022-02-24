import { Box, Button, Text } from "@mantine/core";
import { onValue, push, ref, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../../../config";
import { useAuth } from "../../../../pages/_app";

function ProfileInfo({ authorId }) {
	const { user } = useAuth();
	const [userData, setUserData] = useState({
		username: "",
	});

	useEffect(() => {
		onValue(ref(db, `/users/${authorId}`), (snapshot) => {
			setUserData({
				username: snapshot.val().username,
			});
		});
	}, []);

	function followUser() {
		onValue(
			ref(db, `/users/${authorId}`),
			(snapshot) => {
				const allFollowers = snapshot.val().followers;

				if (!allFollowers.includes(user.uid)) {
					allFollowers.push(user.uid);

					set(ref(db, `/users/${authorId}`), {
						followers: allFollowers,
						username: snapshot.val().username,
						userId: snapshot.val().userId,
					});
				}
			},
			{
				onlyOnce: true,
			},
		);
	}

	return (
		<Box sx={{ display: "flex", alignItems: "center", position: "relative", width: "100%" }}>
			<Box
				sx={{
					overflow: "hidden",
					border: "2px solid #c2c2c2",
					width: "120px",
					borderRadius: "9999px",
					display: "grid",
					placeItems: "center",
				}}
			>
				<img src={`https://avatars.dicebear.com/api/adventurer-neutral/${authorId}.svg`} />
			</Box>
			<Text sx={{ fontSize: "2.5rem", padding: "0 2rem", color: "#c2c2c2" }}>@&nbsp;{userData.username}</Text>
		</Box>
	);
}

export default ProfileInfo;