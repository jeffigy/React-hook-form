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
import { useForm } from "react-hook-form";
type YouTubeFormProps = {};

const YouTubeForm: React.FC<YouTubeFormProps> = () => {
  const form = useForm();
  const { register } = form;

  return (
    <form action="">
      <Card>
        <CardBody as={Stack} spacing={"10px"}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input id="username" type="text" {...register("username")} />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input id="email" type="email" {...register("email")} />
          </FormControl>
          <FormControl id="channel">
            <FormLabel>Channel</FormLabel>
            <Input id="channel" type="text" {...register("channel")} />
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
