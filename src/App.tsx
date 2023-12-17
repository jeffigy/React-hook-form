import { Flex } from "@chakra-ui/react";
import React from "react";
import YouTubeForm from "./components/YouTubeForm";
import YupForm from "./components/YupForm";

import ZodForm from "./components/ZodForm";

const App = () => {
  return (
    <Flex minH={"100vh"} w={"full"} justify={"center"} p={"20px"}>
      {/* <YouTubeForm /> */}
      {/* <YupForm /> */}
      <ZodForm />
    </Flex>
  );
};
export default App;
