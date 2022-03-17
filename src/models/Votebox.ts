export class Votebox {
    id: string;
    yes_count: number;
    no_count: number;
    abstain_count: number;
    no_with_veto_count: number;
    deadline: {
        at_height: string | null;
        at_time: string | null;
    };
    owner: string;
    topic: string;
    description: string;
    create_date: string;
    total_amount: number;
    native_denom: string;
    voters: string[];
    voter_count: number;
    constructor(
        id: string,
        yes_count: number,
        no_count: number,
        abstain_count: number,
        no_with_veto_count: number,
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
    ) {
        this.id = id;
        this.yes_count = yes_count;
        this.no_count = no_count;
        this.abstain_count = abstain_count;
        this.no_with_veto_count = no_with_veto_count;
        this.deadline = deadline;
        this.owner = owner;
        this.topic = topic;
        this.description = description;
        this.create_date = create_date;
        this.total_amount = total_amount;
        this.native_denom = native_denom;
        this.voters = voters;
        this.voter_count = voter_count;
    }
}
