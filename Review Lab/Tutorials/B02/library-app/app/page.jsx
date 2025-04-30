'use client'
import Image from "next/image";

import { useState, useEffect } from 'react'
import { getAllAuthorsAction } from "./action/server-actions";
import Author from "./components/Author";


// import styles from "./page.module.css";

export default function Home() {
  const [authors, setAuthors] = useState([])

  async function loadAuthors() {
    const authorsData = await getAllAuthorsAction()
    setAuthors(authorsData)

  }

  async function handleSearch(e) {
    const query = e.target.value
    const authorsData = await getAllAuthorsAction(query)
    if (query.length == 0)
      setAuthors(authorsData)
    else
      setAuthors(authorsData.filter(author => author.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())))

  }

  useEffect(() => { loadAuthors() }, [])

  return (
    <>
      <div className="search-container">
        <input type="text" name="search" id="search" onChange={handleSearch} className="search-box" />
      </div>
      <h1>Featured Authors</h1>
      {authors.map((author, index) => <Author author={author} />)}
    </>
  );
}
