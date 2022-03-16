import React, {useState} from 'react';
import singleContext from './SingleContext';


const SingleProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {

    const [count, setCount] = useState(0);

    return (
        <singleContext.Provider value={{
            data: count,
            contractAdress: "juno15f386vfzu7vaahu54ullts5dzqeyp6nhv9aa0lupr5h976jxh5xqsjkkru",
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