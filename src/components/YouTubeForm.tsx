import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
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
        phoneNumbers: ["", ""],
        phNumbers: [{ number: "" }],
        age: 0,
        dob: new Date(),
      };
    },
    mode: "onChange",
    // modes are: onBlur, onChange, onSubmit, onTouched, all
    // default is: onSubmit
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitSuccessful,
    isSubmitted,
  } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  console.log(
    "isSubmitSuccessful",
    isSubmitSuccessful,
    "isSubmitted",
    isSubmitted
  );

  console.log({
    touchedFieds: touchedFields,
    dirtyFields: dirtyFields,
    isDirty: isDirty,
  });

  const handleGetValues = () => {
    console.log(getValues("social.twitter"));
  };

  const handleSetValues = () => {
    setValue("social.twitter", "https://twitter.com/andrew_j_mead", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // watches for changes in the username and email fields
  const watchUsername = watch(["username", "email"]);

  //watches all values in the form
  const watchForm = watch();

  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("form errors", errors);
  };
  useEffect(() => {
    watch((value) => {
      console.log("watch all", value);
    });
    if (isSubmitSuccessful) {
      reset();
    }
  }, [watch, isSubmitSuccessful, reset]);
  return (
    <Flex direction={"column"}>
      <Heading as={"h1"}>watching: {watchUsername}</Heading>
      <Text as={"h1"}>watching all: {JSON.stringify(watchForm)}</Text>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
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
                    emailAvailable: async (value) => {
                      const res = await fetch(
                        "https://jsonplaceholder.typicode.com/users"
                      );
                      const data = await res.json();
                      const found = data.find(
                        (user: any) => user.email === value
                      );
                      return !found || "email already taken";
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
              <Input
                isInvalid={!!errors.social?.twitter}
                id="twitter"
                type="url"
                {...register("social.twitter", {
                  required: "Twitter is required",
                  pattern: {
                    value: /^https:\/\/twitter\.com\/[a-zA-Z0-9_]{1,15}$/,
                    message: "Invalid Twitter address",
                  },
                  validate: {
                    notBlackListed: (value) => {
                      return (
                        !value.endsWith("badtwitter.com") ||
                        "This domain is not supported"
                      );
                    },
                  },
                  // disabled: true,
                  disabled: watch("social.facebook") === "test", // disables the field if the value of the facebook field is "test"
                })}
              />
              {errors.social?.twitter && (
                <FormHelperText color={"red"}>
                  {errors.social?.twitter.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="facebook">
              <FormLabel>Facebook</FormLabel>
              <Input
                isInvalid={!!errors.social?.facebook}
                id="facebook"
                type="text"
                {...register("social.facebook", {
                  required: "Facebook is required",
                  pattern: {
                    value: /^https:\/\/www\.facebook\.com\/[a-zA-Z0-9_]{1,15}$/,
                    message: "Invalid Facebook address",
                  },
                  validate: {
                    notBlackListed: (value) => {
                      return (
                        !value.endsWith("badfacebook.com") ||
                        "This domain is not supported"
                      );
                    },
                  },
                })}
              />
              {errors.social?.facebook && (
                <FormHelperText color={"red"}>
                  {errors.social?.facebook.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl id="primary-phone">
              <FormLabel>Primary Phone</FormLabel>
              <Input
                isInvalid={!!errors.phoneNumbers?.[0]}
                id="primary-phone"
                type="text"
                {...register("phoneNumbers.0", {
                  required: "Primary phone is required",
                  pattern: {
                    value:
                      /^(?:\+63|0)?(?:\d{11}|\d{3}-\d{4}-\d{3}|\d{3}-\d{3}-\d{4})$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phoneNumbers?.[0] && (
                <FormHelperText color={"red"}>
                  {errors.phoneNumbers?.[0].message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="secondary-phone">
              <FormLabel>Secondary Phone</FormLabel>
              <Input
                isInvalid={!!errors.phoneNumbers?.[1]}
                id="secondary-phone"
                type="text"
                {...register("phoneNumbers.1", {
                  required: "Secondary phone is required",
                  pattern: {
                    value:
                      /^(?:\+63|0)?(?:\d{11}|\d{3}-\d{4}-\d{3}|\d{3}-\d{3}-\d{4})$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phoneNumbers?.[1] && (
                <FormHelperText color={"red"}>
                  {errors.phoneNumbers?.[1].message}
                </FormHelperText>
              )}
            </FormControl>

            <>
              {fields.map((field, index) => {
                return (
                  <FormControl id="phNumbers">
                    <FormLabel>Phone Numbers</FormLabel>
                    <Input
                      key={field.id}
                      isInvalid={!!errors.phNumbers?.[index]?.number}
                      id={`phNumbers.${index}.number`}
                      type="text"
                      {...register(`phNumbers.${index}.number` as const, {
                        required: "Phone number is required",
                        pattern: {
                          value:
                            /^(?:\+63|0)?(?:\d{11}|\d{3}-\d{4}-\d{3}|\d{3}-\d{3}-\d{4})$/,
                          message: "Invalid phone number",
                        },
                      })}
                    />
                    {index > 0 && (
                      <IconButton
                        aria-label="remove phone number"
                        onClick={() => remove(index)}
                        icon={<MinusIcon />}
                      />
                    )}
                  </FormControl>
                );
              })}
              <IconButton
                aria-label="add phone number"
                onClick={() => append({ number: "" })}
                icon={<AddIcon />}
              />
            </>
            <FormControl id="age">
              <FormLabel>Channel</FormLabel>
              <Input
                isInvalid={!!errors.age}
                id="age"
                type="number"
                {...register("age", {
                  valueAsNumber: true,
                  required: { value: true, message: "Channel is required" },
                })}
              />
              {errors.age && (
                <FormHelperText color={"red"}>
                  {errors.age.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="dob">
              <FormLabel>Channel</FormLabel>
              <Input
                isInvalid={!!errors.dob}
                id="dob"
                type="date"
                {...register("dob", {
                  valueAsDate: true,
                  required: { value: true, message: "Channel is required" },
                })}
              />
              {errors.dob && (
                <FormHelperText color={"red"}>
                  {errors.dob.message}
                </FormHelperText>
              )}
            </FormControl>
          </CardBody>
          <CardFooter as={Stack}>
            <Button
              isLoading={isSubmitting}
              w={"full"}
              type="submit"
              colorScheme="blue"
              isDisabled={!isDirty} // disables the submit button if the form is not dirty
            >
              Submit
            </Button>
            <Button onClick={() => reset()} w={"full"}>
              reset
            </Button>
            <Button
              w={"full"}
              onClick={handleGetValues}
              type="submit"
              colorScheme="blue"
            >
              Get values
            </Button>
            <Button
              w={"full"}
              onClick={handleSetValues}
              type="submit"
              colorScheme="blue"
            >
              set values
            </Button>
            <Button
              w={"full"}
              onClick={() => trigger("channel")}
              type="submit"
              colorScheme="blue"
            >
              set values
            </Button>
          </CardFooter>
        </Card>
      </form>
      <DevTool control={control} />
    </Flex>
  );
};
export default YouTubeForm;
