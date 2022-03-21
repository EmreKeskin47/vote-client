import React, {useState} from 'react';
import singleContext from './SingleContext';

const SingleProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {

    const [count, setCount] = useState(0);

    return (
        <singleContext.Provider value={{
            data: count,
            contractAdress: "juno1jgz7vjv3ns4l4a2xuajgz676fx2l6aeuvd65724mzwsmd5utx9qszpxfkz",
            testUrl: "https://rpc.uni.juno.deuslabs.fi",
            colors: {
                yes: "#5ED58B",
                no: "#EE6766",
                nwv: "#6DA6E8",
                abstain: "#9FA4AD",
                backgroundColor: "#1F2123",
            },
            updateCountByOne: () => {
                setCount(count + 1);
            },
            updateCount: (item: number) => {
                setCount(item);
            },
        }}>
            {props.children}
        </singleContext.Provider>
    );
}

export default SingleProvider;