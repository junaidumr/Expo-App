export interface Task {
    id?: number;
    user_id?: string;
    text: string;
    reminder: string;
    time: string;
    priority: string;
    created_at?: string;
}
