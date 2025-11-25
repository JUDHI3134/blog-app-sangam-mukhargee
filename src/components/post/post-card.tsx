import { PostCardProps } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { formatData } from '@/lib/utils'

const PostCard = ({post}: PostCardProps) => {
  return (
    <Card className='h-full flex flex-col'>
          <CardHeader>
              <Link className='hover:underline' href={`/post/${post.slug}`}>
                  <CardTitle className='text-2xl font-semibold'>{ post.title}</CardTitle>
              </Link>
              <CardDescription>
                  By {post.author.name} - {formatData(post.createdAt)}
              </CardDescription>
          </CardHeader>
          <CardContent>
              <p className='text-muted-foreground mb-2'>{post.description}</p>
              <p className='text-muted-foreground'>{ (post.content).slice(0,10)}...</p>
          </CardContent>
    </Card>
  )
}

export default PostCard
