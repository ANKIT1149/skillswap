export interface RatingInterface{
    $id?: string,
    ratedUserId: string,
    raterUserId: string,
    stars: number
    review?: string
    timestamp: string
}