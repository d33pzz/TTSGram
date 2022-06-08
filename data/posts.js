
import { USERS } from "../data/users";

export const POSTS = [
    {
        imageUrl: "https://scontent-maa2-1.xx.fbcdn.net/v/t39.30808-6/260896643_1553211365029296_4050257997148333829_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=UFv5ULgJ_MgAX_HuN0H&_nc_ht=scontent-maa2-1.xx&oh=00_AT9ozNjGjWH4iVsy7f_g5FOLTQA9JAZpZS9RdAqdGsPouw&oe=62952A40",
        likes: 7890,
        user_name: USERS[6].user_name, 
        caption: "Every book has a unique story, if the book has a well connect with the reader then it has found the right soul to stick up to. - Niitesh S",
        profilepicture: USERS[6].image_url,
        comments: [
            {
                user_name: "theqazman",
                comment: "Enjoy the trip Pal"
            },
            {
                user_name: "amaanath.dev",
                comment: "Missed it mate"
            }
        ]
},
    {
        imageUrl: "https://wwwnc.cdc.gov/travel/images/hiker-ocean-extreme.jpg",
        likes: 3500,
        user_name: USERS[6].user_name, 
        caption: "Wandering soul...",
        profilepicture: USERS[6].image_url,
        comments: [
            {
                user_name: "theqazman",
                comment: "Enjoy the trip Pal"
            },
            {
                user_name: "amaanath.dev",
                comment: "Missed it mate"
            }
        ]
},
{
    imageUrl: "https://drscdn.500px.org/photo/65355737/m%3D2048_k%3D1_a%3D1/v2?sig=792f2ed2903bb3ffcfca22a34f5b2cf9a0f43ef12d7f1853c2df1def3f45ca05",
    likes: 4000,
    user_name: USERS[4].user_name, 
    caption: "Wait for it",
    profilepicture: USERS[4].image_url,
    comments: [
        {
            user_name: "Niitesh S",
            comment: "Amazing snap"
        },
        
    ]
}
    

]