import { ActionIcon, Box, Button, Text } from "@mantine/core";
import { onValue, push, ref, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../../../config";
import { useAuth } from "../../../../pages/_app";
import { useRouter } from "next/router";

function ProfileInfo({ authorId }) {
	const { user } = useAuth();
	const Router = useRouter();

	const [promptData, setPrompt] = useState(null);
	const [userData, setUserData] = useState({
		username: "",
		following: [],
		followers: [],
	});

	useEffect(() => {
		user &&
			onValue(ref(db, `/users/${authorId}`), (snapshot) => {
				setUserData({
					username: snapshot.val().username,
					following: snapshot.val().following,
					followers: snapshot.val().followers,
				});
			});
	}, [authorId]);

	function followUser() {
		onValue(
			ref(db, `/users/${authorId}`),
			(snapshot) => {
				const allFollowers = snapshot.val().followers;

				if (!allFollowers.includes(user.uid)) {
					allFollowers.push(user.uid);

					set(ref(db, `/users/${authorId}`), {
						followers: allFollowers,
						following: snapshot.val().following,
						username: snapshot.val().username,
						userId: snapshot.val().userId,
					});
				}
			},
			{
				onlyOnce: true,
			},
		);

		onValue(
			ref(db, `users/${user.uid}`),
			(snapshot) => {
				const allFollowing = snapshot.val().following;

				if (!allFollowing.includes(authorId)) {
					allFollowing.push(authorId);

					set(ref(db, `/users/${user.uid}`), {
						following: allFollowing,
						followers: snapshot.val().followers,
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
		<Box sx={{ display: "flex", alignItems: "center", position: "relative", width: "100%", marginBottom: "10%" }}>
			{promptData && (
				<>
					<Box
						sx={{
							height: "100vh",
							width: "100%",
							position: "fixed",
							top: 0,
							left: 0,
							background: "#050505",
							zIndex: "1",
							opacity: "0.7",
						}}
					></Box>
					<Box
						sx={{
							position: "fixed",
							zIndex: "2",
							height: "auto",
							width: "30%",
							left: "50%",
							top: "50%",
							transform: "translate(-50%, -50%)",
							background: "#121212",
							borderRadius: "0.75em",
						}}
					>
						<Box sx={{ position: "absolute", right: "1em", top: "1em" }}>
							<ActionIcon onClick={() => setPrompt(null)}>
								<img src="/close.png" style={{ height: "1em", width: "1em" }} />
							</ActionIcon>
						</Box>
						<Box sx={{ padding: "2em" }}>
							{promptData.map((userData) => (
								<Text
									sx={{ color: "#fff", padding: "1em 0", cursor: "pointer" }}
									onClick={() => {
										Router.push(`/${userData}`);
										setPrompt(null);
									}}
								>
									{userData}
								</Text>
							))}
						</Box>
					</Box>
				</>
			)}
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
			{user &&
				authorId !== user.uid &&
				(userData.followers.includes(user.uid) ? (
					<Button disabled>You already following</Button>
				) : (
					<Button onClick={followUser}>Follow user</Button>
				))}
			<Box sx={{ position: "absolute", right: "10%", top: "5%" }}>
				<Text sx={{ color: "#fff" }}>
					<Text sx={{ fontWeight: "bold" }} onClick={() => setPrompt(userData.followers)}>
						Followers: {userData.followers.length - 1}
					</Text>
				</Text>
				<Text sx={{ color: "#fff" }}>
					<Text sx={{ fontWeight: "bold" }} onClick={() => setPrompt(userData.following)}>
						Following: {userData.following.length - 1}
					</Text>
				</Text>
			</Box>
		</Box>
	);
}

export default ProfileInfo;
