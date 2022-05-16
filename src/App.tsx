import {
  Box,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import ky from 'ky'

interface FormData {
  name: string
}

function App() {
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
      <Heading>Hello LiFF!</Heading>
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
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default App
