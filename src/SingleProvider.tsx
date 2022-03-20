import React, {useState} from 'react';
import singleContext from './SingleContext';

const SingleProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {

    const [count, setCount] = useState(0);

    return (
        <singleContext.Provider value={{
            data: count,
            contractAdress: "juno13up7xkr0fu04u87kuyzqnyl0tmrwvduqcuw6sl43h9vzufs9s7sqyseza9",
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