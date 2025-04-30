import libraryRepo from '@/app/repo/library-repo'
import React from 'react'

async function page({ params }) {
    const id = await params.id
    const author = await libraryRepo.getAuthorById(id)
    return (
        <div>
            <img src={author.photo} alt="Author Name" width={400} />
            <div className="author-info">
                <h2 className="author-name">{author.name}</h2>
                <p className="author-bio">{author.bio}</p>
                <p className="author-bio">{author.description}</p>
                <h2>The Books Authored By : {author.name}</h2>
                <ul>
                    {author.books.map((book, index) => <li>{book.title}</li>)}
                </ul>
            </div>

        </div>
    )
}

export default page