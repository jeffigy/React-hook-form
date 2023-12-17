import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const schema = z.object({
  username: z.string({
    required_error: "username is required",
    invalid_type_error: "Name must be a string",
  }),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email("email is invalid"),
  channel: z.string({
    required_error: "channel is required",
    invalid_type_error: "channel must be a string",
  }),
});
const ZodForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, control, handleSubmit, formState } = form;

  const { errors, isDirty, isSubmitting } = formState;

  const onSubmit = async (data: FormValues) => {
    // wait for 5 seconds before logging data to the console
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(data);
  };
  return (
    <Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card borderRadius={0}>
          <CardBody as={Stack}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                borderRadius={0}
                id="username"
                isInvalid={!!errors.username}
                {...register("username")}
              />
              {errors.username && (
                <FormHelperText color="red">
                  {errors.username.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                borderRadius={0}
                id="email"
                isInvalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <FormHelperText color="red">
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                borderRadius={0}
                id="channel"
                isInvalid={!!errors.channel}
                {...register("channel")}
              />
              {errors.channel && (
                <FormHelperText color="red">
                  {errors.channel.message}
                </FormHelperText>
              )}
            </FormControl>
          </CardBody>
          <CardFooter>
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="blue"
              isDisabled={!isDirty}
              borderRadius={0}
              w={"full"}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
      <DevTool control={control} />
    </Flex>
  );
};
export default ZodForm;
