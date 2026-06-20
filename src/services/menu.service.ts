import { environment } from "../constants/environment";
import { fetchAPI } from "../utils/fetchAPI";

export const getMenus = async (category: string, page: number = 1) => {
    // pageSize diset tetap 6 agar pas dengan grid layout responsive (1, 2, atau 3 kolom)
    let url = `${environment.API_URL}/menu?page=${page}&pageSize=6`;

    if (category) {
        url += `&category=${category}`;
    }

    const result = await fetchAPI(url, {
        method: 'GET',
    }).then((data) => data);
    
    return result;
};