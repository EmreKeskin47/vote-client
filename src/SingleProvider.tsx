import React, {useState} from 'react';
import singleContext from './SingleContext';


const SingleProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {

    const [count, setCount] = useState(0);

    return (
        <singleContext.Provider value={{
            data: count,
            contractAdress: "juno18fldmaz5x9q7sgxl6ah94nrkhew57xyqjrx9m9hj7xlsp05mc30s65hmws",
            testUrl: "https://rpc.uni.juno.deuslabs.fi",
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