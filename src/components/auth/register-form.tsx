"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {z} from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { signUp } from "@/lib/auth-client"
import { toast } from "sonner"

const registerSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 characters long"),
    email: z.string().email("Enter a valid Email address"),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
    confirmPassword: z.string().min(6, "Password must be atleast 6 characters long")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"]
})

type RegisterFormValues = z.infer<typeof registerSchema>

interface RegisterFormProps{
    onSuccess?: () => void
}

const RegisterForm = ({onSuccess} : RegisterFormProps) => {

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onRegisterSubmit = async (values: RegisterFormValues) => {
        setIsLoading(true);
        try {
            const { error } = await signUp.email({
                name: values.name,
                email: values.email,
                password: values.password
            })

            if (error) {
                toast.error('Failed to create account... try again');
                return
            }
            toast.success("Account has been created successfully. Please sign in with email and password");

            if (onSuccess) {
                onSuccess()
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                      <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}                 
              /> 
              <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                      <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                              <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}                 
              /> 
              <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                      <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                              <Input type="password" placeholder="Enter your Password" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}                 
              /> 
              <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({field}) => (
                      <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                              <Input type="password" placeholder="Enter your ConfirmPassword" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}                 
              /> 
              <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "createing account" : "Create Account"}
              </Button>
      </form>
    </Form>
  )
}

export default RegisterForm
