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
import { DevTool } from "@hookform/devtools";
type YouTubeFormProps = {};
let renderCount = 0;

const YouTubeForm: React.FC<YouTubeFormProps> = () => {
  const form = useForm();
  const { register, control } = form;
  renderCount++;
  return (
    <>
      <h1>number of rerender: {renderCount / 2}</h1>
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
      <DevTool control={control} />
    </>
  );
};
export default YouTubeForm;
