import { useState, useEffect } from 'react'
import {
  Box,
  Heading,
  Avatar,
  Text,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import ky from 'ky'
import liff from '@line/liff'

interface FormData {
  name: string
}

const Top = () => {
  const [profileName, setProfileName] = useState<string>()
  const [pictureUrl, setPictureUrl] = useState<string>()

  useEffect(() => {
    const initializeLiff = async () => {
      await liff.init({
        liffId: import.meta.env.VITE_LIFF_ID,
      })

      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile()
        setProfileName(profile.displayName)
        setPictureUrl(profile.pictureUrl)
      }
    }
    initializeLiff()
  }, [])

  const sendMessages = async () => {
    await liff.sendMessages([
      {
        type: 'text',
        text: 'Hello World',
      },
    ])
  }
  const logout = () => {
    liff.logout()
    setProfileName(undefined)
    setPictureUrl(undefined)
  }
  const login = () => {
    if (!liff.isLoggedIn()) {
      liff.login({})
    }
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>()

  const handleFormSubmit = (data: FormData) => {
    alert(JSON.stringify(data))
  }

  return (
    <Box p="4">
      <Heading>Hello LIFF!</Heading>

      {profileName && (
        <Stack direction="row" alignItems="center">
          <Avatar src={pictureUrl} name={profileName} />
          <Text fontSize="sm">{profileName}</Text>
        </Stack>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Stack>
          <FormControl isInvalid={!!errors.name} isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              placeholder="Your name here."
              {...register('name', { required: 'required' })}
            ></Input>
            {errors.name && (
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Say Hello!
          </Button>

          {profileName ? (
            <Button onClick={() => logout()}>SignOut</Button>
          ) : (
            <Button onClick={() => login()}>SignIn</Button>
          )}
        </Stack>
      </form>
    </Box>
  )
}

export default Top
