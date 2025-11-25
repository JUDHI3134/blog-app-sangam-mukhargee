import PostForm from '@/components/post/post-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const CreatePost = () => {
  return (
    <main className='py-10 max-w-lg mx-auto'>
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className='text-4xl font-bold'>Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <PostForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default CreatePost
