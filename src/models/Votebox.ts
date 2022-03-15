export class Votebox {
    deadline: {
        at_height: string | null;
        at_time: string | null;
    };
    id: string;
    owner: string;
    topic: string;
    yes_count: number;
    no_count: number;

    constructor(
        deadline: {
            at_height: string | null;
            at_time: string | null;
        },
        id: string,
        owner: string,
        topic: string,
        yes_count: number,
        no_count: number
    ) {
        this.deadline = deadline;
        this.id = id;
        this.owner = owner;
        this.topic = topic;
        this.yes_count = yes_count;
        this.no_count = no_count;
    }
}
