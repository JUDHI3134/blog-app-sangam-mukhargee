"use client"
import {z} from "zod"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { startTransition, useTransition } from "react"
import { createPost } from "@/actions/post-actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

//post form schema for validation
const postSchema = z.object({
    title: z.string().min(3,'Title must be atleast 3 characters long').max(255, 'title must be less than 255 character'),
    description: z.string().min(5,'Description must be atleast 5 characters long').max(255, 'Description must be less than 255 character'),
    content: z.string().min(10,'Description must be atleast 10 characters long'),
})

type PostFormValues = z.infer<typeof postSchema>


const PostForm = () => {

    const router = useRouter()

    const [isPending, setIsPending] = useTransition()

    const {register, handleSubmit, formState: {errors} } = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            description: '',
            content: ''
        }
    })

    const onFormSubmit = async (data: PostFormValues) => {
        startTransition(async() => {
            try {
                const formData = new FormData();
                formData.append("title", data.title)
                formData.append("description", data.description)
                formData.append("content", data.content);

                let res;

                res = await createPost(formData);
                console.log("res", res)

                if (res.success) {
                    toast("Post created successfully");
                    router.refresh()
                    router.push("/")
                } else {
                    toast(res.mesaage)
                }

            } catch (error) {
               toast("Failed to create Post"); 
            }
        })
    }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="space-y-2">
              <Label htmlFor="title">Title</Label> 
              <Input id="title" placeholder="Enter post title" {...register('title')} disabled={isPending} />
              {errors?.title && <p className="text-sm text-red-700">{ errors.title.message}</p> }   
      </div>
          <div className="space-y-2">
              <Label htmlFor="description">Description</Label> 
              <Textarea id="description" placeholder="Enter post description" {...register('description')} disabled={isPending} /> 
               {errors?.description && <p className="text-sm text-red-700">{ errors.description.message}</p> }
      </div>
          <div className="space-y-2">
              <Label htmlFor="content">Content</Label> 
              <Textarea className="min-h-[200px] resize-none" id="content" placeholder="Enter post content" {...register('content')} disabled={isPending} /> 
               {errors?.content && <p className="text-sm text-red-700">{ errors.content.message}</p> }
          </div>
          <Button disabled={isPending} type="submit" className="w-full mt-5">
              { isPending ? "Saving...": 'Create Post'}
          </Button>
    </form>
  )
}

export default PostForm
