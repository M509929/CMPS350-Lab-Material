'use server'
import libraryRepo from "../repo/library-repo"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function getAllAuthorsAction() {
    return libraryRepo.getAllAuthors()
}

export async function deleteBookAction(id) {
    await libraryRepo.deleteBook(id)
    // redirect('/?delete=true')
    // revalidatePath('/')
}

export async function getAuthorByIdAction(id) {
    return await libraryRepo.getAuthorById(id)
}