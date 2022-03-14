import React, {useState} from 'react';
import singleContext from './SingleContext';


const SingleProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {

    const [count, setCount] = useState(0);

    return (
        <singleContext.Provider value={{
            data: count,
            updateCountByOne: () => {
                setCount(count + 1);
            },
            updateCount: (item: number) => {
                setCount(item);
            }
        }}>
            {props.children}
        </singleContext.Provider>
    );
}

export default SingleProvider;