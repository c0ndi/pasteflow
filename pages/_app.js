import { MantineProvider } from "@mantine/core";
import { createContext, useContext, useState } from "react";
import "../styles/globals.css";

const AuthContext = createContext();

function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState();

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			<MantineProvider theme={{ colorScheme: "dark", fontFamily: "Poppins, sans-serif" }}>
				<Component {...pageProps} />
			</MantineProvider>
		</AuthContext.Provider>
	);
}

export default MyApp;

export const useAuth = () => {
	return useContext(AuthContext);
};
