import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React from "react";

type YouTubeFormProps = {};

const YouTubeForm: React.FC<YouTubeFormProps> = () => {
  return (
    <form action="">
      <Card>
        <CardBody as={Stack} spacing={"10px"}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input id="username" name="username" type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input id="email" name="email" type="email" />
          </FormControl>
          <FormControl id="channel">
            <FormLabel>Channel</FormLabel>
            <Input id="channel" name="channel" type="text" />
          </FormControl>
        </CardBody>
        <CardFooter>
          <Button w={"full"} type="submit" colorScheme="blue">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
export default YouTubeForm;
