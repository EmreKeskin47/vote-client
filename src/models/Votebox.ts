export class Votebox {
    constructor(
        id: string,
        yes_count: number,
        no_count: number,
        abstain_count: number,
        no_with_vote_count: number,
        deadline: {
            at_height: string | null;
            at_time: string | null;
        },
        owner: string,
        topic: string,
        description: string,
        create_date: string,
        total_amount: number,
        native_denom: string,
        voters: string[],
        voter_count: number
    ) {}
}
