import Head from "next/head";
import { useAuth } from "../_app";
import { Box } from "@mantine/core";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "../../components/loginForm";

const Home = () => {
	const { user } = useAuth();
	const Router = useRouter();

	useEffect(() => {
		if (user) {
			Router.push("/");
		}
	}, [Router, user]);
	return (
		<Box sx={{ display: "grid", placeItems: "center", height: "90vh" }}>
			<Head>
				<title>Login</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<LoginForm />
		</Box>
	);
};

export default Home;
