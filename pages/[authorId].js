import { Box, Text } from "@mantine/core";
import Head from "next/head";
import { useAuth } from "./_app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PreviewCodePost from "../components/codePosts/previewCodePost";
import { useMediaQuery } from "@mantine/hooks";
import ProfileInfo from "../components/codePosts/previewCodePost/profileInfo";

const Home = () => {
	const mobile = useMediaQuery("(max-width: 768px)");

	const Router = useRouter();
	const { user } = useAuth();
	const { authorId } = Router.query;

	useEffect(() => {
		if (!user) {
			Router.push("/login");
		}
	}, [user]);
	return (
		<Box
			sx={{
				position: "relative",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: `2.5% ${mobile ? "5%" : "15%"}`,
			}}
		>
			<Head>
				<title>{authorId}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ProfileInfo authorId={authorId} />
			<PreviewCodePost authorId={authorId} />
		</Box>
	);
};

export default Home;
