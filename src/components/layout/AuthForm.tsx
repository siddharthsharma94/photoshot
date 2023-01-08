import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useMutation } from "react-query";


enum authProviders {
  google = "google",
  github = "github",
}

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const error = router.query.error;

  const { mutate: login, isLoading } = useMutation(
    "login",
    (authProvider: authProviders) =>
      signIn(authProvider, {
        email,
        redirect: false,
        callbackUrl: "/dashboard",
      }),
    {
      onSuccess: () => {
        router.push("/login?verifyRequest=1");
      },
    }
  );

  return (
    <Stack spacing={4} width="100%" mx="auto" maxW="md" py={12} px={6}>
      <Stack textAlign="center" align="center" spacing={0}>
        <Text fontWeight="extrabold" as="h2" fontSize="4xl">
          Sign in.
        </Text>
        <Text fontSize="lg">Use your email address to sign in</Text>
      </Stack>
      {error === "OAuthAccountNotLinked" && (
        <Box bg="white" p={4} shadow="2xl" borderRadius="md">
          <Text align="left" color="red" p={4}>
            This email has already been used, please use another email.
          </Text>
        </Box>
      )}
      <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
        <Stack spacing={4}>
          <Stack spacing={10}>
            <Button
              onClick={() => login(authProviders.google)}
              color="blackAlpha.800"
            >
              Sign in with Google
            </Button>
            <Button
              onClick={() => login(authProviders.github)}
              bg="blackAlpha.900"
              _hover={{ bg: "blackAlpha.600" }}
              color={"white"}
            >
              Sign in with Github
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
