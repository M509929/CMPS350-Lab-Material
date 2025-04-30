'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { getAllAuthorsAction } from "./actions/server-actions";
import { useEffect, useState } from "react";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import Author from "./components/Author";
import Search from "./components/Search";

export default function Home() {

  const [authors, setAuthors] = useState([])

  async function handleSearch(e) {
    const query = e.target.value
    const authorsData = await getAllAuthorsAction()
    if (query.length == 0)
      setAuthors(authorsData)
    else
      setAuthors(authorsData.filter((author, index) => author.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())))

  }

  async function loadData() {
    const authorsData = await getAllAuthorsAction()
    setAuthors(authorsData)
  }

  // to execute this function one , as soon as the app loads
  useEffect(() => { loadData() }, [])

  return (
    <>
      <Search onSearch={handleSearch} />
      <div className="grid-container">
        {
          authors.map((author, index) => <Author author={author} key={index} />)
        }
      </div>
    </>
  );
}
