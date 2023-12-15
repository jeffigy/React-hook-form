import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormHelperText,
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
  social: {
    facebook: string;
    twitter: string;
  };
};
const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await res.json();
      return {
        username: data.username,
        email: data.email,
        channel: "",
        social: {
          facebook: "",
          twitter: "",
        },
      };
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

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
                isInvalid={!!errors.username}
                {...register("username", {
                  required: { value: true, message: "Username is required" },
                })}
              />
              {errors.username && (
                <FormHelperText color={"red"}>
                  {errors.username.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                isInvalid={!!errors.email}
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                  validate: {
                    required: (value) => !!value,
                    notAdmin: (value) => {
                      return (
                        value !== "admin@example.com" ||
                        "enter a different email"
                      );
                    },
                    notBlackListed: (value) => {
                      return (
                        !value.endsWith("baddomain.com") ||
                        "this domain is not supported"
                      );
                    },
                  },
                })}
              />
              {errors.email && (
                <FormHelperText color={"red"}>
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="channel">
              <FormLabel>Channel</FormLabel>
              <Input
                isInvalid={!!errors.channel}
                id="channel"
                type="text"
                {...register("channel", {
                  required: { value: true, message: "Channel is required" },
                })}
              />
              {errors.channel && (
                <FormHelperText color={"red"}>
                  {errors.channel.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="twitter">
              <FormLabel>Twitter</FormLabel>
              <Input id="twitter" type="text" {...register("social.twitter")} />
            </FormControl>
            <FormControl id="facebook">
              <FormLabel>Facebook</FormLabel>
              <Input
                id="facebook"
                type="text"
                {...register("social.facebook")}
              />
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
