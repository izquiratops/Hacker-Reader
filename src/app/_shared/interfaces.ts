export enum ItemType {
    job = 'job',
    story = 'story',
    comment = 'comment',
    poll = 'poll',
    pollopt = 'pollopt'
}

export interface Item {
    id: number;         // The item's unique id.
    deleted: boolean;   // true if the item is deleted.
    type: ItemType;     // The type of item. One of "job", "story", "comment", "poll", or "pollopt".
    by: string;         // The username of the item's author.
    time: number;       // Creation date of the item, in Unix Time.
    text: string;       // The comment, story or poll text. HTML.
    dead: boolean;      // true if the item is dead.
    parent: number;     // The comment's parent: either another comment or the relevant story.
    poll: number;       // The pollopt's associated poll.
    kids: number[];     // The ids of the item's comments, in ranked display order.
    url: string;        // The URL of the story.
    score: number;      // The story's score, or the votes for a pollopt.
    title: string;      // The title of the story, poll or job. HTML.
    parts: number[];    // A list of related pollopts, in display order.
    descendants: number // In the case of stories or polls, the total comment count.
    replies: Item[];    // The objects of the item's comments, this contains all the data to bind into the tree.
}