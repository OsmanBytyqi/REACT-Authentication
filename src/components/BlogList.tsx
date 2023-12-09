import React from 'react';
import { BlogItem, BlogListProps } from '../types/AppTypes';

import { Link } from 'react-router-dom';

const BlogList: React.FC<BlogListProps> = ({ data }) => (


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {data.map((item: BlogItem) => (
            <div key={item.id} className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <Link to={`/blogs/${item.id}`}>
                    <button
                        style={{
                            background: '#1565c0',
                            color: '#fff',
                            margin: '10px 0px',
                            padding: '5px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Read more
                    </button>
                </Link>
            </div>
        ))}
    </div>
);

export default BlogList;