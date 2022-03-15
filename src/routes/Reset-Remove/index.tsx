import { makeCosmoshubPath } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import React, { useState } from "react";
import { useWallet } from "../../contexts/wallet";
import { Button, Grid } from "@mui/material";
import toast from "react-hot-toast";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Votebox } from "../../models/Votebox";
import ListResponseItem from "../../components/ListResponseItem";

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
    const CONTRACT_ADDRESS =
        "juno1asxh2ydzpujch7l7hguzejfjlfadxjydnpqcf4vdve90x2frqh3s8f9hmx";

    let client: SigningCosmWasmClient;

    const [listEnd, setListEnd] = useState(0);
    const [voteboxList, setVoteboxList] = useState<Votebox[]>([]);
    const [loadMoreBtn, setLoadMoreBtn] = useState(false);

    const queryList = async () => {
        setLoadMoreBtn(true);
        try {
            client = wallet.getClient();

            const queryResponse = await client.queryContractSmart(
                CONTRACT_ADDRESS,
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

    const resetVote = async (id: String) => {
        try {
            client = wallet.getClient();
            const res = await client.execute(
                wallet.address,
                CONTRACT_ADDRESS,
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

    const deleteVoteBox = async (id: String) => {
        try {
            client = wallet.getClient();
            const res = await client.execute(
                wallet.address,
                CONTRACT_ADDRESS,
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
            <Button onClick={queryList}>
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
                            owner={item.owner}
                            deadline={
                                item.deadline.at_time
                                    ? item.deadline.at_time
                                    : item.deadline.at_height
                            }
                            reset={resetVote}
                            delete={deleteVoteBox}
                        />
                    );
                })}
            {voteboxList.length > 0 && loadMoreBtn && (
                <Button onClick={queryList}>Load More</Button>
            )}
        </Grid>
    );
};

export default Reset;
