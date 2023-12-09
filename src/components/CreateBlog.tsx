import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header/Header';
import Footer from './Footer';

const CreateBlog: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [author, setAuthor] = useState<string>('mario');
    const history = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const blog = { title, description, author };

        fetch('http://localhost:3000/blogs/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog),
        }).then(() => {
            history('/home');
        });
    };

    return (
        <div className=''>
            <Header></Header>
            <div className="flex flex-col items-center justify-between min-h-screen p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-4" style={{ color: '#1565c0' }}  >Add a New Blog</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <label className="text-gray-700">Blog title:</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-2 border-gray-300 p-2 rounded-md"
                        />

                        <label className="text-gray-700">Blog description:</label>
                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-2 border-gray-300 p-2 rounded-md"
                        ></textarea>

                        <label className="text-gray-700">Blog author:</label>
                        <select
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="border-2 border-gray-300 p-2 rounded-md"
                        >
                            <option value="mario">mario</option>
                            <option value="yoshi">yoshi</option>
                        </select>

                        <button
                            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
                            type="submit"
                            style={{
                                background: '#1565c0',
                                color: '#fff',
                            }}
                        >
                            Add Blog
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateBlog;
