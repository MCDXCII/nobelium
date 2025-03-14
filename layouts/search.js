import { useRouter } from 'next/router'
import { useState } from 'react'
import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'
import Tags from '@/components/Tags'
import PropTypes from 'prop-types'

const SearchLayout = ({ tags, posts, currentTag }) => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  let filteredBlogPosts = []
  if (posts) {
    filteredBlogPosts = posts.filter(post => {
      const tagContent = post.tags ? post.tags.join(' ') : ''
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  const handleTagClick = key => {
    if (key === currentTag) {
      setSelectedTag('')
      router.push('/search')
    } else {
      router.push(`/tag/${encodeURIComponent(key)}`)
    }
  }
  return (
    <Container>
      <div className="relative">
        <input
          type="text"
          placeholder={
            currentTag ? `Search in #${currentTag}` : 'Search Articles'
          }
          className="block w-full border px-4 py-2  border-black bg-white text-black"
          onChange={e => setSearchValue(e.target.value)}
        />
        <svg
          className="absolute right-3 top-3 h-5 w-5 text-black dark:text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <div className="tag-container">
      <Tags
        tags={tags}
        handleTagClick={handleTagClick}
        selectedTag={selectedTag || currentTag}
      /> </div>
      <div className="article-container my-8">
        {!filteredBlogPosts.length && (
          <p className="text-gray-500">No posts found.</p>
        )}
        {filteredBlogPosts.slice(0, 10).map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </Container>
  )
}
SearchLayout.propTypes = {
  posts: PropTypes.array.isRequired,
  tags: PropTypes.object.isRequired,
  currentTag: PropTypes.string
}
export default SearchLayout
