export const getCharacter = async (page: number, name?: string) => {
    const API_URL = process.env.API_URL
    try {

        let pageParam = page ? `page=${page}` : "";
        const nameParam = name ? `&name=${name}` : "";

        if (name) {
            pageParam = ""
        }
        const response = await fetch(`${API_URL}character?${pageParam}${nameParam}`, {
            method: "GET",
        });

        if (!response.ok) {
            return [];
        }

        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        throw new Error(`An error happened: ${error}`)
    }
}