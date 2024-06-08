import styled from "styled-components"
import { FC } from 'react';




const Subwrapper = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    z-index: 1000;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffff;
    border-radius: 20px;
    padding: 25px 15px;
    font-family: "Rubik", sans-serif;

    div{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 20px;
    }
    div:first-child {
        padding-left: 0;
    }

    .description-text{
        color: hsl(0, 0%, 59%);
        font-weight: 500;
        font-size: 0.7rem;
        margin-bottom: 10px;
    }

    p{
        font-size: 1.2rem;
        font-weight: 500;
        // margin: 10px 0;
    }

    .border-right{
        border-right: 1px solid hsl(0, 0%, 80%); 
    }

    @media (max-width: 800px){
        flex-direction: column;
        width: 90%;
        padding: 0;
        padding-top: 10px;
        // top: 50%;

        div{
            justify-content: center;
            align-items: center;
            padding-left: 0;
            // border: 1px solid red;
            margin-bottom: 15px;
        }

        .border-right{
            border-right: none; 
        }
        .description-text{
            color: hsl(0, 0%, 59%);
            font-weight: 500;
            font-size: 0.7rem;
            margin-bottom: 5px  ;
        }
    }

`

interface ApiInfoBoxProps {
    ip: string;
    location: string;
    timezone: string;
    isp: string;
}

const ApiInfoBox : FC <ApiInfoBoxProps> = ({ip, location, timezone, isp}) =>{
    return(
        // <Wrapper>

            <Subwrapper>

            <div className="border-right">
                <span className="description-text">IP ADDRESS</span>
                <p>{ip}</p>
            </div>
            {/* <hr/> */}
            <div  className="border-right">
                <span className="description-text">LOCATION</span>
                <p>{location}</p>
            </div>
            {/* <hr/> */}
            <div className="border-right">
                <span className="description-text">TIMEZONE</span>
                <p>{timezone}</p>
            </div>
            {/* <hr/> */}
            <div>
                <span className="description-text">ISP</span>
                <p>{isp}</p>
            </div>
            </Subwrapper>

        // </Wrapper>
    )
}

export default ApiInfoBox