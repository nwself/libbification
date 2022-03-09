import { writable } from 'svelte-local-storage-store'

export const mainLibraries = writable("main_libraries", ["brooklyn"]);
export const wishlistLibraries = writable("wishlist_libraries", []);
