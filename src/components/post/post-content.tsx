import { PostContentProps } from '@/lib/types'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { formatData } from '@/lib/utils'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Pencil } from 'lucide-react'
import DeletePostButton from './delete-post-button'

const PostContent = ({post, isAuthor} : PostContentProps) => {
  return (
    <Card>
          <CardHeader>
              <CardTitle className='text-2xl text-center'>{post.title}</CardTitle>
              <CardDescription className='text-center'>By {post.author.name} - { formatData(post.createdAt)}</CardDescription>
          </CardHeader>
          <CardContent>
              <p className='text-lg text-muted-foreground mb-6 text-center'>{post.description}</p>
              <p>{ post.content}</p>
          </CardContent>

          {
              isAuthor && (
                  <CardFooter>
                      <div className='flex gap-2'>
                          <Button asChild variant={"outline"} size={"sm"}>
                              <Link href={`/post/edit/${post.slug}`}>
                                  <Pencil className='h-4 w-4 mr-2' />
                                  Edit</Link>
                          </Button>
                          <DeletePostButton postId={post.id} />
                      </div>
                  </CardFooter>
              )
          }
    </Card>
  )
}

export default PostContent
