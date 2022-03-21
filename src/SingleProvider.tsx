import React, {useState} from 'react';
import singleContext from './SingleContext';

const SingleProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {

    const [count, setCount] = useState(0);

    return (
        <singleContext.Provider value={{
            data: count,
            contractAdress: "juno1kuwrzahftmgnzt4dl7jmkw8kug5yy75a4n6qpvljk2nmqpc9dy4q7puz3a",
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