import React, { useContext, useState } from "react";
import { makeCosmoshubPath } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { useWallet } from "../../contexts/wallet";
import { Button, Grid } from "@mui/material";
import toast from "react-hot-toast";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Votebox } from "../../models/Votebox";
import ListResponseItem from "../../components/ListResponseItem";
import singleContext from "../../SingleContext";

////////////////////////Wallet//////////////////////////////////
const walletOptions = {
    hdPaths: [makeCosmoshubPath(0)],
    prefix: "juno",
};

export const getSigner = async (mnemonic: string) => {
    const signer = await DirectSecp256k1HdWallet.fromMnemonic(
        mnemonic,
        walletOptions
    );
    return signer;
};
////////////////////////Wallet//////////////////////////////////

const Reset = () => {
    const wallet = useWallet();
    const context = useContext(singleContext);
    let client: SigningCosmWasmClient;

    const [listEnd, setListEnd] = useState(0);
    const [voteboxList, setVoteboxList] = useState<Votebox[]>([]);
    const [loadMoreBtn, setLoadMoreBtn] = useState(false);

    const queryList = async () => {
        setLoadMoreBtn(true);
        try {
            client = wallet.getClient();

            const queryResponse = await client.queryContractSmart(
                // @ts-ignore
                context.contractAdress,
                {
                    get_list: { start_after: listEnd },
                }
            );
            if (queryResponse.voteList) {
                queryResponse.voteList.map((votebox: Votebox) =>
                    setVoteboxList((prevState) => [...prevState, votebox])
                );
            }
            setListEnd(listEnd + queryResponse.voteList.length);
            if (listEnd % 10 !== 0) {
                setLoadMoreBtn(false);
            }
        } catch (error: any) {
            toast.error(error.message, { style: { maxWidth: "none" } });
        }
    };

    const resetVote = async (id: string) => {
        try {
            client = wallet.getClient();
            const res = await client.execute(
                wallet.address,
                // @ts-ignore
                context.contractAdress,
                {
                    vote_reset: {
                        id: id,
                    },
                },
                "auto"
            );
            if (res !== undefined) {
                alert("Resetted Successfully");
            }
        } catch (err: any) {
            toast.error(err.message, { style: { maxWidth: "none" } });
        }
    };

    const deleteVoteBox = async (id: string) => {
        try {
            client = wallet.getClient();
            const res = await client.execute(
                wallet.address,
                // @ts-ignore
                context.contractAdress,
                {
                    vote_remove: {
                        id: id,
                    },
                },
                "auto"
            );
            console.log("delete response", res);
            if (res !== undefined) {
                alert("Deleted successfully ");
            }
        } catch (err: any) {
            toast.error(err.message, { style: { maxWidth: "none" } });
        }
    };

    return (
        <Grid container>
            <Button onClick={queryList} color="secondary">
                {listEnd === 0 ? (
                    <KeyboardArrowRightIcon />
                ) : (
                    <KeyboardArrowDownIcon />
                )}
                Load VoteBoxes
            </Button>

            {voteboxList.length > 0 &&
                voteboxList.map((item: any, index: number) => {
                    return (
                        <ListResponseItem
                            key={index}
                            id={item.id}
                            topic={item.topic}
                            yesCount={item.yesCount}
                            noCount={item.noCount}
                            abstainCount={item.abstain_count}
                            nwvCount={item.no_with_vote_count}
                            description={item.description}
                            owner={item.owner}
                            deadline={item.deadline.at_height}
                            deadlineNum={item.deadline.at_time}
                            reset={resetVote}
                            delete={deleteVoteBox}
                        />
                    );
                })}
            {voteboxList.length > 0 && loadMoreBtn && (
                <Button color="secondary" onClick={queryList}>
                    Load More
                </Button>
            )}
        </Grid>
    );
};

export default Reset;
