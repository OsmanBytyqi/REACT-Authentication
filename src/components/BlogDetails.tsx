import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { BlogItem } from "../types/AppTypes";
import Header from "./header/Header";
import Footer from "./Footer";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";

const BlogDetails = () => {
    const { id } = useParams();
    const { data, loading } = useFetchData<BlogItem[]>('http://localhost:3000/blogs');
    const history = useNavigate();

    const blog = Array.isArray(data) ? data.find(blog => blog.id === id) : null;

    const handleClick = () => {
        if (!blog) return;

        fetch(`http://localhost:3000/blogs/${blog.id}`, {
            method: 'DELETE'
        }).then(() => {
            history('/home');
            toast.success("The blog has been deleted");
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ position: 'relative' }}>
                <div className="" style={{ width: '50%', position: 'absolute', right: '25%', bottom: '26%' }}>
                    <section className="my-8">
                        {loading ? (
                            <>
                                <h2 className="text-3xl font-bold mb-4" style={{ color: '#1565c0' }}>
                                    <Skeleton variant="text" width={200} />
                                </h2>
                                <hr className="my-6 border-t-2 border-gray-300" />
                                <div className="bg-white p-4 rounded-md shadow-md">
                                    <h3 className="text-lg font-semibold mb-2">
                                        <Skeleton variant="text" width={100} />
                                    </h3>
                                    <p className="text-gray-600">
                                        <Skeleton variant="text" />
                                    </p>
                                </div>
                            </>
                        ) : blog ? (
                            <>
                                <h2 className="text-3xl font-bold mb-4" style={{ color: '#1565c0' }}>
                                    {blog.title}
                                </h2>
                                <hr className="my-6 border-t-2 border-gray-300" />
                                <div className="bg-white p-4 rounded-md shadow-md">
                                    <p className="text-gray-600">{blog.description}</p>
                                    <p className="" style={{}}>Written by: {blog.author}</p>
                                    {/* <button
                                        style={{
                                            background: '#1565c0',
                                            color: '#fff',
                                            margin: '10px 0px',
                                            padding: '5px 16px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={handleClick}
                                    >
                                        Delete
                                    </button> */}

                    <Button
                        variant="contained"
                        color="error"
                        style={{ margin: '10px 0px'}}
                        onClick={handleClick}
                    >
                        Delete
                    </Button>
                                </div>
                            </>
                        ) : (
                            <div>Blog not found</div>
                        )}
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BlogDetails;
