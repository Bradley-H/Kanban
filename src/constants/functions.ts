import {globalStore} from '../stores/globalStore'

//toggles navbar
export const toggleNavbar = () => {
    globalStore.update($store => {
        $store.navbar = !$store.navbar
        return $store
    })
}