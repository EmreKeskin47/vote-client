import React, {useState} from 'react';
import singleContext from './SingleContext';


const SingleProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {

    const [count, setCount] = useState(0);
    const [firstTimeVisit, setFirstTimeVisit] = useState(true);

    return (
        <singleContext.Provider value={{
            data: count,
            contractAdress: "juno1mlfwusx5556tmej3rm37hgg34et9kmjqfycccwndzdwgd5f4r69sd6cpe2",
            testUrl: "https://rpc.uni.juno.deuslabs.fi",
            isFirstTimeVisit: firstTimeVisit,
            updateIsFirstTimeVisit: (value: boolean) =>{
                setFirstTimeVisit(value => value.valueOf());
            },
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