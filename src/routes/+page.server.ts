import type { PageServerLoad } from './$types';
import data from  "../../static/json/data.json";

export const load: PageServerLoad = async () => {
    //destructure data
    const { boards } = data;
    const {columns} = data.boards[0];
    return {
        boards, columns
    }
}