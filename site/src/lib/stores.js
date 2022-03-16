import { writable } from 'svelte-local-storage-store'

export const mainLibraries = writable("main_libraries", ["librarypoint", "finditva", "nnpls"]);
export const wishlistLibraries = writable("wishlist_libraries", []);
