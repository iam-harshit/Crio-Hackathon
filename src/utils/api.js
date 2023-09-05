import axios from "axios";

export const fetchData = async () => {
    try {
        const response = await axios.get("http://localhost:8080/v1/allVideo");
        return response.data;
    } catch (error) {
        console.log("API error", error);
    }
}
