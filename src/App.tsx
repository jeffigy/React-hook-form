import { Flex } from "@chakra-ui/react";
import React from "react";
import YouTubeForm from "./components/YouTubeForm";
import YupForm from "./components/YupForm";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <Flex minH={"100vh"} w={"full"} justify={"center"} p={"20px"}>
      {/* <YouTubeForm /> */}
      <YupForm />
    </Flex>
  );
};
export default App;
