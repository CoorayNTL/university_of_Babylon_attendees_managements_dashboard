import axios from "axios";

// ****** Get IP adrress
export const IpAddress = async ({ setLoading, setIpData }) => {
    try {
        let res = await axios.get(
            `http://api.ipstack.com/check?access_key=${process.env.REACT_APP_IP_ADRRESS_API_KEY}`
        );
        if (res) {
            setLoading(false);
            setIpData(res.data.country_name);
        }
    } catch (error) {
        alert(`IP address Error: ${error}`);
    }
};

// *********** Send email
export const SendEmail = async ({ fullName, email, message, setSend }) => {
    try {
        const datas = { fullName, email, message };
        let res = await axios.post(`http://localhost:5001/send`, datas);
        if (res) {
            setSend(res.data);
        }
    } catch (error) {
        alert(error.response.data.message);
    }
};
