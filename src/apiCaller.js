import axios from "axios";
 
export const apiCaller = async (q) => {
    const apiKey = `72njgfa948d9aS7gs5`;
    let token = 
        {
            headers: {
              // 'Authorization': `Bearer ${token}` 
              'x-api-key':`72njgfa948d9aS7gs5`
            }
        }
    try {
 
        const response = await axios.get(
            `https://stageapi.monkcommerce.app/task/products/search?${q}&page=2&limit=7`,{
                headers: {
                    'x-api-key': `${apiKey}`
                }
            },
        );
        return response;
 
    } catch (error) {
        return error;
    }
};