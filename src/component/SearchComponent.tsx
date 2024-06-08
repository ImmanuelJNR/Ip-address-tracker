import {useEffect } from 'react';
import styled from "styled-components";
import { FaChevronRight } from 'react-icons/fa';
import { FC } from 'react';
import axios from 'axios';


const Searchcontainer = styled.form`

    display: flex;
    width : 90%;
    max-width: 500px;
    background-color: white;
    border-radius: 10px;

    overflow: hidden;


    input{
        flex: 1;
        border: none;
        outline: none
        font-size: 0.87rem;
        color: black;
        // color: hsl(0, 0%, 59%);
        padding-left: 10px;
        font-weight: 400;



        &:focus{
        outline: none;
        }

        &::placeholder {
            font-weight: 400;
            font-family: "Rubik", sans-serif;
            font-size: 0.89rem;
            color: hsl(0, 0%, 59%);  
        }
    }

`

const Button = styled.button `
    background-color: hsl(0, 0%, 17%);
    border: none;
    padding: 15px 20px;
    color: #fff;
    cursor: pointer;

`

interface IpApiResponse {
    ip: string;
    location: {
        country: string;
        region: string;
        city: string;
        lat: number;
        lng: number;
        postalCode: string;
        timezone: string;
    };
    isp: string;
}

interface SearchIpAddressProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    setApiResponse: (data: IpApiResponse | null) => void;
}


const SearchIpAddress: FC<SearchIpAddressProps> = ({ inputValue, setInputValue, setApiResponse }) => {
    const fetchIpAddressData = (query: string) => {
        const apiKey = 'at_DFiCEGFXwVIxrLcQzQoFfhGRiMvA6';
        const url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${query}`;
    
        axios
          .get<IpApiResponse>(url)
          .then(response => {
            setApiResponse(response.data);
          })
          .catch(error => {
            console.error('Error fetching the IP address data:', error);
          });
      };
    // const [inputValue, setInputValue] = useState<string>('');
    // const [apiResponse, setApiResponse] = useState<IpApiResponse | null>(null);

    useEffect(() => {
        const fetchUserIp = async () => {
            try {
                const ipResponse = await axios.get('https://api.ipify.org?format=json');
                fetchIpAddressData(ipResponse.data.ip);
            } catch (error) {
                console.error('Error fetching the user IP address:', error);
            }
        };

        fetchUserIp();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchIpAddressData(inputValue);
    };


    return(
        
        <Searchcontainer onSubmit={handleSubmit}>
            <input type="text" placeholder="Search for any IP Address or domain"  value={inputValue} onChange={handleInputChange}/>
            <Button type="submit" aria-label="next" className="btn"> <FaChevronRight/> </Button>
        </Searchcontainer>
    )
}

export default SearchIpAddress;
