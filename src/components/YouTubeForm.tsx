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
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  channel: string;
};
const YouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit } = form;

  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Card>
          <CardBody as={Stack} spacing={"10px"}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                id="username"
                type="text"
                {...register("username", {
                  required: { value: true, message: "Username is required" },
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
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
