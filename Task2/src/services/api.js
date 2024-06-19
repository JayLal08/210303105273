import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/test/companies';
let token = "";
const TIMEOUT = 500;

const data = {
  "companyName": "JayMedi",
  "clientID": "bb6834fd-a5ee-4ea4-aeb2-bb55145f1567",
  "clientSecret": "wSrYgTVAZHuhRSbO",
  "ownerName": "JayLalwani",
  "ownerEmail": "210303105273@paruluniversity.ac.in",
  "rollNo": "210303105273"
};

export const getProducts = async (company, category, top, minPrice, maxPrice) => {
    try {
        const tokenresponse = await axios.post('http://20.244.56.144/test/auth', data);
        token = tokenresponse.data.access_token;
        
        const response = await axios.get(
            `${BASE_URL}/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                timeout: TIMEOUT
            }

        );
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};