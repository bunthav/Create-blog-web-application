import express from 'express';
import { dirname } from 'path';
import { title } from 'process';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;

app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname + '/public'));

// Render the index.ejs file
app.get('/', (req, res) => {
    res.render('index.ejs', {
        theblogs: blogs
    }); 
});

app.post('/add', (req, res)=>{
    const id = blogs.length + 1;
    const newBlog = {
        id: id,
        title: req.body.title,
        description: req.body.description
    }
    blogs.push(newBlog);
    res.render('index.ejs', {
        theblogs: blogs
    })
});

app.post('/readmore', (req, res)=>{
    const id = parseInt(req.body.id);
    const existBlog = blogs.find((blog) => blog.id === id);
    res.render('detailBlog.ejs',{
        theblogs: blogs,
        id: existBlog.id,
        title: existBlog.title,
        description: existBlog.description
    })
});

app.post('/delete', (req, res)=>{
    const id = parseInt(req.body.id);
    const blogsIndex = blogs.findIndex((blog)=> blog.id === id);
    blogs.splice(blogsIndex, 1);
    res.render('index.ejs', {
        theblogs: blogs
    })
});


app.post('/edit', (req, res)=>{
    const id = parseInt(req.body.id);
    const existBlog = blogs.find((blog) => blog.id === id);
    res.render('edit.ejs', {
        theblogs: blogs,
        id: existBlog.id,
        title: existBlog.title,
        description: existBlog.description
    })
});


app.post('/editBlog', (req, res)=>{
    const id = parseInt(req.body.id);
    const existBlog = blogs.find((blog)=> blog.id === id);
    const updateBlog = {
        id: id,
        title: req.body.title || existBlog.title,
        description: req.body.description || existBlog.description
    };
    const blogsIndex = blogs.findIndex((blog) => blog.id === id);
    blogs[blogsIndex] = updateBlog;
    res.render('index.ejs' , {
        theblogs: blogs
    })
});



// Start the server
app.listen(port, () => {
    console.log(`The server is running on port: ${port}`);
});

const blogs = [{
    id : 1,
    title: "fast-paced",
    description: "Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Fusce convallis, mauris imperdiet gravida bibendum, nisl lectus interdum purus, sit amet sollicitudin velit magna eu quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque."
},
{
    id : 2,
    title: "well-being",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}

]



























// app.get('/', (req, res)=>{
//     const day = new Date();
//     const today = day.getDay();
//     res.render("index.ejs", {
//         dayType : today,
//         joke : my_joke,
//         jokesList : jokes
//     });
// });

// var my_joke = ['hii', 'hmmmmmm','heyyyyy']

// var jokes = [
//     {
//         id: 1,
//         jokeText:
//             "Why don't scientists trust atoms?  Because they make up everything.",
//         jokeType: "Science",
//     },
//     {
//         id: 2,
//         jokeText:
//             "Why did the scarecrow win an award? Because he was outstanding in his field.",
//         jokeType: "Puns",
//     },
//     {
//         id: 3,
//         jokeText:
//             "I told my wife she was drawing her eyebrows too high. She looked surprised.",
//         jokeType: "Puns",
//     },
//     {
//         id: 4,
//         jokeText:
//             "What did one ocean say to the other ocean? Nothing, they just waved.",
//         jokeType: "Wordplay",
//     }
// ]