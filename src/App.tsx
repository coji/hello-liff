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
import { Router } from './routes/Router'
import ky from 'ky'

interface FormData {
  name: string
}

export const App = () => {
  return <Router />
}

export default App
