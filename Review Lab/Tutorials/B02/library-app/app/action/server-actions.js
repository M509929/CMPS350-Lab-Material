'use server'

import libraryRepo from "../repo/library-repo"

export async function getAllAuthorsAction(){
    return await libraryRepo.getAllAuthors()
}