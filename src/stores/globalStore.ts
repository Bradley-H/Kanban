import {writable} from 'svelte/store';


export let globalStore = writable({
    theme: 'dark',
    navbar: true,
})