import libraryRepo from '@/app/repo/library-repo'
import React from 'react'

export default async function page({ params }) {
    const author = await libraryRepo.getAuthorById(params.id)
    return (
        <div>
            <h1>{author.name}</h1>
            <hr />
            <img src={author.photo} alt="" width={400} />
            <div className="author-info">
                <h2 className="author-name">{author.name}</h2>
                <p className="author-bio">{author.bio}.</p>
            </div>

            <h2>Book Authored by <i>{author.name}</i></h2>
            <hr />
            <ol>
                {author.books.map((book, index) => <li>{book.title}</li>)}
            </ol>
        </div >
    )
}
